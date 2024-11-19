export type CurrentFormType = {
  title: string | null;
  headPath: string;
  subMitMethod?: "POST" | "PATCH" | "PUT";
  submitPath: string;
  inputs: HeadProprety[];
  hasChildrens: boolean;
  defaultField?: HeadProprety[];
};

export type HeadProprety = {
  proprety: string;
  constraints: {
    isNotEmpty?: boolean;
    minLength?: number;
    isString?: boolean;
    isList?: boolean;
    isMultipleChoici?: boolean;
    isEmail?: boolean;
    maxLength?: number;
    isBoolean?: boolean;
    isInt?: boolean;
    isEnum?: boolean;
    isArray?: boolean;
  };
  isDisabled?: boolean;
  defaultValue?: any;
  type?: string;
  fields?: string[];
  modelPath?: string;
  verbose: string;
  displayColumns?: string;
};
