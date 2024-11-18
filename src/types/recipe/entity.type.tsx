export type BasicObjectType = {
  id: string;
  name: string;
};

export type Recipe = {
  id: string;
  entity: BasicObjectType;
  categoryRecipe: BasicObjectType | null;
  currency: BasicObjectType | null;
  description: string;
  generatingFact: string;
  pricing: string | null;
  childrens: Recipe[];
};

export type ActivitySectors = {
  id: string;
  name: string;
  recipes: Recipe[];
};

export type EntityWithSectorAndChildrensAndRecipes = {
  id: string;
  name: string;
  parentEntityId: string;
  activitySectors: ActivitySectors[];
  childrens: EntityWithSectorAndChildrensAndRecipes[];
  recipes?: Recipe[];
};
