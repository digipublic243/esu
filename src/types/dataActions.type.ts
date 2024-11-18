export type MethodType = {
  method: string;
  url: string;
  headPath?: string;
  label: {
    en?: string;
    fr: string;
  };
  info?: any;
  onClick?: (params?: any) => void;
};

export interface DataActionsType {
  getPostHead: MethodType;
  getPatchHead: MethodType;
  post: MethodType;
  get: MethodType;
  patch: MethodType;
  deleteOne: MethodType;
  getOne: MethodType;
  getOverview: MethodType;
}
