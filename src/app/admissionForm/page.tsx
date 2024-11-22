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
  MenuItem,
  TextField,
} from "@mui/material";
import Sidebar from "@/src/components/bigs/sideBar";
import HeaderSingIn from "@/src/components/bigs/headerSingIn";

const steps = [
  "Choisissez un programme",
  "Soumettez vos documents",
  "Récapitulatif",
];

const filieres = [
  "Informatique",
  "Médecine",
  "Droit",
  "Gestion",
  "Sciences Politiques",
  "Génie Civil",
  "Électronique",
  "Biologie",
  "Chimie",
  "Mathématiques",
  "Physique",
  "Littérature",
  "Architecture",
];

type FormData = {
  universite: string;
  filiere: string;
  promotion: string;
  documents: Record<string, File | null>;
};

const AdmissionForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    universite: "",
    filiere: "",
    promotion: "",
    documents: {
      bulettin: null,
      attestationReussite: null,
      attestationNaissance: null,
      certificatBonneVie: null,
      releveNotes: null,
    },
  });

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      universite: "",
      filiere: "",
      promotion: "",
      documents: {
        bulettin: null,
        attestationReussite: null,
        attestationNaissance: null,
        certificatBonneVie: null,
        releveNotes: null,
      },
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file,
      },
    }));
  };
  const getRandomFilieres = (count: number | undefined) => {
    const shuffled = [...filieres].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const renderFormStep = () => {
    switch (activeStep) {
      case 0:
        const randomFilieres = getRandomFilieres(5);
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choisissez un programme
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                select
                label="Université"
                value={formData.universite}
                onChange={(e) =>
                  handleInputChange("universite", e.target.value)
                }
              >
                <MenuItem value="Université 1">Université 1</MenuItem>
                <MenuItem value="Université 2">Université 2</MenuItem>
              </TextField>
              <TextField
                select
                label="Filière"
                value={formData.filiere}
                onChange={(e) => handleInputChange("filiere", e.target.value)}
              >
                {randomFilieres.map((filiere) => (
                  <MenuItem key={filiere} value={filiere}>
                    {filiere}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Promotion"
                value={formData.promotion}
                onChange={(e) => handleInputChange("promotion", e.target.value)}
              >
                {["L1LMD", "L2LMD", "L3LMD", "M1", "M2"].map((promotion) => (
                  <MenuItem key={promotion} value={promotion}>
                    {promotion}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Soumettez vos documents
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                type="file"
                label="Bulletin 6e & 5e"
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  handleFileUpload("bulettin", e.target.files[0])
                }
              />
              <TextField
                type="file"
                label="Attestation de Réussite"
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  handleFileUpload("attestationReussite", e.target.files[0])
                }
                helperText="Si vous n'en avez pas, vous pouvez en faire la demande sur DigiPublic."
              />
              <TextField
                type="file"
                label="Attestation de Naissance"
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  handleFileUpload("attestationNaissance", e.target.files[0])
                }
                helperText="Si vous n'en avez pas, vous pouvez en faire la demande sur DigiPublic."
              />
              <TextField
                type="file"
                label="Certificat de Bonne Vie et Mœurs"
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  handleFileUpload("certificatBonneVie", e.target.files[0])
                }
                helperText="Si vous n'en avez pas, vous pouvez en faire la demande sur DigiPublic."
              />
              {formData.promotion !== "L1LMD" && (
                <TextField
                  type="file"
                  label="Relevé de Notes"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) =>
                    handleFileUpload("releveNotes", e.target.files[0])
                  }
                />
              )}
            </Box>
          </Box>
        );
      default:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Récapitulatif
            </Typography>
            <Box>
              <Typography>Université: {formData.universite}</Typography>
              <Typography>Filière: {formData.filiere}</Typography>
              <Typography>Promotion: {formData.promotion}</Typography>
              <Typography>
                Documents soumis :
                <ul>
                  {Object.entries(formData.documents).map(([key, value]) => (
                    <li key={key}>
                      {key} : {value ? value.name : "Non soumis"}
                    </li>
                  ))}
                </ul>
              </Typography>
            </Box>
          </Box>
        );
    }
  };

  const [admissionComplete, setAdmissionComplete] = useState(false);

  return (
    <Box>
      <HeaderSingIn />
      <Box display="flex" height="100vh">
        <Sidebar admissionComplete={admissionComplete} />
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
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Retour
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  className="bg-primary hover:bg-primaryHover"
                  onClick={() => {
                    setAdmissionComplete(true);
                    handleReset();
                  }}
                >
                  Terminer
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="bg-primary hover:bg-primaryHover"
                  onClick={handleNext}
                >
                  Suivant
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdmissionForm;
