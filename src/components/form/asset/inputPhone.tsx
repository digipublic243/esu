"use client";

import { useState } from "react";
import { TextField, Box } from "@mui/material";
import { InputPropsType } from "@/src/types/props/input.type";

export default function InputPhone(props: InputPropsType) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(false);
  const maxLength = 11;

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D+/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})$/);
    if (match) {
      return `${match[1]}${match[2] ? " " + match[2] : ""}${
        match[3] ? " " + match[3] : ""
      }`;
    }
    return value;
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    const value = e.target.value.replace(/\s/g, "");
    const isNumeric = /^[0-9]*$/.test(value);

    if (isNumeric && value.length <= maxLength) {
      props.setValue(value);
      setPhoneNumber(formatPhoneNumber(value));
      setError(false);
    } else if (!isNumeric && value.length > 0) {
      setError(true);
    }
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
        width: "100%",
      }}
    >
      <TextField
        label={props.label}
        type={props.type}
        variant="outlined"
        value={phoneNumber}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: <span style={{ marginRight: "8px" }}>+243</span>,
        }}
        placeholder="000 000 000"
        inputProps={{ maxLength: maxLength }}
        fullWidth
        error={error}
        helperText={error ? "Veuillez entrer uniquement des chiffres" : ""}
        disabled={props.disabled}
      />
    </Box>
  );
}
