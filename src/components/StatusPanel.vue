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

// 获取图表容器引用
const hardwareChartRef = ref<HTMLElement | null>(null);
const projectChartRef = ref<HTMLElement | null>(null);

// 图表实例变量
let hardwareChart: echarts.ECharts | null = null;
let projectChart: echarts.ECharts | null = null;

// 通用迷你折线图配置函数
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
      show: false,
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      show: false,
      min: 'dataMin'
    },
    series: [
      {
        data: data,
        type: 'line',
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: '#00ffff',
          width: 2,
          shadowColor: 'rgba(0, 255, 255, 0.5)',
          shadowBlur: 5
        },
        areaStyle: {
          // 渐变填充效果
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0, 255, 255, 0.4)' },
            { offset: 1, color: 'rgba(0, 255, 255, 0)' }
          ])
        }
      }
    ]
  };
};

// 初始化图表实例
const initCharts = () => {
  if (hardwareChartRef.value) {
    hardwareChart = echarts.init(hardwareChartRef.value);
    hardwareChart.setOption(getMiniChartOption([70, 85, 82, 90, 88, 93, 96.5]));
  }

  if (projectChartRef.value) {
    projectChart = echarts.init(projectChartRef.value);
    projectChart.setOption(getMiniChartOption([10, 12, 14, 13, 16, 17, 18]));
  }
};

// 窗口尺寸变化处理
const handleResize = () => {
  hardwareChart?.resize();
  projectChart?.resize();
};

// 组件挂载时初始化图表并绑定事件
onMounted(() => {
  initCharts();
  window.addEventListener('resize', handleResize);
});

// 组件卸载时销毁实例并移除事件
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  hardwareChart?.dispose();
  projectChart?.dispose();
});
</script>

<style scoped>
/* 数据面板容器布局 */
.data-panels {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

/* 卡片基础样式 */
.data-card {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 160px;

  background-image: url('@/assets/panel-bg.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;

  /* 内边距与过渡效果 */
  padding: 25px 25px 20px 25px;
  transition: transform 0.3s ease, filter 0.3s ease;

  clip-path: polygon(6px 0px,
      calc(50% - 70px) 0px,
      calc(50% - 50px) 12px,
      calc(50% + 50px) 12px,
      calc(50% + 70px) 0px,
      calc(100% - 6px) 0px,
      100% 6px,
      100% calc(100% - 6px),
      calc(100% - 6px) 100%,
      6px 100%,
      0px calc(100% - 6px),
      0px 6px);
}

/* 卡片悬停效果 */
.data-card:hover {
  transform: translateY(-3px);
  filter: brightness(1.15);
}

/* 标题文本与装饰线 */
.data-card h3 {
  font-size: 1rem;
  margin: 0 0 20px 0;
  color: var(--text-main);
  border-left: 4px solid var(--primary-cyan);
  padding-left: 10px;
  text-shadow: 0 0 5px color-mix(in srgb, var(--primary-cyan) 60%, transparent);
  transition: color 0.3s ease;
}

/* 数据内容区布局 */
.data-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

/* 单个数据项布局 */
.data-item {
  display: flex;
  flex-direction: column;
}

/* 数据项标签文本 */
.data-item span {
  font-size: 0.85rem;
  color: color-mix(in srgb, var(--text-main) 70%, transparent);
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

/* 数据项数值文本 */
.data-item strong {
  font-size: 1.3rem;
  color: var(--text-main);
  transition: color 0.3s ease;
}

/* 高亮数值特别样式 */
.highlight {
  color: var(--primary-cyan) !important;
  font-size: 1.8rem !important;
  font-weight: bold;
  text-shadow: 0 0 10px color-mix(in srgb, var(--primary-cyan) 50%, transparent);
}

/* 图表容器尺寸及对齐 */
.mini-chart {
  height: 45px;
  width: 100%;
  margin-top: auto;
}
</style>