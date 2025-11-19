import type { MenuItem } from '@/types/menu'

export const ICON_CLASSES = {
  home: 'ri-home-smile-line',
  file: 'ri-file-copy-line',
  email: 'ri-mail-open-line',
  chat: 'ri-wechat-line',
  calendar: 'ri-calendar-line',
  kanban: 'ri-drag-drop-line',
  shield: 'ri-shield-keyhole-line',
  question: 'ri-question-line',
  arrowRight: 'ri-arrow-right-s-line',
  circle: 'ri-circle-line'
} as const

export const MENU_CONFIG: MenuItem[] = [
  {
    type: 'submenu',
    label: 'Dashboards',
    icon: ICON_CLASSES.home,
    chip: { label: '5', color: 'error' },
    items: [
      { type: 'item', label: 'Dashboard', href: '/' },
      { type: 'item', label: 'Account Settings', href: '/account-settings' },
      { type: 'item', label: 'Card Basic', href: '/card-basic' },
      { type: 'item', label: 'Form Layouts', href: '/form-layouts' }
    ]
  },
  {
    type: 'submenu',
    label: 'Front Pages',
    icon: ICON_CLASSES.file,
    items: [
      { type: 'item', label: 'Login', href: '/login' },
      { type: 'item', label: 'Register', href: '/register' },
      { type: 'item', label: 'Forgot Password', href: '/forgot-password' },
      { type: 'item', label: 'Error', href: '/error' },
      { type: 'item', label: 'Under Maintenance', href: '/under-maintenance' }
    ]
  }
]
