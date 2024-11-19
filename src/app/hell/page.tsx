"use client";
import React, { useState, useEffect } from "react";
import { RequestHandler } from "@/src/utils/api";
import { InputDynamic } from "@/src/components/form/bigs/inputDynamic";
import { HeadProprety } from "@/src/types/form/currentForm";

const steps = [
  { label: "Indentification" },
  { label: "Documents" },
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
        const responseFetchStep2 = await requestHandler.get({
          method: "GET",
          path: "/id-bio/student/head",
        });
        setStepsForms(responseFetchStep2.data);
        setActiveStep(activeStep + 1);
      } else if (activeStep === 1) {
        console.log("Données envoyées à l'étape 2 :", formDatas);
        setActiveStep(activeStep + 1);
      }
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

  useEffect(() => {
    setFormDatas((prev) => ({
      ...prev,
      personId: personId,
      personTypeId: "Etudiant",
    }));
  }, [personId]);

  return (
    <div className="bg-gray-100 pt-[3%] h-[100%] pb-[10%] ">
      <div className="w-[50%] max-w-[70%] mx-auto bg-white shadow-md rounded-lg p-4 ">
        <div>
          {steps.map((step, index) => (
            <div key={index} className="mb-8">
              <div
                className={`flex items-center ${
                  index <= activeStep ? "text-primary" : "text-gray-400"
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 border-2 border-current rounded-full">
                  {index + 1}
                </div>
                <span className="ml-4 text-lg font-semibold">{step.label}</span>
              </div>
              {activeStep === index && (
                <div className="mt-4">
                  {index === 0 && (
                    <div>
                      {loading ? (
                        <p className="text-center text-gray-500">
                          Chargement...
                        </p>
                      ) : (
                        <div className="max-h-[30%] overflow-y-auto border p-4 rounded-lg space-y-4">
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
                        </div>
                      )}
                    </div>
                  )}
                  {index === 1 && (
                    <div>
                      {loading ? (
                        <p className="text-center text-gray-500">
                          Chargement...
                        </p>
                      ) : (
                        <div className="max-h-[30%] overflow-y-auto border p-4 rounded-lg space-y-4">
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
                                  setFormDatas((prev) => ({
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
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between mt-4">
                    {activeStep > 0 && (
                      <button
                        onClick={handlePrevStep}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Retour
                      </button>
                    )}
                    <button
                      onClick={
                        activeStep < steps.length - 1
                          ? handleNextStep
                          : () => alert("Formulaire terminé")
                      }
                      className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primaryHover"
                    >
                      {activeStep < steps.length - 1 ? "Suivant" : "Valider"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
