<template>
  <div class="dashboard-wrapper">
    <div ref="canvasContainer" class="canvas-container"></div>

    <div class="ui-layer">
      <TopBar />

      <div class="tech-divider">
        <div class="line-glow left"></div>
        <div class="center-node">
          <span class="diamond"></span>
          <span class="diamond pulse"></span>
        </div>
        <div class="line-glow right"></div>
      </div>

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

// 导入组件
import TopBar from '@/components/TopBar.vue';
import EntryCard from '@/components/EntryCard.vue';
import StatusPanel from '@/components/StatusPanel.vue';
import FooterInfo from '@/components/FooterInfo.vue';

const canvasContainer = ref<HTMLElement | null>(null);
let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
let animationId: number;
let sphereLeft: THREE.Points, sphereRight: THREE.Points;
let waveParticles: THREE.Points;
let waveCount = 0;

const AMOUNTX = 60;
const AMOUNTZ = 15;
const SEPARATION = 0.4;

// 1. 【新增】将需要变色的材质提升为作用域变量
let materialLeft: THREE.PointsMaterial;
let materialRight: THREE.PointsMaterial;
let waveMaterial: THREE.PointsMaterial;
let themeObserver: MutationObserver | null = null; // 监听器实例

// 2. 【新增】动态更新 Three.js 颜色的函数
const updateThreeColors = () => {
  // 获取当前 HTML 根节点上生效的 CSS 变量值
  const styles = window.getComputedStyle(document.documentElement);
  const cyanColor = styles.getPropertyValue('--primary-cyan').trim();
  const purpleColor = styles.getPropertyValue('--primary-purple').trim();

  // 如果成功获取到变量，则更新 Three.js 材质颜色
  if (cyanColor && waveMaterial && materialLeft) {
    waveMaterial.color.set(cyanColor);
    materialLeft.color.set(cyanColor);
  }
  if (purpleColor && materialRight) {
    materialRight.color.set(purpleColor);
  }
};

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

  // 3. 【修改】初始化材质时，直接先调用一次读取 CSS 变量，或者给个默认值
  const styles = window.getComputedStyle(document.documentElement);
  const initialCyan = styles.getPropertyValue('--primary-cyan').trim() || '#00e5ff';
  const initialPurple = styles.getPropertyValue('--primary-purple').trim() || '#b062ff';

  const geometry = new THREE.SphereGeometry(1.2, 32, 32);
  
  // 左球材质
  materialLeft = new THREE.PointsMaterial({
    color: new THREE.Color(initialCyan),
    size: 0.02,
    transparent: true,
    opacity: 0.8,
  });
  sphereLeft = new THREE.Points(geometry, materialLeft);
  sphereLeft.position.set(-4, -1.5, -2);
  scene.add(sphereLeft);

  // 右球材质
  materialRight = new THREE.PointsMaterial({
    color: new THREE.Color(initialPurple),
    size: 0.02,
    transparent: true,
    opacity: 0.8,
  });
  sphereRight = new THREE.Points(geometry, materialRight);
  sphereRight.position.set(8, 2, -3);
  scene.add(sphereRight);

  // 背景散落星点
  const starsGeometry = new THREE.BufferGeometry();
  // 星点可以使用跟随主题文字的颜色，这里先用常规变量或保持白色
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

  // 底部横向波浪粒子
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
  
  // 波浪材质
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

  window.addEventListener('resize', onWindowResize);
};

// 驱动波浪流动 (保持你之前调好的混乱度和慢速)
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

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

onMounted(() => {
  initThreeJS();
  animate();

  // 4. 【核心新增】创建 MutationObserver 监听 HTML 的属性变化
  themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-theme') {
        // 当 data-theme 发生改变时，触发 Three.js 材质颜色更新
        updateThreeColors();
      }
    });
  });

  // 开始监听 html 标签的属性
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  cancelAnimationFrame(animationId);
  if (renderer) renderer.dispose();

  // 5. 【新增】组件销毁时断开监听，防止内存泄漏
  if (themeObserver) {
    themeObserver.disconnect();
  }
});
</script>
<style scoped>
.dashboard-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: var(--text-main);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  
  /* 👇 新增：设置背景图片 👇 */
  background-image: url('@/assets/bg-dark-copy.png'); /* 注意路径是否匹配你的项目结构 */
  background-size: cover;       /* 让图片按比例缩放并完全覆盖整个屏幕 */
  background-position: center;  /* 确保图片居中 */
  background-repeat: no-repeat; /* 防止图片重复平铺 */
  background-color: var(--bg-dark); /* 作为图片加载前的底色 */
  transition: background-image 0.3s ease;
}

/* 👇 新增：处理浅色模式兼容 👇 */
/* 当全局 html 被设置 data-theme="light" 时，取消这个深色背景图 */
:global([data-theme="light"]) .dashboard-wrapper {
  background-image: none; /* 浅色模式下移除图片，退回到你的纯色/浅色渐变背景 */
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
  justify-content: center; /* 让所有内容垂直居中，留出上下呼吸空间 */
  pointer-events: none;
  padding: 8vh 10% 0 10%;
}
.ui-layer > * {
  pointer-events: auto;
}
.main-modules {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  /* flex: 1; */
}
/* =========================================
   中上部科技装饰线 
========================================= */
.tech-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;       /* 宽度不占满全屏，两边留白更聚焦 */
  margin: 0 auto 35px auto; /* 控制与标题和下方卡片的间距 */
  opacity: 0.85;
}

/* 渐变线条基础 */
.line-glow {
  flex: 1;
  height: 2px;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
}

/* 左侧线条：从透明渐变到主题青色 */
.line-glow.left {
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--primary-cyan) 60%, transparent));
}

/* 右侧线条：从主题青色渐变到透明 */
.line-glow.right {
  background: linear-gradient(90deg, color-mix(in srgb, var(--primary-cyan) 60%, transparent), transparent);
}

/* 跑马灯流动光点 (数据流效果) */
.line-glow::after {
  content: '';
  position: absolute;
  top: 0;
  width: 30px; /* 光点的长度 */
  height: 100%;
  background: #fff;
  box-shadow: 0 0 15px #fff, 0 0 20px var(--primary-cyan); /* 发光效果 */
  border-radius: 50%;
}

/* 左侧光点从左向右跑 */
.line-glow.left::after {
  left: -30px;
  animation: data-flow-left 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

/* 右侧光点从右向左跑 */
.line-glow.right::after {
  right: -30px;
  animation: data-flow-right 3s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes data-flow-left {
  0% { left: -10%; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { left: 110%; opacity: 0; }
}

@keyframes data-flow-right {
  0% { right: -10%; opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { right: 110%; opacity: 0; }
}

/* 中间的菱形核心节点 */
.center-node {
  position: relative;
  width: 50px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
}

/* 实心发光小菱形 */
.diamond {
  width: 8px;
  height: 8px;
  background: var(--primary-cyan);
  transform: rotate(45deg);
  box-shadow: var(--glow-cyan);
  position: absolute;
  z-index: 2;
}

/* 外层扩散的脉冲菱形 */
.diamond.pulse {
  background: transparent;
  border: 1px solid var(--primary-cyan);
  animation: pulse-ring 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  z-index: 1;
}

@keyframes pulse-ring {
  0% { transform: rotate(45deg) scale(1); opacity: 1; }
  100% { transform: rotate(45deg) scale(3.5); opacity: 0; }
}
</style>