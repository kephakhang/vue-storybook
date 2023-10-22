import { computed } from "vue";

import {
  type Menu,
  useServerConfigStore,
} from "~/common/hooks/useServerConfigStore";

function getUrlFromMenu(menu: Menu) {
  let url = menu.url;

  if (!url && menu.children) {
    for (const child of menu.children) {
      url = getUrlFromMenu(child);
      if (url) break;
    }
  }

  return url;
}

function convertToUrl(value: string) {
  return `/${value.toLowerCase()}`;
}

export function useMenuList() {
  const store = useServerConfigStore();

  const appBarMenuList = computed(() => {
    const menuContents = store.salesonContext?.menuTree.content;
    if (!menuContents) return [];
    return menuContents
      .filter((menu) => menu.type === "CATEGORY")
      .map((menu) => ({
        title: menu.name,
        url: getUrlFromMenu(menu) ?? convertToUrl(menu.name),
        active: menu.active,
      }));
  });

  const appBarUtilMenuList = computed(() => {
    const menuContents = store.salesonContext?.menuTree.content;
    if (!menuContents) return [];
    return menuContents
      .filter((menu) => menu.type === "UTILITY")
      .map((menu) => ({
        title: menu.name,
        url: getUrlFromMenu(menu) ?? convertToUrl(menu.name),
        iconUrl: menu.icon!,
      }));
  });

  const filterMenuIsFunction = (
    menu: Menu
  ): menu is Omit<Menu, "type"> & { type: "FUNCTION" } => {
    return menu.type === "FUNCTION";
  };

  const filterMenuIsFunctionOrCategory = (
    menu: Menu
  ): menu is Omit<Menu, "type"> & { type: "FUNCTION" | "CATEGORY" } => {
    return menu.type === "FUNCTION" || menu.type === "CATEGORY";
  };

  const sideBarMenuList = computed<(SideBarNestedMenu | SideBarMenu)[]>(() => {
    const menuContents = store.salesonContext?.menuTree.content;
    const activatedContent = menuContents?.find((menu) => menu.active);

    const menuList: (SideBarNestedMenu | SideBarMenu)[] = [];
    if (!menuContents || !activatedContent) return menuList;

    return (
      activatedContent.children
        ?.filter(filterMenuIsFunctionOrCategory)
        .map((menu) => {
          if (menu.type === "CATEGORY") {
            return {
              type: menu.type,
              title: menu.name,
              children:
                menu.children?.filter(filterMenuIsFunction).map((menu) => ({
                  type: menu.type,
                  title: menu.name,
                  url: menu.url ?? convertToUrl(menu.name),
                  iconUrl: menu.icon!,
                  active: menu.active,
                })) ?? [],
            };
          }
          return {
            type: menu.type,
            title: menu.name,
            url: menu.url ?? convertToUrl(menu.name),
            iconUrl: menu.icon!,
            active: menu.active,
          };
        }) ?? []
    );
  });

  return { appBarMenuList, appBarUtilMenuList, sideBarMenuList };
}

type SideBarNestedMenu = {
  type: "CATEGORY";
  title: string;
  children: SideBarMenu[];
};

type SideBarMenu = {
  type: "FUNCTION";
  title: string;
  url: string;
  iconUrl: string;
  active: boolean;
};
