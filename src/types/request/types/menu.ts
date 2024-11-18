export type MenuAssetType = {
  id: string;
  refName: string | string;
  icon: string | null;
  name: string;
  applications: (
    | "WEB_ADMIN"
    | "MOBILE_AGENT"
    | "MOBILE_CLIENT"
    | "BACKOFFICE"
    | "ALL"
    | "MOBILE"
    | "WEB"
  )[];
  isActive: Boolean;
  verbose: string;
  path: string | null;
  parentId: string | null;
  pageId: string | null;
  officeId: string | null;
  page: MenuPage;
  childrens: MenuAssetType[];
};

export type MenuPage = {
  id: string;
  label: string;
  navigations: PageNaigationType[];
};

export type PageNaigationType = {
  id: string;
  viewId: string;
  label: string;
  menuPageId: string;
  view: ViewType;
};

export type ViewType = {
  id: string;
  dataType: "FORM" | "RECIPE_TABLER" | "BASIC_TABLER" | "GRAPH";
  mainPathId: string;
  label: string;
  mainPath: PathType;
  actions?: {
    label: string;
    pathId: string;
    path: PathType;
    viewId: string;
    view: ViewType;
  }[];
};

export type PathType = {
  id: string;
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
};
