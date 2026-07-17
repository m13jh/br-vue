<template>
  <!-- 页面主容器 -->
  <div class="dashboard-wrapper">
    <!-- 3D渲染画布容器 -->
    <div ref="canvasContainer" class="canvas-container"></div>

    <!-- 上层UI界面 -->
    <div class="ui-layer">
      <TopBar />

      <!-- 中部科技感装饰线 -->
      <div class="tech-divider">
        <div class="line-glow left"></div>
        <div class="center-node">
          <span class="diamond"></span>
          <span class="diamond pulse"></span>
        </div>
        <div class="line-glow right"></div>
      </div>

      <!-- 核心功能入口模块 -->
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

// 引入子组件
import TopBar from '@/components/TopBar.vue';
import EntryCard from '@/components/EntryCard.vue';
import StatusPanel from '@/components/StatusPanel.vue';
import FooterInfo from '@/components/FooterInfo.vue';

// 基础变量定义
const canvasContainer = ref<HTMLElement | null>(null);
let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
let animationId: number;

// 模型与粒子变量
let sphereLeft: THREE.Points, sphereRight: THREE.Points;
let waveParticles: THREE.Points;
let waveCount = 0;

// 波浪网格参数
const AMOUNTX = 60;
const AMOUNTZ = 15;
const SEPARATION = 0.4;

// 材质与主题监听变量
let materialLeft: THREE.PointsMaterial;
let materialRight: THREE.PointsMaterial;
let waveMaterial: THREE.PointsMaterial;
let themeObserver: MutationObserver | null = null; 

// 动态更新Three.js材质颜色
const updateThreeColors = () => {
  // 获取当前CSS主题变量
  const styles = window.getComputedStyle(document.documentElement);
  const cyanColor = styles.getPropertyValue('--primary-cyan').trim();
  const purpleColor = styles.getPropertyValue('--primary-purple').trim();

  // 更新对应材质颜色
  if (cyanColor && waveMaterial && materialLeft) {
    waveMaterial.color.set(cyanColor);
    materialLeft.color.set(cyanColor);
  }
  if (purpleColor && materialRight) {
    materialRight.color.set(purpleColor);
  }
};

// 初始化Three.js场景
const initThreeJS = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  if (canvasContainer.value) {
    canvasContainer.value.appendChild(renderer.domElement);
  }

  // 获取初始主题颜色
  const styles = window.getComputedStyle(document.documentElement);
  const initialCyan = styles.getPropertyValue('--primary-cyan').trim() || '#00e5ff';
  const initialPurple = styles.getPropertyValue('--primary-purple').trim() || '#b062ff';

  const geometry = new THREE.SphereGeometry(1.2, 48, 48);
  
  // 创建左侧青色球体
  materialLeft = new THREE.PointsMaterial({
    color: new THREE.Color(initialCyan),
    size: 0.02,
    transparent: true,
    opacity: 0.8,
  });
  sphereLeft = new THREE.Points(geometry, materialLeft);
  sphereLeft.position.set(-8, -1.5, -2);
  scene.add(sphereLeft);

  // 创建右侧紫色球体
  materialRight = new THREE.PointsMaterial({
    color: new THREE.Color(initialPurple),
    size: 0.02,
    transparent: true,
    opacity: 0.8,
  });
  sphereRight = new THREE.Points(geometry, materialRight);
  sphereRight.position.set(8, 3, -3);
  scene.add(sphereRight);

  // 创建背景星空粒子
  const starsGeometry = new THREE.BufferGeometry();
  const initialText = styles.getPropertyValue('--text-main').trim() || '#ffffff';
  const starsMaterial = new THREE.PointsMaterial({ color: new THREE.Color(initialText), size: 0.01 });
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

  // 创建底部波浪粒子
  const waveGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(AMOUNTX * AMOUNTZ * 3);
  let i = 0;
  
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iz = 0; iz < AMOUNTZ; iz++) {
      positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
      positions[i + 1] = 0;
      positions[i + 2] = iz * SEPARATION - ((AMOUNTZ * SEPARATION) / 2);
      i += 3;
    }
  }
  waveGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  waveMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(initialCyan),
    size: 0.04,
    transparent: true,
    opacity: 0.6,
  });
  waveParticles = new THREE.Points(waveGeometry, waveMaterial);
  waveParticles.position.y = -3;
  waveParticles.position.z = -2;
  scene.add(waveParticles);

  // 监听窗口大小变化
  window.addEventListener('resize', onWindowResize);
};

// 动画渲染循环
const animate = () => {
  animationId = requestAnimationFrame(animate);
  
  // 球体自转动画
  if (sphereLeft) {
    sphereLeft.rotation.y += 0.003;
    sphereLeft.rotation.x += 0.002;
  }
  if (sphereRight) {
    sphereRight.rotation.y -= 0.003;
    sphereRight.rotation.z += 0.001;
  }

  // 波浪起伏动画
  if (waveParticles) {
    const positions = waveParticles.geometry.attributes.position.array as Float32Array;
    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iz = 0; iz < AMOUNTZ; iz++) {
        const waveX = Math.sin((ix * 0.3) + waveCount) * 0.3;
        const waveZ = Math.cos((iz * 0.5) + (waveCount * 0.8)) * 0.4;
        const chaosWave = Math.sin((ix * 0.8) + (iz * 0.6) + (waveCount * 1.0)) * 0.15;

        positions[i + 1] = waveX + waveZ + chaosWave;
        i += 3;
      }
    }
    waveParticles.geometry.attributes.position.needsUpdate = true;
    waveCount += 0.01; 
  }

  renderer.render(scene, camera);
};

// 处理窗口自适应
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

// 组件挂载时执行
onMounted(() => {
  initThreeJS();
  animate();

  // 创建监听器监控主题属性变化
  themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        updateThreeColors();
      }
    });
  });

  // 绑定监听器到HTML根节点
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
});

// 组件卸载前清理资源
onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  cancelAnimationFrame(animationId);
  if (renderer) renderer.dispose();

  // 断开主题监听器
  if (themeObserver) {
    themeObserver.disconnect();
  }
});
</script>

<style scoped>
/* 页面主容器样式 */
.dashboard-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: var(--text-main);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  
  /* 深色主题背景配置 */
  background-image: url('@/assets/bg-dark.png'); 
  background-size: cover;      
  background-position: center;  
  background-repeat: no-repeat; 
  background-color: var(--bg-dark); 
  transition: background-image 0.3s ease;
}

/* 浅色主题下隐藏深色背景图 */
:global([data-theme="light"]) .dashboard-wrapper {
  background-image: none; 
}

/* 3D画布容器样式 */
.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* UI交互层样式 */
.ui-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  pointer-events: none;
  padding: 8vh 10% 0 10%;
}

/* 恢复UI层子元素的点击事件 */
.ui-layer > * {
  pointer-events: auto;
}

/* 核心模块卡片布局 */
.main-modules {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

/* 装饰分割线容器 */
.tech-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;      
  margin: 0 auto 35px auto; 
  opacity: 0.85;
}

/* 发光线条基础样式 */
.line-glow {
  flex: 1;
  height: 2px;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

/* 左侧线条颜色渐变 */
.line-glow.left {
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--primary-cyan) 60%, transparent));
}

/* 右侧线条颜色渐变 */
.line-glow.right {
  background: linear-gradient(90deg, color-mix(in srgb, var(--primary-cyan) 60%, transparent), transparent);
}

/* 线条跑马灯光点 */
.line-glow::after {
  content: '';
  position: absolute;
  top: 0;
  width: 30px; 
  height: 100%;
  background: #fff;
  box-shadow: 0 0 15px #fff, 0 0 20px var(--primary-cyan); 
  border-radius: 50%;
}

/* 左侧光点动画配置 */
.line-glow.left::after {
  left: -30px;
  animation: data-flow-left 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

/* 右侧光点动画配置 */
.line-glow.right::after {
  right: -30px;
  animation: data-flow-right 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

/* 左侧光点流动关键帧 */
@keyframes data-flow-left {
  0% { left: -10%; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { left: 110%; opacity: 0; }
}

/* 右侧光点流动关键帧 */
@keyframes data-flow-right {
  0% { right: -10%; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { right: 110%; opacity: 0; }
}

/* 中心装饰节点容器 */
.center-node {
  position: relative;
  width: 50px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
}

/* 中心发光菱形 */
.diamond {
  width: 8px;
  height: 8px;
  background: var(--primary-cyan);
  transform: rotate(45deg);
  box-shadow: var(--glow-cyan);
  position: absolute;
  z-index: 2;
}

/* 脉冲向外扩散的菱形 */
.diamond.pulse {
  background: transparent;
  border: 1px solid var(--primary-cyan);
  animation: pulse-ring 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  z-index: 1;
}

/* 菱形脉冲关键帧 */
@keyframes pulse-ring {
  0% { transform: rotate(45deg) scale(1); opacity: 1; }
  100% { transform: rotate(45deg) scale(3.5); opacity: 0; }
}
</style>