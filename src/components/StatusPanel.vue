<template>
  <section class="data-panels">
    <div class="data-card">
      <h3>服务运行状态</h3>
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
      <h3>硬件资源</h3>
      <div class="data-content">
        <div class="data-item">
          <strong class="highlight">96.50%</strong>
        </div>
        <div class="data-item">
          <strong>1650条</strong>
        </div>
      </div>
      <div ref="hardwareChartRef" class="mini-chart"></div>
    </div>

    <div class="data-card">
      <h3>活跃项目</h3>
      <div class="data-content">
        <div class="data-item">
          <strong class="highlight">18项目</strong>
        </div>
        <div class="data-item">
          <strong>18个</strong>
        </div>
      </div>
      <div ref="projectChartRef" class="mini-chart"></div>
    </div>

    <div class="data-card">
      <h3>业务运营</h3>
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
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

// 获取 DOM 引用
const hardwareChartRef = ref<HTMLElement | null>(null);
const projectChartRef = ref<HTMLElement | null>(null);

// 图表实例
let hardwareChart: echarts.ECharts | null = null;
let projectChart: echarts.ECharts | null = null;

// 通用的迷你折线图配置工厂函数 (科幻极简风)
const getMiniChartOption = (data: number[]) => {
  return {
    grid: {
      left: 0,
      right: 0,
      top: 5,
      bottom: 0
    },
    xAxis: {
      type: 'category',
      show: false, // 隐藏X轴
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      show: false, // 隐藏Y轴
      min: 'dataMin' // 自动适应最小值，让折线波动更明显
    },
    series: [
      {
        data: data,
        type: 'line',
        smooth: true, // 平滑曲线
        showSymbol: false, // 隐藏数据点，悬浮时才显示
        lineStyle: {
          color: '#00ffff', // 青色线条，对应 var(--primary-cyan)
          width: 2,
          shadowColor: 'rgba(0, 255, 255, 0.5)',
          shadowBlur: 5
        },
        areaStyle: {
          // 渐变填充，增加科幻发光感
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 255, 255, 0.4)' },
            { offset: 1, color: 'rgba(0, 255, 255, 0)' }
          ])
        }
      }
    ]
  };
};

const initCharts = () => {
  // 初始化硬件资源图表
  if (hardwareChartRef.value) {
    hardwareChart = echarts.init(hardwareChartRef.value);
    // 模拟数据
    hardwareChart.setOption(getMiniChartOption([70, 85, 82, 90, 88, 93, 96.5]));
  }

  // 初始化活跃项目图表
  if (projectChartRef.value) {
    projectChart = echarts.init(projectChartRef.value);
    // 模拟数据
    projectChart.setOption(getMiniChartOption([10, 12, 14, 13, 16, 17, 18]));
  }
};

// 监听窗口大小改变，实现图表自适应
const handleResize = () => {
  hardwareChart?.resize();
  projectChart?.resize();
};

onMounted(() => {
  initCharts();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  hardwareChart?.dispose();
  projectChart?.dispose();
});
</script>

<style scoped>
.data-panels {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

.data-card {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 160px; /* 给一个最小高度，撑开背景图 */
  
  /* 👇 引入全新的科幻背景图 👇 */
  background-image: url('@/assets/panel-bg.png'); 
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  
  /* 调整内边距：把文字往中间挤一点，避免压到背景图自带的发光边框 */
  padding: 25px 25px 20px 25px; 
  transition: transform 0.3s ease, filter 0.3s ease;
  
  /* 👇 核心魔法：和上方入口卡片完全一致的多边形物理切角 👇 */
  clip-path: polygon(
    6px 0px,                  /* 1. 左上角切角变小 (15px -> 6px) */
    calc(50% - 70px) 0px,     /* 2. 顶部平边 */
    calc(50% - 50px) 12px,    /* 3. 凹槽变浅 (16px -> 12px) */
    calc(50% + 50px) 12px,    /* 4. 凹槽平底 */
    calc(50% + 70px) 0px,     /* 5. 凹槽右侧 */
    calc(100% - 6px) 0px,     /* 6. 顶部平边 */
    100% 6px,                 /* 7. 右上角切角 */
    100% calc(100% - 6px),    /* 8. 右边平边往下 */
    calc(100% - 6px) 100%,    /* 9. 右下切角 */
    6px 100%,                 /* 10. 底部平边 */
    0px calc(100% - 6px),     /* 11. 左下角切角 */
    0px 6px                   /* 12. 回到起点 */
  );
}

/* 悬停时的呼吸发光感 */
.data-card:hover {
  transform: translateY(-3px);
  filter: brightness(1.15);
}

/* 标题样式保留，左侧的竖线装饰很好看 */
.data-card h3 {
  font-size: 1rem;
  margin: 0 0 20px 0;
  color: var(--text-main);
  border-left: 4px solid var(--primary-cyan);
  padding-left: 10px;
  text-shadow: 0 0 5px color-mix(in srgb, var(--primary-cyan) 60%, transparent);
  transition: color 0.3s ease;
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
  font-size: 0.85rem;
  color: color-mix(in srgb, var(--text-main) 70%, transparent);
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.data-item strong {
  font-size: 1.3rem;
  color: var(--text-main);
  transition: color 0.3s ease;
}

.highlight {
  color: var(--primary-cyan) !important;
  font-size: 1.8rem !important;
  font-weight: bold;
  text-shadow: 0 0 10px color-mix(in srgb, var(--primary-cyan) 50%, transparent);
}

/* 替换为真实图表的容器样式 */
.mini-chart {
  height: 45px;
  width: 100%;
  margin-top: auto; /* 自动推到底部 */
}
</style>