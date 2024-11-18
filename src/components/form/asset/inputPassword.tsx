import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { InputPropsType } from "@/types/props/input.type";

export const InputPassword = (props: InputPropsType) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.value);
  };

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      variant="outlined"
      fullWidth
      label={props.label}
      value={props.value}
      onChange={handleInputChange}
      placeholder={props.placeholder || "votre texte ici"}
      margin="dense"
      disabled={props.disabled}
      maxRows={props.maxRows || 10000}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? (
                <MdOutlineVisibilityOff />
              ) : (
                <MdOutlineVisibility />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
