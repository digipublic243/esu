"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import Sidebar from "@/src/components/bigs/sideBar";
import HeaderSingIn from "@/src/components/bigs/headerSingIn";

const steps = ["Entrez votre matricule", "Demande soumise avec succès"];

const DiplomaRequestForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [matricule, setMatricule] = useState<string>("");

  const handleNext = () => {
    if (activeStep === 0 && matricule) {
      setActiveStep(1);
    }
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const handleMatriculeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatricule(e.target.value);
  };

  const renderFormStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Entrez votre matricule
              </Typography>
              <TextField
                fullWidth
                label="Matricule"
                value={matricule}
                onChange={handleMatriculeChange}
                required
              />
            </Box>{" "}
            <Box>
              <Typography variant="h6" gutterBottom>
                Entrez votre année academique
              </Typography>
              <TextField
                fullWidth
                label="Matricule"
                value={matricule}
                onChange={handleMatriculeChange}
                required
              />
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Demande soumise avec succès
            </Typography>
            <Typography>
              Votre demande de diplôme a été soumise avec succès. Vous serez
              contacté pour la suite de la procédure.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <HeaderSingIn />
      <Box display="flex" height="100vh">
        <Sidebar admissionComplete={false} />
        <Box flexGrow={1} p={4} bgcolor="#f5f5f5">
          <Box
            maxWidth="600px"
            mx="auto"
            p={4}
            bgcolor="white"
            borderRadius="8px"
            boxShadow="sm"
          >
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box mt={4}>{renderFormStep()}</Box>

            <Box display="flex" justifyContent="space-between" mt={4}>
              {activeStep === 0 && (
                <Button
                  variant="contained"
                  className="bg-primary hover:bg-primaryHover"
                  onClick={handleNext}
                  disabled={!matricule}
                >
                  Suivant
                </Button>
              )}

              {activeStep === 1 && (
                <Button
                  variant="contained"
                  className="bg-primary hover:bg-primaryHover"
                  onClick={handleBack}
                >
                  Retour
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DiplomaRequestForm;
