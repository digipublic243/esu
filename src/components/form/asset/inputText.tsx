import { InputPropsType } from "@/src/types/props/input.type";
import { TextField } from "@mui/material";

export const InputText = (props: InputPropsType) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  };
  return (
    <TextField
      label={props.label}
      type={props.type || "text"}
      variant="outlined"
      fullWidth
      value={props.value}
      disabled={props.isDesabled}
      onChange={handleInputChange}
      placeholder={props.placeholder || "votre texte ici"}
      margin="dense"
      maxRows={props.maxRows || 10000}
      // InputProps={{
      //   className: "border-b-2 border-primary-hover focus:border-primary",
      // }}
    />
  );
};
