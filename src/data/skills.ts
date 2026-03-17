export interface SkillCategory {
  name: string
  icon: string
  skills: { name: string; level: number }[]
}

export interface RadarDimension {
  name: string
  value: number
}

export const radarData: RadarDimension[] = [
  { name: 'Vue 生态', value: 95 },
  { name: 'React', value: 75 },
  { name: 'CSS/动效', value: 90 },
  { name: 'TypeScript', value: 85 },
  { name: '工程化', value: 88 },
  { name: '性能优化', value: 82 },
  { name: 'Node.js', value: 70 },
  { name: '可视化', value: 78 },
]

export const skillCategories: SkillCategory[] = [
  {
    name: '核心框架',
    icon: '⚡',
    skills: [
      { name: 'Vue 3', level: 95 },
      { name: 'React', level: 75 },
      { name: 'Nuxt', level: 80 },
      { name: 'TypeScript', level: 85 },
    ],
  },
  {
    name: '样式 & 动效',
    icon: '🎨',
    skills: [
      { name: 'SCSS/CSS3', level: 92 },
      { name: 'GSAP', level: 85 },
      { name: 'Tailwind', level: 80 },
      { name: 'ECharts/D3', level: 78 },
    ],
  },
  {
    name: '工程化',
    icon: '🔧',
    skills: [
      { name: 'Vite/Webpack', level: 88 },
      { name: 'CI/CD', level: 80 },
      { name: 'Git', level: 90 },
      { name: '单元测试', level: 72 },
    ],
  },
  {
    name: '其他',
    icon: '🌐',
    skills: [
      { name: 'Node.js', level: 70 },
      { name: '性能优化', level: 82 },
      { name: '小程序', level: 78 },
      { name: 'Docker', level: 65 },
    ],
  },
]
