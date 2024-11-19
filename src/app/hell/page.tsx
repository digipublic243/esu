"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import { RequestHandler } from "@/src/utils/api";
import { InputDynamic } from "@/src/components/form/bigs/inputDynamic";
import { HeadProprety } from "@/src/types/form/currentForm";

const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Remerciement" },
];

export default function FormTimelineModal() {
  const [activeStep, setActiveStep] = useState(0);
  const [digiForm, setDigiForm] = useState([]);
  const [stepForms, setStepsForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [formDatas, setFormDatas] = useState<{ [key: string]: any }>({});
  const [personId, setPersonId] = useState(null);
  const requestHandler = new RequestHandler();

  const handleNextStep = async () => {
    try {
      if (activeStep === 0) {
        const responseFetch = await requestHandler.get({
          method: "GET",
          path: "/id-bio/person/head",
        });

        if (!responseFetch || !responseFetch.data) {
          alert(
            "Impossible de récupérer les données pour le Step 1. Veuillez réessayer."
          );
          return;
        }

        setDigiForm(responseFetch.data);

        // const responsePost = await requestHandler.post({
        //   method: "POST",
        //   path: "/id-bio/person",
        //   body: formData,
        // });

        console.log("Données envoyées à l'étape 1 :", formData);

        const responseFetchStep2 = await requestHandler.get({
          method: "GET",
          path: "/id-bio/student/head",
        });

        // if (!responseFetchStep2 || !responseFetchStep2.data) {
        //   alert(
        //     "Impossible de récupérer les données pour le Step 2. Veuillez réessayer."
        //   );
        //   return;
        // }

        setStepsForms(responseFetchStep2.data);
        console.log(responseFetchStep2.data);

        setActiveStep(activeStep + 1);
      } else if (activeStep === 1) {
        // const responsePostStep2 = await requestHandler.post({
        //   method: "POST",
        //   path: "/id-bio/student",
        //   body: formDatas,
        // });

        // if (responsePostStep2.code === "201") {
        //   alert("Une erreur est survenue à l'étape 2. Veuillez réessayer.");
        // } else {
        console.log("Données envoyées à l'étape 2 :", formDatas);

        setActiveStep(activeStep + 1);
      }
      // }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await requestHandler.get({
          method: "GET",
          path: "/id-bio/person/head",
        });
        if (!response || !response.data) {
          throw new Error("Erreur lors du chargement des données.");
        }
        setDigiForm(response.data);
      } catch (error) {
        console.log("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchStepData = async () => {
  //     if (activeStep === 1) {
  //       setLoading(true);
  //       try {
  //         const response = await requestHandler.get({
  //           method: "GET",
  //           path: "/id-bio/student/head",
  //         });
  //         if (!response || !response.data) {
  //           throw new Error(
  //             "Erreur lors du chargement des données pour le step 2."
  //           );
  //         }
  //         setStepsForms(response.data);
  //         console.log(response.data);
  //       } catch (error) {
  //         console.error("Erreur lors du chargement du step 2:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchStepData();
  // }, [activeStep]);

  useEffect(() => {
    setFormDatas((prev) => ({
      ...prev,
      personId: personId,
      personTypeId: "Etudiant",
    }));
  }, [personId]);

  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {activeStep === index && (
                <div>
                  {index === 0 && (
                    <Box sx={{ mt: 2 }}>
                      {loading ? (
                        <p>Chargement ...</p>
                      ) : (
                        <Box
                          sx={{
                            maxHeight: "400px",
                            overflowY: "auto",
                            padding: "8px",
                            border: "1px solid #ccc",
                          }}
                        >
                          {digiForm.map((input: HeadProprety, idx) => (
                            <InputDynamic
                              headProprety={input}
                              setError={(message) =>
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  [input.proprety]: message,
                                }))
                              }
                              inputProps={{
                                label: input.verbose,
                                value: formData[input.proprety] || "",
                                placeholder: input.proprety,
                                setValue: (value) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    [input.proprety]: value,
                                  })),
                                fields: input.fields,
                                modelPath: input.modelPath,
                                constraints: input.constraints,
                                error: errors[input.proprety],
                              }}
                              key={`${input.proprety}-${idx}`}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}

                  {index === 1 && (
                    <Box sx={{ mt: 2 }}>
                      {loading ? (
                        <p>Chargement ...</p>
                      ) : (
                        <Box
                          sx={{
                            maxHeight: "400px",
                            overflowY: "auto",
                            padding: "8px",
                            border: "1px solid #ccc",
                          }}
                        >
                          {stepForms.map((input: HeadProprety, idx) => (
                            <InputDynamic
                              headProprety={input}
                              setError={(message) =>
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  [input.proprety]: message,
                                }))
                              }
                              inputProps={{
                                label: input.verbose,
                                value: formDatas[input.proprety] || "",
                                placeholder: input.proprety,
                                setValue: (value) =>
                                  input.proprety === "personId" ||
                                  input.proprety === "personTypeId"
                                    ? null
                                    : setFormDatas((prev) => ({
                                        ...prev,
                                        [input.proprety]: value,
                                      })),
                                fields: input.fields,
                                modelPath: input.modelPath,
                                constraints: input.constraints,
                                error: errors[input.proprety],
                                readOnly:
                                  input.proprety === "personId" ||
                                  input.proprety === "personTypeId",
                              }}
                              key={`${input.proprety}-${idx}`}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  )}

                  <Box sx={{ mb: 2 }}>
                    {activeStep > 0 && (
                      <Button
                        onClick={handlePrevStep}
                        variant="outlined"
                        sx={{ mr: 1, marginTop: "20px" }}
                      >
                        Retour
                      </Button>
                    )}
                    {activeStep < steps.length - 1 ? (
                      <Button
                        onClick={handleNextStep}
                        variant="contained"
                        sx={{ mr: 1, marginTop: "20px" }}
                      >
                        Suivant
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ mr: 1, marginTop: "20px" }}
                      >
                        Valider
                      </Button>
                    )}
                  </Box>
                </div>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
