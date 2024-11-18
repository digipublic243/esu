import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { InputPropsType } from "@/src/types/props/input.type";

export default function Checkboxes(props: InputPropsType) {
  return (
    <div>
      <Checkbox />
      <Checkbox />
      <Checkbox />
      <Checkbox />
      <Checkbox />
    </div>
  );
}
