import type { BaseMenuItem, DirectMenuItem, MenuItem, SectionItem, SubMenuItem } from './types'

export const isSubMenu = (item: MenuItem | BaseMenuItem | SubMenuItem): item is SubMenuItem =>
  'type' in item && item.type === 'submenu'

export const isSection = (item: MenuItem): item is SectionItem => item.type === 'section'

export const isDirectItem = (item: MenuItem | BaseMenuItem | SubMenuItem): item is DirectMenuItem =>
  'type' in item && item.type === 'item'

export const isPathActive = (href: string, currentPath: string): boolean => {
  if (href === '/') return currentPath === '/'

  return currentPath === href || currentPath.startsWith(`${href}/`)
}

export const hasActiveChild = (items: (BaseMenuItem | SubMenuItem)[], currentPath: string): boolean => {
  return items.some(item => {
    if (isSubMenu(item)) {
      return hasActiveChild(item.items, currentPath)
    }

    if ('href' in item) {
      return isPathActive(item.href, currentPath)
    }

    return false
  })
}

export const getActiveParents = (config: MenuItem[], currentPath: string, parentPath: string[] = []): string[] => {
  const activePaths: string[] = []

  config.forEach(item => {
    if (isSection(item)) {
      const sectionPaths = getActiveParents(item.items, currentPath, parentPath)

      activePaths.push(...sectionPaths)
    } else if (isSubMenu(item)) {
      const currentParentPath = [...parentPath, item.label]

      if (hasActiveChild(item.items, currentPath)) {
        activePaths.push(item.label)
        const childPaths = getActiveParents(item.items as MenuItem[], currentPath, currentParentPath)

        activePaths.push(...childPaths)
      }
    }
  })

  return activePaths
}
