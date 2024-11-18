"use client";

import { useState } from "react";
import { TextField, Box } from "@mui/material";
import { InputPropsType } from "@/types/props/input.type";

export default function InputEmail(props: InputPropsType) {
  const [error, setError] = useState(false);

  const handleInputChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    props.setValue(value);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setError(!isValidEmail && value.length > 0);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
      }}
    >
      <TextField
        label={props.label}
        type={props.type || "email"}
        variant="outlined"
        value={props.value}
        onChange={handleInputChange}
        fullWidth
        error={error}
        disabled={props.disabled}
        helperText={error ? "Veuillez entrer une adresse email valide" : ""}
      />
    </Box>
  );
}
