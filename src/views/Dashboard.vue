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

const initThreeJS = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050d21);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  if (canvasContainer.value) {
    canvasContainer.value.appendChild(renderer.domElement);
  }

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

  window.addEventListener('resize', onWindowResize);
};

const animate = () => {
  animationId = requestAnimationFrame(animate);
  if (sphereLeft) {
    sphereLeft.rotation.y += 0.003;
    sphereLeft.rotation.x += 0.002;
  }
  if (sphereRight) {
    sphereRight.rotation.y -= 0.003;
    sphereRight.rotation.z += 0.001;
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