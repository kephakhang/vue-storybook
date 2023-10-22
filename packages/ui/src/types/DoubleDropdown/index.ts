export type ChildrenItemType = Record<string, string> & {
  title: string;
  checked?: boolean;
  code: string;
};

export type ItemType = {
  title: string;
  id: string;
  childrens: ChildrenItemType[];
};
