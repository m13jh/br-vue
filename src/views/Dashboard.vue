<template>
  <div class="dashboard-wrapper">
    <div ref="canvasContainer" class="canvas-container"></div>

    <div class="ui-layer">
      <TopBar />

      <section class="main-modules">
        <EntryCard title="标注平台" />
        <EntryCard title="训练平台" />
        <EntryCard title="模型管理" />
      </section>

      <StatusPanel />
      
      <FooterInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

// 导入刚才拆分出来的组件
import TopBar from '@/components/TopBar.vue';
import EntryCard from '@/components/EntryCard.vue';
import StatusPanel from '@/components/StatusPanel.vue';
import FooterInfo from '@/components/FooterInfo.vue';

const canvasContainer = ref<HTMLElement | null>(null);
let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
let animationId: number;
let sphereLeft: THREE.Points, sphereRight: THREE.Points;

// 新增：波浪粒子系统和运动控制变量
let waveParticles: THREE.Points;
let waveCount = 0;
const AMOUNTX = 60; // 波浪横向粒子数
const AMOUNTZ = 15; // 波浪纵深粒子数
const SEPARATION = 0.4; // 粒子间距

const initThreeJS = () => {
  scene = new THREE.Scene();
//   scene.background = new THREE.Color(0x050d21);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  if (canvasContainer.value) {
    canvasContainer.value.appendChild(renderer.domElement);
  }

  // 1. 左右侧的粒子球
  const geometry = new THREE.SphereGeometry(1.2, 32, 32);
  const material = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.02,
    transparent: true,
    opacity: 0.8,
  });

  sphereLeft = new THREE.Points(geometry, material);
  sphereLeft.position.set(-4, -1.5, -2);
  scene.add(sphereLeft);

  const materialRight = new THREE.PointsMaterial({
    color: 0xb062ff,
    size: 0.02,
    transparent: true,
    opacity: 0.8,
  });
  sphereRight = new THREE.Points(geometry, materialRight);
  sphereRight.position.set(4, 0, -3);
  scene.add(sphereRight);

  // 2. 背景散落星点
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.01 });
  const starsVertices = [];
  for (let i = 0; i < 1000; i++) {
    const x = THREE.MathUtils.randFloatSpread(20);
    const y = THREE.MathUtils.randFloatSpread(20);
    const z = THREE.MathUtils.randFloatSpread(20);
    starsVertices.push(x, y, z);
  }
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
  const starField = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(starField);

  // 3. 底部横向波浪粒子 (新增核心代码)
  const waveGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(AMOUNTX * AMOUNTZ * 3);
  let i = 0;
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iz = 0; iz < AMOUNTZ; iz++) {
      // 居中排列粒子网格
      positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2); // x
      positions[i + 1] = 0; // y 轴初始为0，动画里计算
      positions[i + 2] = iz * SEPARATION - ((AMOUNTZ * SEPARATION) / 2); // z
      i += 3;
    }
  }
  waveGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const waveMaterial = new THREE.PointsMaterial({
    color: 0x00e5ff, // 青色光点
    size: 0.04,
    transparent: true,
    opacity: 0.6,
  });
  waveParticles = new THREE.Points(waveGeometry, waveMaterial);
  // 把波浪整体下移，贴近屏幕底部
  waveParticles.position.y = -3;
  waveParticles.position.z = -2;
  scene.add(waveParticles);

  window.addEventListener('resize', onWindowResize);
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  
  // 旋转球体
  if (sphereLeft) {
    sphereLeft.rotation.y += 0.003;
    sphereLeft.rotation.x += 0.002;
  }
  if (sphereRight) {
    sphereRight.rotation.y -= 0.003;
    sphereRight.rotation.z += 0.001;
  }

  // 驱动波浪流动 (变得更混乱、更具随机感)
  if (waveParticles) {
    const positions = waveParticles.geometry.attributes.position.array as Float32Array;
    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iz = 0; iz < AMOUNTZ; iz++) {
        
        // 1. 基础横向波 (主导大起伏)
        const waveX = Math.sin((ix * 0.3) + waveCount) * 0.3;
        
        // 2. 纵深余弦波 (频率和流速不同，打破原本的对齐)
        const waveZ = Math.cos((iz * 0.5) + (waveCount * 0.8)) * 0.4;
        
        // 3. 高频干扰波 (制造局部的“混乱”和小碎浪)
        const chaosWave = Math.sin((ix * 0.8) + (iz * 0.6) + (waveCount * 1.0)) * 0.15;

        // 将三种波形叠加
        positions[i + 1] = waveX + waveZ + chaosWave;
        
        i += 3;
      }
    }
    waveParticles.geometry.attributes.position.needsUpdate = true;
    
    // 稍微调快一点流速，让混乱的波动更活跃
    waveCount += 0.01; 
  }

  renderer.render(scene, camera);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

onMounted(() => {
  initThreeJS();
  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  cancelAnimationFrame(animationId);
  if (renderer) renderer.dispose();
});
</script>

<style scoped>
.dashboard-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: #fff;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.ui-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 2% 5%;
  pointer-events: none;
}
.ui-layer > * {
  pointer-events: auto;
}
.main-modules {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  flex: 1;
}
</style>