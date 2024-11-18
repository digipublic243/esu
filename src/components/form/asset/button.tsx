import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";

export function PrimaryButton(props: {
  type?: "button" | "reset" | "submit";
  variant?: "contained" | "outlined" | "text";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
  setIsEnabled?: (state: boolean) => void;
  className?: string;
  isLoading?: boolean;
  startIcon?: React.ReactNode,
  children?: any,
  width?: string
}) {
  const [loading, setLoading] = useState(
    props.isLoading ? props.isLoading : false
  );

  const handleClick = async () => {
    setLoading(true);
    if (props.setIsEnabled) props.setIsEnabled(true);
    try {
      await props.onClick();
    } catch (error) {
      console.error("Erreur lors de l'exécution du bouton :", error);
    } finally {
      setLoading(false);
      if (props.setIsEnabled) props.setIsEnabled(false);
    }
  };

  return (
    <Button
      type={props.type}
      variant={props.variant ? props.variant : "contained"}
      className={" " + props.className}
      color={props.color}
      startIcon={props.startIcon}
      sx={{
        padding: "12px",
        minWidth: "120px",
        position: "relative",
        width: props.width
      }}
      onClick={handleClick}
      disabled={props.isDisabled}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : ""}{" "}
      {props.text} {props.children}
    </Button>
  );
}
