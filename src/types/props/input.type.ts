export type InputPropsType = {
  error?: any;
  label: string;
  variant?: string;
  value: any;
  defaultValue?: any;
  isDesabled?:boolean;
  placeholder?: string;
  maxRows?: number;
  type?: string;
  disabled?: boolean;
  setValue: (value: string | boolean | number | any[]) => void;
  setChecked?: (checked: boolean) => void;
  fields?: string[];
  modelPath?: string;
  displayColumns?: string[];
  readOnly?:boolean,
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
};