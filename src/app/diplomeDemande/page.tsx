"use client";
import Header from "@/src/components/bigs/header";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const steps = [
  "Entrez votre matricule",
  "Demande soumise avec succès",
  "Dernière étape",
];

const provinces = [
  "Bas-Uele",
  "Haut-Uele",
  "Ituri",
  "Tshopo",
  "Haut-Lomami",
  "Lomami",
  "Kasaï",
  "Kasaï-Central",
  "Kasaï-Oriental",
  "Kinshasa",
  "Kongo-Central",
  "Kwango",
  "Kwilu",
  "Mai-Ndombe",
  "Maniema",
  "Mongala",
  "Nord-Kivu",
  "Nord-Ubangi",
  "Sankuru",
  "Sud-Kivu",
  "Sud-Ubangi",
  "Tanganyika",
  "Tshuapa",
  "Haut-Katanga",
  "Lualaba",
];
function DiplomeDemande() {
  const [activeStep, setActiveStep] = useState(0);
  const [departement, setDepartement] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [year, setYear] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [territory, setTerritory] = useState("");
  const [address, setAddress] = useState("");
  const [university, setUniversity] = useState("");
  const [person, setPerson] = useState("");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  const resetForm = () => {
    setDepartement("");
    setSection("");
    setYear("");
    setProvince("");
    setCity("");
    setTerritory("");
    setAddress("");
    setUniversity("");
    setPerson("");
    setActiveStep(0);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    console.log("Formulaire soumis avec succès !");
    resetForm();
  };

  const renderFormStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Box>
              <Typography gutterBottom>
                Nom de l&apos;université ou institut
              </Typography>
              <TextField
                fullWidth
                label="Nom de l'université ou institut"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                required
              />

              <Typography gutterBottom>Departement</Typography>
              <TextField
                fullWidth
                label="Departement"
                onChange={(e) => setDepartement(e.target.value)}
                value={departement}
                required
              />

              <Typography gutterBottom>Faculté ou section</Typography>
              <TextField
                fullWidth
                label="Faculté ou section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
              />
            </Box>

            <Typography gutterBottom>
              Année d&apos;obtention de diplome
            </Typography>
            <FormControl className="w-[90px] ">
              <Select
                labelId="year-select-label"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {years.map((yr) => (
                  <MenuItem key={yr} value={yr}>
                    {yr}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography gutterBottom>Province</Typography>
            <FormControl fullWidth>
              <InputLabel id="province-select-label">
                Choisir la province
              </InputLabel>
              <Select
                labelId="province-select-label"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
              >
                {provinces.map((prov) => (
                  <MenuItem key={prov} value={prov}>
                    {prov}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography gutterBottom>Ville</Typography>
            <TextField
              fullWidth
              label="Nom de la ville"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <Typography gutterBottom>Commune ou Territoire</Typography>
            <TextField
              fullWidth
              label="Nom de la commune ou territoire"
              value={territory}
              onChange={(e) => setTerritory(e.target.value)}
              required
            />
            <Typography gutterBottom>Adresse complète</Typography>
            <TextField
              fullWidth
              label="Adresse complète"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <Typography gutterBottom>Personne de référence</Typography>
            <TextField
              fullWidth
              label="Personne de référence"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              required
            />
          </Box>
        );
      case 2:
        return (
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom>
              🎉 Félicitations !
            </Typography>
            <Typography gutterBottom>
              Votre demande de diplôme a bien été soumise et est en cours de
              traitement.
            </Typography>
            <Typography color="textSecondary">
              Vous recevrez un email de confirmation dès que votre demande aura
              été finalisée.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <Header />
      <div className="bg-gray-200 h-[89vh] ">
        {" "}
        <Box>
          <Box display="flex" height="100vh">
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
                  {steps.map((label) => (
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
                    className="text-primary"
                    variant="outlined"
                  >
                    Retour
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      className="bg-primary hover:bg-primaryHover"
                      onClick={handleFinish} // Appel de la fonction handleFinish
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
      </div>
    </div>
  );
}

export default DiplomeDemande;
