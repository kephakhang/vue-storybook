export type SidebarMenu = {
  category: string;
  children?: {
    name: string;
    iconUrl: string;
    url?: string;
  }[];
};

export type SidebarMenuList = SidebarMenu[];
