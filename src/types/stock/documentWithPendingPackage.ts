export type DocumentWithPackagesType = {
  id: string;
  labelId: string;
  recipeId: string;
  templateId: string;
  entityId: string;
  validity: string;
  createdAt: string;
  updatedAt: string;
  createBy: string;
  updateBy: string | null;
  label: {
    name: string;
    id: string;
  };
  packages: {
    id: string;
    label: string;
    number: number;
    reason: string;
    serie: null;
    documentId: string;
    isGenerated: boolean;
    isPrinted: boolean;
    referenceNumber: number;
    isExit: boolean;
    isAssigned: boolean;
    initiatedByUserId: string | null;
    generatedByUserId: string | null;
    assignateToUserId: string | null;
    createBy: string;
    updateBy: string | null;
    updatedAt: string;
    createdAt: string;
  }[];
};

export type DocumentackagesType = {
    id: string;
    label: string;
    number: number;
    reason: string;
    serie: null;
    documentId: string;
    isGenerated: boolean;
    isPrinted: boolean;
    referenceNumber: number;
    isExit: boolean;
    isAssigned: boolean;
    initiatedByUserId: string | null;
    generatedByUserId: string | null;
    assignateToUserId: string | null;
    createBy: string;
    updateBy: string | null;
    updatedAt: string;
    createdAt: string;
}
