<template>
  <header class="header">
    <div class="title-container">
      <h1 class="title">AI工艺平台</h1>
      <p class="subtitle">面向工业制造的数据标注 · 模型训练 · 智能决策平台</p>
    </div>
    
    <button class="theme-toggle" @click="toggleTheme" v-show="false">
      {{ isDark ? '🌙 深色模式' : '🌞 浅色模式' }}
    </button>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 主题状态
const isDark = ref(true);

// 切换逻辑
const toggleTheme = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('app-theme', theme);
};

// 页面加载时读取缓存的主题
onMounted(() => {
  const savedTheme = localStorage.getItem('app-theme');
  if (savedTheme === 'light') {
    isDark.value = false;
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
});
</script>

<style scoped>
.header {
  position: relative; /* 核心：作为子元素绝对定位的参照物 */
  text-align: center;
  margin-bottom: 2rem;
  padding: 10px 0; /* 给上下留一点空间，防止按钮太贴边 */
}

.header .title {
  font-size: 2.5rem;
  letter-spacing: 4px;
  margin: 0 0 5px 0;
  /* 引入变量以适配主题，默认白色 */
  color: var(--text-main, #ffffff);
  /* 阴影也使用变量，浅色模式下不会太刺眼 */
  text-shadow: var(--glow-cyan, 0 0 10px rgba(0, 229, 255, 0.8));
  transition: color 0.3s ease;
}

.header .subtitle {
  font-size: 1rem;
  /* 引入变量以适配主题，默认灰蓝色 */
  color: var(--text-main, #a0b6d4);
  opacity: 0.8;
  margin: 0;
  transition: color 0.3s ease;
}

/* 按钮样式 */
.theme-toggle {
  position: absolute;
  right: 0;      /* 靠右对齐 */
  top: 10px;     /* 距离顶部高度 */
  background: var(--panel-bg, rgba(12, 26, 56, 0.7));
  color: var(--text-main, #ffffff);
  border: 1px solid var(--primary-cyan, #00e5ff);
  padding: 8px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  z-index: 20; /* 确保不被其他元素遮挡 */
}

.theme-toggle:hover {
  box-shadow: var(--glow-cyan, 0 0 15px rgba(0, 229, 255, 0.4));
  transform: translateY(-2px);
}
</style>