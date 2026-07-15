<!-- <template>
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
            <div class="base-plate bottom-plate"></div>
            <div class="base-plate top-plate"></div>
            <div class="base-core"></div>
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

// 盾牌风格的 SVG（更接近你截图中的图标）
const icons: Record<string, string> = {
  '标注平台': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11l4-4 4 4"/><path d="M12 7v8"/></svg>`,
  '训练平台': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="12" r="3"/><path d="M12 9v-2"/><path d="M12 17v-2"/><path d="M9 12H7"/><path d="M17 12h-2"/></svg>`,
  '模型管理': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polygon points="12 8 8 11 12 14 16 11 12 8"/></svg>`
};

const defaultIcon = icons['标注平台'];
const currentIcon = computed(() => icons[props.title] || defaultIcon);
</script>

<style scoped>
.module-card {
  flex: 1;
  position: relative;
  border-radius: 16px;
  /* 模拟图片边缘的发光和底部的幽暗紫色 */
  background: linear-gradient(180deg, 
    color-mix(in srgb, var(--primary-cyan) 10%, transparent) 0%, 
    color-mix(in srgb, var(--primary-purple) 25%, transparent) 100%
  );
  box-shadow: 0 0 20px color-mix(in srgb, var(--primary-cyan) 15%, transparent), 
              inset 0 0 40px color-mix(in srgb, var(--primary-purple) 20%, transparent);
  transition: transform 0.3s ease, filter 0.3s ease;
  padding: 3px; /* 留出双线边框空间 */
}

/* 外层细边框 */
.module-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(135deg, 
    var(--primary-cyan) 0%, 
    transparent 30%, 
    transparent 70%, 
    var(--primary-purple) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* --- 加厚的折角包边 (还原图片四角细节) --- */
.tech-corner {
  position: absolute;
  width: 25px;
  height: 25px;
  border: 3px solid transparent;
  pointer-events: none;
  z-index: 2;
}
.top-left {
  top: -1px; left: -1px;
  border-top-color: var(--primary-cyan);
  border-left-color: var(--primary-cyan);
  border-top-left-radius: 16px;
}
.top-right {
  top: -1px; right: -1px;
  border-top-color: var(--primary-cyan);
  border-right-color: var(--primary-cyan);
  border-top-right-radius: 16px;
}
.bottom-left {
  bottom: -1px; left: -1px;
  border-bottom-color: var(--primary-purple);
  border-left-color: var(--primary-purple);
  border-bottom-left-radius: 16px;
}
.bottom-right {
  bottom: -1px; right: -1px;
  border-bottom-color: var(--primary-purple);
  border-right-color: var(--primary-purple);
  border-bottom-right-radius: 16px;
}

.module-card:hover {
  transform: translateY(-5px) scale(1.02);
  filter: brightness(1.2);
}

/* 内部内容区 */
.card-inner {
  height: 100%;
  background: color-mix(in srgb, var(--panel-bg) 80%, transparent);
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--primary-cyan) 20%, transparent); /* 内发光线 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  backdrop-filter: blur(10px);
}

/* --- 图标与标题横向布局 (靠拢图片排版) --- */
.content-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 25px; /* 拉开图标和文字的距离 */
  margin-bottom: 30px;
  width: 100%;
}

h2 {
  font-size: 2rem;
  margin: 0;
  font-weight: bold;
  letter-spacing: 3px;
  color: var(--text-main);
  text-shadow: 0 0 15px color-mix(in srgb, var(--primary-cyan) 60%, transparent);
}

/* --- 图标与 3D 底座组 --- */
.icon-stage {
  position: relative;
  width: 90px;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

/* 盾牌图标本身 */
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  color: #fff;
  /* 模拟图片中的六边形/盾牌背板 */
  background: color-mix(in srgb, var(--primary-cyan) 20%, transparent);
  border: 2px solid var(--primary-cyan);
  border-radius: 12px; 
  padding: 12px;
  z-index: 3;
  box-shadow: 0 0 20px color-mix(in srgb, var(--primary-cyan) 50%, transparent);
  animation: float-icon 3s ease-in-out infinite;
}

@keyframes float-icon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* 3D 底座层叠系统 */
.holo-base {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 200px; /* 增强3D透视 */
}

/* 底座通用属性 */
.base-plate {
  border-radius: 4px;
  transform: rotateX(75deg);
}

/* 最底层的宽大暗色托盘 */
.bottom-plate {
  width: 100px;
  height: 40px;
  background: color-mix(in srgb, var(--primary-cyan) 15%, transparent);
  border: 1px solid color-mix(in srgb, var(--primary-cyan) 50%, transparent);
  margin-top: -20px;
}

/* 中层的亮色平台 */
.top-plate {
  width: 70px;
  height: 30px;
  background: color-mix(in srgb, var(--primary-cyan) 30%, transparent);
  border: 2px solid var(--primary-cyan);
  box-shadow: 0 0 20px var(--primary-cyan);
  margin-top: -35px; /* 向上堆叠 */
  z-index: 1;
}

/* 中心高亮光芯 */
.base-core {
  width: 40px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 30px 10px var(--primary-cyan);
  transform: rotateX(75deg);
  margin-top: -25px;
  z-index: 2;
  opacity: 0.8;
}

/* --- 纯色高亮按钮 (高度还原图片) --- */
.enter-btn {
  /* 去掉渐变，改为实心亮青色 */
  background: var(--primary-cyan);
  border: none;
  border-radius: 8px; /* 图片里的按钮圆角较小 */
  color: #fff;
  padding: 10px 50px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  /* 按钮外围的发光投影 */
  box-shadow: 0 4px 20px color-mix(in srgb, var(--primary-cyan) 60%, transparent);
  transition: all 0.2s;
  letter-spacing: 1px;
}

.enter-btn:hover {
  background: #fff;
  color: var(--primary-cyan);
  box-shadow: 0 0 30px var(--primary-cyan);
}
</style> -->

<template>
  <div class="module-card">
    <div class="card-inner">
      <div class="content-top">
        <div class="icon-stage">
          <span class="icon" v-html="currentIcon"></span>
          
          <div class="holo-base">
            <div class="base-core"></div>
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

// 盾牌风格的 SVG，贴合机甲/科技主题
const icons: Record<string, string> = {
  '标注平台': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M8 11l4-4 4 4"/><path d="M12 7v8"/></svg>`,
  '训练平台': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="12" r="3"/><path d="M12 9v-2"/><path d="M12 17v-2"/><path d="M9 12H7"/><path d="M17 12h-2"/></svg>`,
  '模型管理': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polygon points="12 8 8 11 12 14 16 11 12 8"/></svg>`
};

const defaultIcon = icons['标注平台'];
const currentIcon = computed(() => icons[props.title] || defaultIcon);
</script>

<style scoped>
.module-card {
  flex: 1;
  position: relative;
  /* 👇 核心：引入背景图片 👇 */
  background-image: url('@/assets/card-bg-copy.png'); 
  background-size: 100% 100%; /* 让图片完全拉伸贴合卡片尺寸 */
  background-position: center;
  background-repeat: no-repeat;
  
  /* 为了防止背景图边缘锯齿，保留一定的圆角 */
  border-radius: 16px; 
  transition: transform 0.3s ease, filter 0.3s ease;
  min-height: 160px; /* 保证卡片有足够的高度撑开图片 */

  -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%);
  mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%);

  /* 👇 核心魔法：CSS 多边形裁切 (Clip-path) 👇 */
  clip-path: polygon(
    15px 0px,                 /* 1. 左上角切角起 */
    calc(50% - 65px) 0px,     /* 2. 顶部平边，直到凹槽左边缘 */
    calc(50% - 45px) 16px,    /* 3. 凹槽左侧向下倾斜 (深度16px) */
    calc(50% + 45px) 16px,    /* 4. 凹槽平底 */
    calc(50% + 65px) 0px,     /* 5. 凹槽右侧向上倾斜 */
    calc(100% - 15px) 0px,    /* 6. 顶部平边，直到右上切角 */
    100% 15px,                /* 7. 右上角切角 */
    100% calc(100% - 15px),   /* 8. 右边平边往下走（恢复为15px） */
    calc(100% - 15px) 100%,   /* 9. 正常的右下切角（不再误伤边框） */
    15px 100%,                /* 10. 底部平边，直到左下切角 */
    0px calc(100% - 15px),    /* 11. 左下角切角 */
    0px 15px                  /* 12. 回到起点 */
  );
}

.module-card:hover {
  transform: translateY(-5px) scale(1.02);
  /* 悬停时整体提亮，非常有科幻感 */
  filter: brightness(1.15) drop-shadow(0 10px 20px rgba(0, 229, 255, 0.3));
}

/* 内部内容区（由于背景图已经很丰富，这里不再需要复杂的半透明背景色） */
.card-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* 增加内边距，防止文字和按钮压到图片自带的发光边框上 */
  padding: 35px 25px; 
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
  font-weight: bold;
  letter-spacing: 2px;
  color: #ffffff; /* 在深色图上用纯白文字最清晰 */
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.8);
}

/* --- 图标容器 --- */
.icon-stage {
  position: relative;
  width: 70px;
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
  width: 55px;
  height: 55px;
  color: #fff;
  background: rgba(0, 229, 255, 0.15);
  border: 1.5px solid #00e5ff;
  border-radius: 12px; 
  padding: 10px;
  z-index: 3;
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.5), inset 0 0 10px rgba(0, 229, 255, 0.3);
  animation: float-icon 3s ease-in-out infinite;
}

@keyframes float-icon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* 极简底座（因为背景图已经很有深度了，底座越简单越高级） */
.holo-base {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  perspective: 200px;
}

.base-core {
  width: 50px;
  height: 15px;
  background: rgba(0, 229, 255, 0.3);
  border: 1px solid #00e5ff;
  border-radius: 50%;
  box-shadow: 0 0 20px #00e5ff;
  transform: rotateX(75deg);
  margin-top: -10px;
}

/* --- 按钮 --- */
.enter-btn {
  /* 使用纯正的青色渐变，呼应图片的边框颜色 */
  background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
  border: none;
  border-radius: 20px;
  color: #fff;
  padding: 10px 45px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 229, 255, 0.4);
  transition: all 0.3s;
}

.enter-btn:hover {
  background: linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%);
  box-shadow: 0 0 25px rgba(0, 229, 255, 0.8);
  filter: brightness(1.1);
}
</style>