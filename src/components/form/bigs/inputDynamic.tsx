"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { InputText } from "../asset/inputText";
import InputNumber from "../asset/inputNumber";
import InputEmail from "../asset/inputEmail";
import MultiSelect from "../asset/multiSelect";
import InputDate from "../asset/inputDate";
// import InputFile from "../../../app/dp/test/test/page";
import { InputPropsType } from "@/src/types/props/input.type";
import ControlledCheckbox from "../asset/controlledCheckbox";
import { HeadProprety } from "@/src/types/form/currentForm";
import InputPhone from "../asset/inputPhone";
import SingleSelect from "../asset/sigleSelect";
import { InputPassword } from "../asset/inputPassword";
import WebCamComponent from "../asset/webCam";
import InputFile from "../asset/inputFile";

export const InputDynamic = (props: {
  headProprety: HeadProprety;
  inputProps: InputPropsType;
  setError?: (error: string | null) => void;
}) => {
  const { constraints } = props.headProprety;

  const validate = (value: string) => {
    if (constraints?.isNotEmpty && !value) {
      return "Ce champ est requis.";
    }
    if (constraints?.minLength && value.length < constraints.minLength) {
      return `Doit avoir au moins ${constraints.minLength} caractères.`;
    }
    if (constraints?.maxLength && value.length > constraints.maxLength) {
      return `Ne doit pas dépasser ${constraints.maxLength} caractères.`;
    }
    if (constraints?.isEmail && !/\S+@\S+\.\S+/.test(value)) {
      return "Email invalide.";
    }
    return null;
  };

  const handleChange = (value: string) => {
    props.inputProps.setValue(value);
    const error = validate(value);
    if (props.setError) props.setError(error);
  };

  const getInputType = () => {
    switch (props.headProprety.type) {
      case "string":
        return (
          <InputText {...{ ...props.inputProps, onChange: handleChange }} />
        );
      case "number":
        return (
          <InputNumber {...{ ...props.inputProps, onChange: handleChange }} />
        );
      case "email":
        return (
          <InputEmail {...{ ...props.inputProps, onChange: handleChange }} />
        );
      case "checkBox":
        return <MultiSelect {...props.inputProps} />;
      case "boolean":
        return <ControlledCheckbox {...props.inputProps} />;
      case "select":
        return <SingleSelect {...props.inputProps} />;
      case "date":
        return (
          <InputDate {...{ ...props.inputProps, onChange: handleChange }} />
        );
      case "files":
        return <InputFile {...props.inputProps} />;
      case "phone":
        return <InputPhone {...props.inputProps} />;
      case "password":
        return <InputPassword {...props.inputProps} />;
      case "webCam":
        return <WebCamComponent {...props.inputProps} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      {getInputType()}
      {props.inputProps.error && (
        <Typography variant="caption" color="error" sx={{ fontWeight: 600 }}>
          {props.inputProps.error}
        </Typography>
      )}
    </Box>
  );
};
