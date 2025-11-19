import { memo, useCallback, useMemo } from 'react'

import PerfectScrollbar from 'react-perfect-scrollbar'

import { Chip } from '@mui/material'

import { MenuItem, MenuSection, SubMenu } from '@/@menu/vertical-menu'

import { hasActiveChild, isDirectItem, isPathActive, isSection, isSubMenu } from './helper'

import type { VerticalMenuContextProps } from '@/@menu/components/vertical-menu/Menu'
import type {
  BaseMenuItem,
  ChipConfig,
  DirectMenuItem,
  RenderExpandIconProps,
  SectionItem,
  SubMenuItem,
  VerticalMenuProps
} from './types'
import StyledVerticalNavExpandIcon from '@/@menu/styles/vertical/StyledVerticalNavExpandIcon'
import { ICON_CLASSES } from '@/configs/menu'

type MenuItem = DirectMenuItem | SubMenuItem | SectionItem

interface SectionRendererProps {
  config: SectionItem
  currentPath: string
  activeParents: string[]
}

export const SectionRenderer = memo(({ config, currentPath, activeParents }: SectionRendererProps) => (
  <MenuSection label={config.label}>
    {config.items.map((item, index) => {
      const key = `${item.label}-${index}`

      if (isSubMenu(item)) {
        return <SubMenuRenderer key={key} config={item} currentPath={currentPath} activeParents={activeParents} />
      }

      if (isDirectItem(item)) {
        return <MenuItemRenderer key={key} item={item} currentPath={currentPath} />
      }

      return null
    })}
  </MenuSection>
))

SectionRenderer.displayName = 'SectionRenderer'

const Icon = memo(({ className }: { className: string }) => <i className={className} />)

Icon.displayName = 'Icon'

const CustomChip = memo(({ config }: { config: ChipConfig }) => (
  <Chip label={config.label} size='small' color={config.color} variant={config.variant || 'filled'} />
))

CustomChip.displayName = 'CustomChip'

const RenderExpandIcon = memo(({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <Icon className={ICON_CLASSES.arrowRight} />
  </StyledVerticalNavExpandIcon>
))

RenderExpandIcon.displayName = 'RenderExpandIcon'

interface MenuItemRendererProps {
  item: BaseMenuItem
  currentPath: string
}

const MenuItemRenderer = memo(({ item, currentPath }: MenuItemRendererProps) => {
  const href = item.href
  const isActive = isPathActive(item.href, currentPath)

  const menuItemProps = useMemo(
    () => ({
      href,
      active: isActive,
      ...(item.target && { target: item.target }),
      ...(item.icon && { icon: <Icon className={item.icon} /> })
    }),
    [href, isActive, item.target, item.icon]
  )

  return <MenuItem {...menuItemProps}>{item.label}</MenuItem>
})

MenuItemRenderer.displayName = 'MenuItemRenderer'

interface SubMenuRendererProps {
  config: SubMenuItem
  currentPath: string
  activeParents: string[]
  level?: number
}

const SubMenuRenderer = memo(({ config, currentPath, activeParents, level = 0 }: SubMenuRendererProps) => {
  const isActive = activeParents.includes(config.label)
  const hasActive = hasActiveChild(config.items, currentPath)

  const suffix = useMemo(() => {
    if (config.chip) return <CustomChip config={config.chip} />

    return undefined
  }, [config.chip])

  const icon = useMemo(() => <Icon className={config.icon} />, [config.icon])

  return (
    <SubMenu label={config.label} icon={icon} suffix={suffix} defaultOpen={isActive || hasActive}>
      {config.items.map((item, index) => {
        const key = `${item.label}-${level}-${index}`

        if (isSubMenu(item)) {
          return (
            <SubMenuRenderer
              key={key}
              config={item}
              currentPath={currentPath}
              activeParents={activeParents}
              level={level + 1}
            />
          )
        }

        if ('href' in item) {
          return <MenuItemRenderer key={key} item={item} currentPath={currentPath} />
        }

        return null
      })}
    </SubMenu>
  )
})

SubMenuRenderer.displayName = 'SubMenuRenderer'

interface DynamicMenuItemProps {
  item: MenuItem
  index: number
  currentPath: string
  activeParents: string[]
}

export const DynamicMenuItem = memo(({ item, index, currentPath, activeParents }: DynamicMenuItemProps) => {
  const key = `${item.type}-${item.label}-${index}`

  if (isSection(item)) {
    return <SectionRenderer key={key} config={item} currentPath={currentPath} activeParents={activeParents} />
  }

  if (isSubMenu(item)) {
    return <SubMenuRenderer key={key} config={item} currentPath={currentPath} activeParents={activeParents} />
  }

  if (isDirectItem(item)) {
    return <MenuItemRenderer key={key} item={item} currentPath={currentPath} />
  }

  return null
})

DynamicMenuItem.displayName = 'DynamicMenuItem'

export const useScrollWrapper = (isBreakpointReached: boolean, scrollMenu: VerticalMenuProps['scrollMenu']) => {
  const ScrollWrapper: typeof PerfectScrollbar | 'div' = isBreakpointReached ? 'div' : PerfectScrollbar

  const scrollProps = useMemo(
    () =>
      isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: (container: any) => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: (container: any) => scrollMenu(container, true)
          },
    [isBreakpointReached, scrollMenu]
  )

  return { ScrollWrapper, scrollProps }
}

export const useMenuRenderers = (transitionDuration: VerticalMenuContextProps['transitionDuration']) => {
  const renderExpandIcon = useCallback(
    ({ open }: { open?: boolean }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />,
    [transitionDuration]
  )

  const renderExpandedMenuItemIcon = useMemo(() => ({ icon: <Icon className={ICON_CLASSES.circle} /> }), [])

  return { renderExpandIcon, renderExpandedMenuItemIcon }
}
