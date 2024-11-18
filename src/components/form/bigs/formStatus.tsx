import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MdCheckCircle, MdError } from "react-icons/md";
import { PrimaryButton } from "../asset/button";

interface FormStatusProps {
  response: {
    code: number;
    message: string;
    error?: { code: number; message: string };
  };
  onEdit: () => void;
  onBack: () => void;
}

const FormStatus: React.FC<FormStatusProps> = ({
  response,
  onEdit,
  onBack,
}) => {
  const isError = response.code > 299;
  return (
    <Box className="flex flex-col gap-5 items-center p-4 border border-gray-200 rounded-md shadow-md">
      {isError ? (
        <MdError color="red" size={40} />
      ) : (
        <MdCheckCircle color="green" size={40} />
      )}
      <Typography variant="body1">
        {response?.error && response?.error.message
          ? response.error.message
          : response.message}
      </Typography>
      <Box className="flex justify-between gap-4 w-full">
        {response.code > 201 ? (
          <PrimaryButton
            isDisabled={false}
            onClick={onEdit}
            text="Modifier"
            variant="outlined"
            width="100%"
          />
        ) : (
          ""
        )}
        <PrimaryButton
          isDisabled={false}
          onClick={onBack}
          text="Retour"
          variant="contained"
          width="100%"
        />
      </Box>
    </Box>
  );
};

export default FormStatus;
