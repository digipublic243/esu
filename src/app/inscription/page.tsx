"use client";
import React, { useState, useEffect } from "react";
import { RequestHandler } from "@/src/utils/api";
import { InputDynamic } from "@/src/components/form/bigs/inputDynamic";
import { HeadProprety } from "@/src/types/form/currentForm";
import { Box } from "lucide-react";

const steps = [
  { label: "Identification" },
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

        const responsePost = await requestHandler.post({
          method: "POST",
          path: "/id-bio/person",
          body: formData,
        });

        if (responsePost.code !== "201") {
          alert("Une erreur est survenue à l'étape 1. Veuillez réessayer.");
          console.log(responsePost);
          console.log(responsePost.message);
        } else {
          console.log("Données envoyées à l'étape 1 :", formData);
          console.log(responsePost);
          setPersonId(responsePost.data.id);

          const responseFetchStep2 = await requestHandler.get({
            method: "GET",
            path: "/id-bio/student/head",
          });

          if (!responseFetchStep2 || !responseFetchStep2.data) {
            alert(
              "Impossible de récupérer les données pour le Step 2. Veuillez réessayer."
            );
            return;
          }

          setStepsForms(responseFetchStep2.data);
          console.log(responseFetchStep2.data);

          setActiveStep(activeStep + 1);
        }
      } else if (activeStep === 1) {
        const responsePostStep2 = await requestHandler.post({
          method: "POST",
          path: "/id-bio/student",
          body: formDatas,
        });

        if (responsePostStep2.code !== "201") {
          alert("Une erreur est survenue à l'étape 2. Veuillez réessayer.");
        } else {
          console.log("Données envoyées à l'étape 2 :", formDatas);
          console.log(responsePostStep2);

          setActiveStep(activeStep + 1);
        }
      } else if (activeStep === 2) {
        // Step 3 : Affichage du message final
        console.log("Formulaire terminé :", formData);
        alert("Votre inscription est terminée !");
        setFormData({});
        setFormDatas({});
        setActiveStep(activeStep - 2);
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
    <div className="bg-gray-100 pt-[3%] h-[100%] pb-[10%]">
      <div className="w-[50%] max-w-[70%] mx-auto bg-white shadow-md rounded-lg p-5">
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
                        <div className="max-h-[30%] border p-4 rounded-lg space-y-4 w-[100%] ">
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
                      <div className="max-h-[30%] overflow-y-auto border p-4 rounded-lg space-y-4">
                        {loading ? (
                          <p>Chargement ...</p>
                        ) : (
                          <div className="max-h-[400px] overflow-y-auto p-2 border border-gray-300">
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
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Merci pour votre inscription, {formData.firstName}{" "}
                        {formData.middleName || ""} {formData.lastName} !
                      </h3>
                      <p className="text-gray-600">
                        Un email contenant votre nom d'utilisateur et un mot de
                        passe par défaut sera envoyé à{" "}
                        <strong>{formData.currentEmailAddress}</strong>.
                      </p>
                      <p className="text-gray-600 mt-2">
                        Merci de vérifier votre boîte de réception.
                      </p>
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
                      onClick={handleNextStep}
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
