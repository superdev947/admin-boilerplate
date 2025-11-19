import { memo, useMemo } from 'react'

import { usePathname } from 'next/navigation'

import { useTheme } from '@mui/material/styles'

import { Menu } from '@menu/vertical-menu'
import useVerticalNav from '@menu/hooks/useVerticalNav'

import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import type { VerticalMenuProps } from './types'
import { getActiveParents } from './helper'
import { DynamicMenuItem, useMenuRenderers, useScrollWrapper } from './components'
import { MENU_CONFIG } from '@/configs/menu'

const VerticalMenu = ({ scrollMenu }: VerticalMenuProps) => {
  const theme = useTheme()
  const pathname = usePathname()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()

  const activeParents = useMemo(() => getActiveParents(MENU_CONFIG, pathname), [pathname])

  const { ScrollWrapper, scrollProps } = useScrollWrapper(!!isBreakpointReached, scrollMenu)
  const { renderExpandIcon, renderExpandedMenuItemIcon } = useMenuRenderers(transitionDuration)

  const menuStyles = useMemo(() => menuItemStyles(theme), [theme])
  const sectionStyles = useMemo(() => menuSectionStyles(theme), [theme])

  return (
    <ScrollWrapper {...scrollProps}>
      <Menu
        menuItemStyles={menuStyles}
        renderExpandIcon={renderExpandIcon}
        renderExpandedMenuItemIcon={renderExpandedMenuItemIcon}
        menuSectionStyles={sectionStyles}
      >
        {MENU_CONFIG.map((item, index) => (
          <DynamicMenuItem
            key={`menu-${index}`}
            item={item}
            index={index}
            currentPath={pathname}
            activeParents={activeParents}
          />
        ))}
      </Menu>
    </ScrollWrapper>
  )
}

export default memo(VerticalMenu)
