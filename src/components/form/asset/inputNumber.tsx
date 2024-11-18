"use client";

import { useState } from "react";
import { TextField, Box } from "@mui/material";
import { InputPropsType } from "@/types/props/input.type";

export default function InputNumber(props: InputPropsType) {
  const [error, setError] = useState(false);
  const minValue = 1;
  const maxValue = 1000000000;

  const handleInputChange = (e: { target: { value: string } }) => {
    const value = e.target.value;

    const isNumeric = /^[0-9]*$/.test(value);
    if (isNumeric && value !== "") {
      const numValue = parseInt(value, 10);

      if (numValue >= minValue && numValue <= maxValue) {
        props.setValue(Number(numValue));
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextField
        label={props.label}
        variant="outlined"
        value={props.value}
        onChange={handleInputChange}
        type={props.type || "number"}
        inputProps={{
          min: minValue,
          max: maxValue,
        }}
        fullWidth
        error={error}
        helperText={
          error
            ? `Veuillez entrer un nombre entre ${minValue} et ${maxValue}`
            : ""
        }
        disabled={props.disabled}
      />
    </Box>
  );
}
