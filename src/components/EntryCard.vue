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

// 盾牌风格的 SVG
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

  background-image: url('@/assets/card-bg.png'); 
  background-size: 100% 100%; /* 让图片完全拉伸贴合卡片尺寸 */
  background-position: center;
  background-repeat: no-repeat;
  
  /* 为了防止背景图边缘锯齿，保留一定的圆角 */
  border-radius: 16px; 
  transition: transform 0.3s ease, filter 0.3s ease;
  min-height: 160px; /* 保证卡片有足够的高度撑开图片 */

  -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%);
  mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%);

  /* CSS 多边形裁切 */
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
  /* 悬停时整体提亮 */
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
  transform: translateY(12px);
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
  margin-top: 12px;
}

@keyframes float-icon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* 底座 */
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