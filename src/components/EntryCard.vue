<template>
  <div class="module-card">
    <div class="card-inner">
      <div class="icon-placeholder">
        <span class="icon" v-html="currentIcon"></span>
      </div>
      <h2>{{ title }}</h2>
      <button class="enter-btn">进入平台</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ title: string }>();

// 准备三套高品质的科技风 SVG 图标
const icons: Record<string, string> = {
  '标注平台': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  '训练平台': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  '模型管理': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>`
};

// 默认图标（如果 title 没匹配上，显示这个）
const defaultIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;

// 根据父组件传进来的 title 动态计算图标
const currentIcon = computed(() => {
  return icons[props.title] || defaultIcon;
});
</script>

<style scoped>
.module-card {
  flex: 1;
  position: relative;
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.15), inset 0 0 20px rgba(176, 98, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.module-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(135deg, var(--primary-cyan, #00e5ff), var(--primary-purple, #b062ff));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 25px rgba(0, 229, 255, 0.4), inset 0 0 20px rgba(176, 98, 255, 0.2);
}

.card-inner {
  height: 100%;
  background: linear-gradient(180deg, rgba(16, 33, 74, 0.2) 0%, rgba(10, 21, 50, 0.3) 100%);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  backdrop-filter: blur(3px); 
}

.icon-placeholder {
  width: 80px;
  height: 80px;
  background: rgba(0, 229, 255, 0.1);
  border: 1px solid var(--primary-cyan, #00e5ff);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 15px rgba(0, 229, 255, 0.3);
  margin-bottom: 20px;
}

/* 核心修改：定义 SVG 的样式，使其继承发光青色 */
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* 图标尺寸 */
  height: 40px;
  color: #00e5ff; /* 你的青色主题色 */
  filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.8)); /* 增加光效 */
}

h2 {
  font-size: 1.6rem;
  margin: 0 0 25px 0;
  font-weight: 600;
  letter-spacing: 2px;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
}

.enter-btn {
  background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
  border: none;
  border-radius: 25px;
  color: #fff;
  padding: 10px 40px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 229, 255, 0.4);
  transition: all 0.3s;
}

.enter-btn:hover {
  box-shadow: 0 4px 25px rgba(0, 229, 255, 0.7);
  filter: brightness(1.2);
}
</style>