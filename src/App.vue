<!-- <template>
  <div class="dashboard-wrapper">
    <div ref="canvasContainer" class="canvas-container"></div>

    <div class="ui-layer">
      <header class="header">
        <h1 class="title">AI工艺平台</h1>
        <p class="subtitle">面向工业制造的数据标注 · 模型训练 · 智能决策平台</p>
      </header>

      <section class="main-modules">
        <div class="module-card">
          <div class="icon-placeholder"></div>
          <h2>标注平台</h2>
          <button class="enter-btn">进入平台</button>
        </div>
        <div class="module-card">
          <div class="icon-placeholder"></div>
          <h2>训练平台</h2>
          <button class="enter-btn">进入平台</button>
        </div>
        <div class="module-card">
          <div class="icon-placeholder"></div>
          <h2>模型管理</h2>
          <button class="enter-btn">进入平台</button>
        </div>
      </section>

      <section class="data-panels">
        <div class="data-card">
          <h3>| 服务运行状态</h3>
          <div class="data-content">
            <div class="data-item">
              <span>服务在线率</span>
              <strong class="highlight">99.9%</strong>
            </div>
            <div class="data-item">
              <span>今日标注</span>
              <strong>1650条</strong>
            </div>
          </div>
        </div>

        <div class="data-card">
          <h3>| 硬件资源</h3>
          <div class="data-content">
            <div class="data-item">
              <strong class="highlight">96.50%</strong>
              <span>注</span>
            </div>
            <div class="data-item">
              <strong>1650条</strong>
            </div>
          </div>
          <div class="chart-placeholder">（折线图占位）</div>
        </div>

        <div class="data-card">
          <h3>| 活跃项目</h3>
          <div class="data-content">
            <div class="data-item">
              <strong class="highlight">18</strong><span>项目</span>
            </div>
            <div class="data-item">
              <strong>18</strong><span>个</span>
            </div>
          </div>
          <div class="chart-placeholder">（折线图占位）</div>
        </div>

        <div class="data-card">
          <h3>| 业务运营</h3>
          <div class="data-content">
            <div class="data-item">
              <span>推理调用</span>
              <strong class="highlight">128次</strong>
            </div>
            <div class="data-item">
              <span>推理调用</span>
              <strong>128万次</strong>
            </div>
          </div>
        </div>
      </section>

      <footer class="status-footer">
        <div class="status-badge"><span class="icon">🛡️</span> CPU 72%</div>
        <div class="status-badge"><span class="icon">⚙️</span> 内存 68%</div>
        <div class="status-badge"><span class="icon">💾</span> 硬盘 42%</div>
        <div class="status-badge"><span class="icon">✅</span> 数据库 已连接</div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

const canvasContainer = ref(null);
let scene, camera, renderer, animationId;
let sphereLeft, sphereRight;

const initThreeJS = () => {
  // 1. 初始化场景和相机
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050d21); // 深蓝科技背景色

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  canvasContainer.value.appendChild(renderer.domElement);

  // 2. 创建粒子球体材质和几何体
  const geometry = new THREE.SphereGeometry(1.2, 32, 32);
  // 使用 Points 渲染成粒子球效果
  const material = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.02,
    transparent: true,
    opacity: 0.8,
  });

  // 左下角粒子球
  sphereLeft = new THREE.Points(geometry, material);
  sphereLeft.position.set(-4, -1.5, -2);
  scene.add(sphereLeft);

  // 右侧中间粒子球
  const materialRight = new THREE.PointsMaterial({
    color: 0xb062ff, // 偏紫色的球体，匹配原图右侧色调
    size: 0.02,
    transparent: true,
    opacity: 0.8,
  });
  sphereRight = new THREE.Points(geometry, materialRight);
  sphereRight.position.set(4, 0, -3);
  scene.add(sphereRight);

  // 添加一些背景散落星点
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

  // 3. 监听窗口大小变化
  window.addEventListener('resize', onWindowResize);
};

const animate = () => {
  animationId = requestAnimationFrame(animate);

  // 让两个球体保持匀速自转
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
/* 定义科技风主题色变量 */
:root {
  --primary-cyan: #00e5ff;
  --primary-purple: #b062ff;
  --bg-glass: rgba(13, 27, 62, 0.4);
  --border-glass: rgba(0, 229, 255, 0.3);
}

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
  pointer-events: none; /* 让鼠标事件可以穿透到3D层（如果需要的话） */
}

/* 恢复内部卡片的鼠标事件响应 */
.ui-layer > * {
  pointer-events: auto;
}

/* 头部样式 */
.header {
  text-align: center;
  margin-bottom: 2rem;
}
.header .title {
  font-size: 2.5rem;
  letter-spacing: 4px;
  margin: 0 0 10px 0;
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.8);
}
.header .subtitle {
  font-size: 1rem;
  color: #a0b6d4;
  margin: 0;
}

/* 卡片通用玻璃拟态效果 */
.glass-panel {
  background: rgba(10, 25, 55, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-glass);
  box-shadow: inset 0 0 20px rgba(0, 229, 255, 0.1);
  border-radius: 8px;
}

/* 三大核心模块 */
.main-modules {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  flex: 1;
}
.module-card {
  flex: 1;
  background: linear-gradient(180deg, rgba(16,33,74,0.7) 0%, rgba(10,21,50,0.8) 100%);
  border: 1px solid rgba(0, 229, 255, 0.4);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.2) inset, 0 0 20px rgba(176, 98, 255, 0.1);
}
/* 卡片边框的高亮渐变角（简易实现） */
.module-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border: 2px solid transparent;
  border-radius: 12px;
  background: linear-gradient(45deg, #00e5ff, #b062ff) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  pointer-events: none;
}
.module-card h2 {
  font-size: 1.5rem;
  margin: 20px 0;
}
.enter-btn {
  background: linear-gradient(90deg, #00e5ff, #0088ff);
  border: none;
  border-radius: 20px;
  color: #fff;
  padding: 8px 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: box-shadow 0.3s;
}
.enter-btn:hover {
  box-shadow: 0 0 15px #00e5ff;
}

/* 数据看板区 */
.data-panels {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 30px;
}
.data-card {
  flex: 1;
  background: rgba(13, 27, 62, 0.6);
  border: 1px solid rgba(0, 229, 255, 0.3);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
.data-card h3 {
  font-size: 1rem;
  margin: 0 0 15px 0;
  color: #00e5ff;
  border-left: 3px solid #00e5ff;
  padding-left: 8px;
}
.data-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.data-item {
  display: flex;
  flex-direction: column;
}
.data-item span {
  font-size: 0.8rem;
  color: #a0b6d4;
  margin-bottom: 5px;
}
.data-item strong {
  font-size: 1.2rem;
}
.highlight {
  color: #00e5ff;
  font-size: 1.5rem !important;
}
.chart-placeholder {
  height: 40px;
  border-bottom: 1px dashed rgba(0,229,255,0.3);
  color: rgba(255,255,255,0.2);
  text-align: center;
  line-height: 40px;
  font-size: 0.8rem;
}

/* 底部状态 */
.status-footer {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: auto;
}
.status-badge {
  background: rgba(0, 229, 255, 0.1);
  border: 1px solid rgba(0, 229, 255, 0.4);
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transform: skewX(-15deg); /* 科技感倾斜 */
}
.status-badge > * {
  transform: skewX(15deg); /* 内部文字回正 */
}
</style>

<style>
/* ====== 全局样式清理 ====== */
/* 确保大屏项目没有默认边距导致出现横向/纵向滚动条，让布局完全适应屏幕 */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #050d21; /* 防止加载 Three.js 前闪现白屏 */
}
*, *::before, *::after {
  box-sizing: inherit;
}
</style> -->
<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
// 逻辑全部拆分至路由视图中，App.vue 仅作容器
</script>

<style>
/* 替换 App.vue 中的 :root 变量 */
:root {
  --primary-cyan: #00e5ff;
  --primary-purple: #b062ff;
  --bg-dark: #050b14;
  --panel-bg: rgba(12, 26, 56, 0.7);
  --text-main: #ffffff; /* 新增全局文字颜色 */
  --glow-cyan: 0 0 15px rgba(0, 229, 255, 0.4);
  --glow-purple: 0 0 20px rgba(176, 98, 255, 0.3);
}

/* 浅色主题变量 */
[data-theme="light"] {
  --primary-cyan: #0077ff; 
  --primary-purple: #8b3dff;
  /* 确保整体背景不是纯白，最好带一点点灰蓝，方便衬托高光 */
  --bg-dark: #eef2f9; 
  
  /* 👇 核心修改在这里：把 0.85 (太实) 改成 0.4 到 0.5 之间 (半透明) */
  --panel-bg: rgba(255, 255, 255, 0.4); 
  
  --text-main: #1a1a1a;
  
  --glow-cyan: 0 4px 15px rgba(0, 119, 255, 0.15);
  --glow-purple: 0 4px 20px rgba(139, 61, 255, 0.15);
}

/* ====== 全局样式清理 ====== */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  
  color: var(--text-main);
  background-color: var(--bg-dark);
  transition: background-color 0.3s ease, color 0.3s ease; /* 添加平滑过渡效果 */
}

*, *::before, *::after {
  box-sizing: inherit;
}
</style>