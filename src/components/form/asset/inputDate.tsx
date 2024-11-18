"use client";

import { InputPropsType } from "@/types/props/input.type";
import { useState } from "react";
import { TextField, Box } from "@mui/material";
import dayjs from "dayjs";

export default function InputDate(props: InputPropsType) {
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState(false);

  const isValidDate = (date: string) => {
    return dayjs(date, "YYYY-MM-DD", true).isValid();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;

    if (isValidDate(inputDate)) {
      setSelectedDate(inputDate);
      setError(false);
      const formattedDate = dayjs(inputDate).toISOString();
      props.setValue(formattedDate);
    } else {
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
        gap: 2,
        width: "100%",
      }}
    >
      <TextField
        disabled={props.disabled}
        label={props.label}
        type={props.type || "date"}
        value={selectedDate}
        onChange={handleDateChange}
        error={error} // Affiche une erreur si la date est invalide
        helperText={error ? "Date invalide" : ""}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />
    </Box>
  );
}
