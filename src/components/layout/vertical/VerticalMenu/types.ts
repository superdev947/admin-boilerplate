import type { VerticalMenuContextProps } from '@/@menu/components/vertical-menu/Menu'

export interface RenderExpandIconProps {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

export interface BaseMenuItem {
  type: string
  label: string
  href: string
  icon?: string
  target?: '_blank' | '_self'
}

export interface ChipConfig {
  label: string
  color: 'error' | 'primary' | 'secondary' | 'success' | 'warning' | 'info'
  variant?: 'filled' | 'outlined' | 'tonal'
}

export interface SubMenuItem {
  type: 'submenu'
  label: string
  icon: string
  items: (BaseMenuItem | SubMenuItem)[]
  chip?: ChipConfig
}

export interface DirectMenuItem extends BaseMenuItem {
  type: 'item'
}

export interface SectionItem {
  type: 'section'
  label: string
  items: (DirectMenuItem | SubMenuItem)[]
}

export type MenuItem = DirectMenuItem | SubMenuItem | SectionItem

export interface VerticalMenuProps {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}
