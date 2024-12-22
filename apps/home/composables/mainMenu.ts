import type { MainMenuLinkItem, MainMenuParentItem } from '@crearis/ui'
import type { NavItem } from '@nuxt/content'
import type { RouteLocation } from 'vue-router'

export const useMainMenu = () =>
  useState<{ items: MainMenuParentItem[]; navigation: NavItem[] }>('mainMenu', () => ({
    items: [],
    navigation: [],
  }))

/**
 * Transforms the Nuxt Content navigation into `@crearis/ui` main menu items.
 * It also sets the `expanded` and `active` properties based on the `activeRoute`.
 */
export function refreshMainMenu(activeRoute: RouteLocation | string) {
  const path = typeof activeRoute === 'string' ? activeRoute : activeRoute.path
  const mainMenu = useMainMenu().value
  const navigation = mainMenu.navigation

  // if item has children, it cannot have a direct link (folder-logic)
  mainMenu.items = navigation.map((item) => ({
    label: item.title,
    children: item.children ? navigationToMenuItems(item.children, activeRoute) : [],
    link: item.children ? undefined : item._path,
    expanded: path === item._path || path.startsWith(`${item._path}/`),
    path: item._path + (item.children?.length ? '/' : ''), // used for the active class and for folder-logic (hidefolders)
  }))

  if (mainMenu.items.every(({ expanded }) => !expanded)) {
    mainMenu.items[0].expanded = true
  }
}

function navigationToMenuItems(
  navigation: NavItem[],
  activeRoute: RouteLocation | string,
): (MainMenuParentItem | MainMenuLinkItem)[] {
  const path = typeof activeRoute === 'string' ? activeRoute : activeRoute.path

  return navigation.map((item) =>
    item.children?.length
      ? {
          label: item.title,
          children: item.children ? navigationToMenuItems(item.children, activeRoute) : [],
          expanded: path === item._path || path.startsWith(`${item._path}/`),
        }
      : {
          label: item.title,
          link: item._path,
          active: item._path === path,
        },
  )
}
