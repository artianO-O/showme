export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  tags: string[]
  metrics: { label: string; value: string }[]
  link?: string
  color: string
}

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: '电商平台',
    subtitle: 'E-Commerce Platform',
    description:
      '从零搭建的大型电商前端架构，涵盖商品展示、购物车、支付流程、用户中心等核心模块。基于 Vue 3 + TypeScript，日均 PV 50W+。',
    image: '/showme/images/project-placeholder.svg',
    tags: ['Vue 3', 'TypeScript', 'Pinia', 'SSR'],
    metrics: [
      { label: '日均 PV', value: '50W+' },
      { label: '首屏提速', value: '60%' },
      { label: '模块数', value: '120+' },
    ],
    color: '#00f0ff',
  },
  {
    id: 'data-dashboard',
    title: '数据可视化平台',
    subtitle: 'Data Visualization Dashboard',
    description:
      '企业级数据看板系统，实时展示业务核心指标，支持自定义图表配置、拖拽布局、数据大屏展示。',
    image: '/showme/images/project-placeholder.svg',
    tags: ['Vue 3', 'ECharts', 'WebSocket', 'Canvas'],
    metrics: [
      { label: '图表类型', value: '40+' },
      { label: '实时延迟', value: '<200ms' },
      { label: '用户数', value: '2000+' },
    ],
    color: '#ffb800',
  },
  {
    id: 'design-system',
    title: '组件库 & 设计系统',
    subtitle: 'Component Library & Design System',
    description:
      '统一团队研发效能的组件库，包含 60+ 业务组件、完整文档系统、主题定制能力，被 5 个产品线复用。',
    image: '/showme/images/project-placeholder.svg',
    tags: ['Vue 3', 'Vite', 'Storybook', 'SCSS'],
    metrics: [
      { label: '组件数', value: '60+' },
      { label: '覆盖产品线', value: '5' },
      { label: '周下载', value: '3K+' },
    ],
    color: '#a855f7',
  },
  {
    id: 'h5-activities',
    title: 'H5 活动引擎',
    subtitle: 'H5 Campaign Engine',
    description:
      '高性能 H5 活动页生产系统，支持抽奖、排行榜、互动游戏等多种活动玩法，单场活动 UV 百万级。',
    image: '/showme/images/project-placeholder.svg',
    tags: ['Vue 3', 'Canvas', 'GSAP', '性能优化'],
    metrics: [
      { label: '单场 UV', value: '100W+' },
      { label: '活动场次', value: '200+' },
      { label: '转化率提升', value: '35%' },
    ],
    color: '#f43f5e',
  },
  {
    id: 'lowcode-platform',
    title: '低代码搭建平台',
    subtitle: 'Low-Code Builder',
    description:
      '面向运营人员的可视化页面搭建工具，拖拽式编辑器 + 物料市场 + 一键发布，将页面上线周期从 3 天缩短至 2 小时。',
    image: '/showme/images/project-placeholder.svg',
    tags: ['React', 'TypeScript', 'DnD', 'AST'],
    metrics: [
      { label: '效率提升', value: '90%' },
      { label: '运营用户', value: '500+' },
      { label: '累计页面', value: '8000+' },
    ],
    color: '#10b981',
  },
]
