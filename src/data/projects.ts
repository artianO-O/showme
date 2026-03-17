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
    id: 'vue3-blog',
    title: 'Vue3 核心知识博客',
    subtitle: 'Vue3 Source Code Blog',
    description:
      '系统梳理 Vue3 源码核心知识点，涵盖架构设计、响应式系统、虚拟DOM、编译器、组件系统与性能优化六大模块，提供完整的学习路径。',
    image: '/showme/images/project-placeholder.svg',
    tags: ['VuePress', 'Vue 3 源码', 'Markdown', 'GitHub Pages'],
    metrics: [
      { label: '知识模块', value: '6' },
      { label: '核心专题', value: '30+' },
      { label: '代码示例', value: '100+' },
    ],
    link: 'https://artiano-o.github.io/blogs/vue3-core.html',
    color: '#00f0ff',
  },
  {
    id: 'electron-app',
    title: '活动开发工具',
    subtitle: 'Electron Activity DevTool',
    description:
      '基于 Electron 打造的桌面端活动开发效率工具，集成活动模板生成、资源管理、本地调试等功能，大幅提升 H5 活动页开发效率。',
    image: '/showme/images/project-placeholder.svg',
    tags: ['Electron', 'Vue 3', 'Node.js', '桌面应用'],
    metrics: [
      { label: '开发提效', value: '70%' },
      { label: '内置模板', value: '10+' },
      { label: '工具集成', value: '5+' },
    ],
    link: 'https://github.com/artianO-O/electronApp',
    color: '#ffb800',
  },
  {
    id: 'dj-togo',
    title: '开发者效率工具箱',
    subtitle: 'DevBox - Developer Toolbox',
    description:
      '一站式前端开发工具集合，包含 JSON 格式化、正则测试、时间戳转换、Base64 编解码、颜色转换、Markdown 预览等常用工具，数据本地处理，隐私安全。',
    image: '/showme/images/project-placeholder.svg',
    tags: ['React', 'Three.js', 'AI 助手', 'GitHub Pages'],
    metrics: [
      { label: '工具数量', value: '7+' },
      { label: '数据处理', value: '本地' },
      { label: 'AI 加持', value: '✓' },
    ],
    link: 'https://artiano-o.github.io/DJ_TOGO/',
    color: '#a855f7',
  },
  {
    id: 'yoo-compress',
    title: 'yoo-compress',
    subtitle: 'NPM Image Compression CLI',
    description:
      '基于 TinyPNG API 的图片压缩 CLI 工具，支持单文件和文件夹批量压缩，全局安装后一行命令即用。已发布到 npm，开箱即用。',
    image: '/showme/images/project-placeholder.svg',
    tags: ['Node.js', 'CLI', 'TinyPNG', 'npm 包'],
    metrics: [
      { label: '版本迭代', value: '9' },
      { label: 'npm 发布', value: '✓' },
      { label: '依赖数', value: '2' },
    ],
    link: 'https://www.npmjs.com/package/yoo-compress',
    color: '#f43f5e',
  },
]
