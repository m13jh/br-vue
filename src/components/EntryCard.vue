<template>
  <div class="module-card">
    <div class="tech-corner top-left"></div>
    <div class="tech-corner top-right"></div>
    <div class="tech-corner bottom-left"></div>
    <div class="tech-corner bottom-right"></div>

    <div class="card-inner">
      <div class="content-top">
        <div class="icon-stage">
          <span class="icon" v-html="currentIcon"></span>
          <div class="holo-base">
            <div class="base-layer"></div>
            <div class="base-layer small"></div>
          </div>
        </div>
        <h2>{{ title }}</h2>
      </div>
      
      <button class="enter-btn">进入平台</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ title: string }>();

const icons: Record<string, string> = {
  '标注平台': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  '训练平台': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  '模型管理': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>`
};

const defaultIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;

const currentIcon = computed(() => {
  return icons[props.title] || defaultIcon;
});
</script>

<style scoped>
.module-card {
  flex: 1;
  position: relative;
  border-radius: 12px;
  /* 使用 color-mix 为主题色添加透明度 */
  background: linear-gradient(135deg, 
    color-mix(in srgb, var(--primary-cyan) 15%, transparent) 0%, 
    color-mix(in srgb, var(--primary-purple) 15%, transparent) 100%
  );
  box-shadow: var(--glow-cyan), inset 0 0 30px color-mix(in srgb, var(--primary-cyan) 20%, transparent);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 2px;
}

/* 渐变中空边框 */
.module-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 1px;
  background: linear-gradient(135deg, 
    var(--primary-cyan) 0%, 
    color-mix(in srgb, var(--primary-cyan) 10%, transparent) 40%, 
    color-mix(in srgb, var(--primary-purple) 10%, transparent) 60%, 
    var(--primary-purple) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* --- 科技感边角修饰 --- */
.tech-corner {
  position: absolute;
  width: 15px;
  height: 15px;
  border: 2px solid transparent;
  pointer-events: none;
  z-index: 2;
}
.top-left {
  top: -1px; left: -1px;
  border-top-color: var(--primary-cyan);
  border-left-color: var(--primary-cyan);
  border-top-left-radius: 12px;
}
.top-right {
  top: -1px; right: -1px;
  border-top-color: var(--primary-cyan);
  border-right-color: var(--primary-cyan);
  border-top-right-radius: 12px;
}
.bottom-left {
  bottom: -1px; left: -1px;
  border-bottom-color: var(--primary-purple);
  border-left-color: var(--primary-purple);
  border-bottom-left-radius: 12px;
}
.bottom-right {
  bottom: -1px; right: -1px;
  border-bottom-color: var(--primary-purple);
  border-right-color: var(--primary-purple);
  border-bottom-right-radius: 12px;
}

.module-card:hover {
  transform: translateY(-5px);
  /* 悬停时增强光效 */
  box-shadow: 0 0 30px color-mix(in srgb, var(--primary-cyan) 50%, transparent), 
              inset 0 0 30px color-mix(in srgb, var(--primary-purple) 30%, transparent);
}

/* 内部内容区 */
.card-inner {
  height: 100%;
  /* 直接使用全局面板背景变量 */
  background: var(--panel-bg);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  backdrop-filter: blur(8px);
}

/* --- 图标与标题横向布局 --- */
.content-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 25px;
  width: 100%;
}

h2 {
  font-size: 1.8rem;
  margin: 0;
  font-weight: 700;
  letter-spacing: 2px;
  /* 文字跟随主题 */
  color: var(--text-main);
  text-shadow: var(--glow-cyan);
}

/* --- 图标与全息底座 --- */
.icon-stage {
  position: relative;
  width: 80px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: var(--primary-cyan); /* 让图标保持青色高亮，比文字更突出 */
  background: color-mix(in srgb, var(--primary-cyan) 10%, transparent);
  border: 1.5px solid color-mix(in srgb, var(--primary-cyan) 80%, transparent);
  border-radius: 12px;
  padding: 10px;
  z-index: 2;
  box-shadow: var(--glow-cyan);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* 全息 3D 底座 */
.holo-base {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 150px;
}

.base-layer {
  width: 70px;
  height: 25px;
  background: color-mix(in srgb, var(--primary-cyan) 20%, transparent);
  border: 1.5px solid var(--primary-cyan);
  transform: rotateX(75deg);
  box-shadow: var(--glow-cyan);
  margin-top: -15px;
}
.base-layer.small {
  width: 50px;
  height: 20px;
  background: color-mix(in srgb, var(--primary-cyan) 40%, transparent);
  box-shadow: 0 0 20px var(--primary-cyan);
}

/* --- 底部按钮 --- */
.enter-btn {
  /* 按钮渐变融合两种主题色 */
  background: linear-gradient(90deg, var(--primary-cyan) 0%, var(--primary-purple) 100%);
  border: none;
  border-radius: 20px;
  color: #ffffff; /* 按钮文字通常保持纯白以保证对比度 */
  padding: 8px 35px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--glow-cyan);
  transition: all 0.3s;
}

.enter-btn:hover {
  box-shadow: var(--glow-purple); /* 悬停时切换光效颜色增加动感 */
  filter: brightness(1.1);
}
</style>