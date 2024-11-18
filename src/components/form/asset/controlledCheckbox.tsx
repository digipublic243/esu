"use client";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { InputPropsType } from "@/src/types/props/input.type";
import { Box } from "@mui/material";

export default function ControlledCheckbox(props: InputPropsType) {
  // React.useEffect(() => {
  //   props.setValue(false);
  // });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(event.target.checked);
  };

  return (
    <Box>
      <Checkbox
        checked={typeof props.value == "boolean" ? props.value : false}
        onChange={handleInputChange}
      />
      {props.label}
    </Box>
  );
}
