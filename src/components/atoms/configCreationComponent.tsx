import { useEffect, useState } from "react";
import ConfigDataTableSkeleton from "./configDataTableSkeleton";
import { RequestHandler } from "@/src/utils/api";
import { DataActionsType } from "@/src/types/dataActions.type";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeadProprety } from "@/src/types/form/currentForm";
import { InputDynamic } from "../form/bigs/inputDynamic";
import Box from "@mui/material/Box";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import ResultSuccess from "./resultSuccess";
import ResultError from "./resultError";
import ResultWarning from "./resultWarning";

const EAddingDataSteps = {
  DEFAULT: "default",
  SECOND_SCREEN_WARNING: "second_screen_warning",
  THIRD_SCREEN_API_ERROR: "third_screen_api_error",
  FOURTH_SCREEN_API_SUCCESS: "fourth_screen_api_success",
};

interface CreationProps {
  actionData: DataActionsType | null;
  actionType: "post" | "patch";
  exitingProcess: () => void;
}

const ConfigCreationComponent = ({
  actionData,
  actionType,
  exitingProcess,
}: CreationProps) => {
  const [activityIsRunning, setActivityIsRunning] = useState(true);

  const [currentEAddingDataSteps, setCurrentEAddingDataSteps] = useState(
    EAddingDataSteps.DEFAULT
  );
  const [addingDataApiResultInfo, setAddingDataApiResultInfo] = useState<{
    title: string;
    subtitle: string;
  }>({
    title: "Title",
    subtitle: "Details content",
  });

  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [currentFormData, setPersonFormData] = useState<HeadProprety[]>([]);

  const onValidatingProcessData = () => {
    // Validation logic goes here
    console.log("Validate operation");
  };

  const backToFirstScreen = () =>
    setCurrentEAddingDataSteps(EAddingDataSteps.DEFAULT);

  const handleCloseProcessModal = () => {
    exitingProcess();
    setCurrentEAddingDataSteps(EAddingDataSteps.DEFAULT);
  };

  // FX
  const fetchData = async (url: string) => {
    try {
      setActivityIsRunning(true);
      const requestHandler = new RequestHandler();
      const response = await requestHandler.get({
        method: "GET",
        path: `/${url}`,
      });
      setActivityIsRunning(false);
      console.log("\n\nresp head :: ", response, "\n\n\n");
      if (response.code != 200) return;
      if (Array.isArray(response.data)) {
        const inputs: HeadProprety[] = response.data;
        inputs.forEach((input) => {
          setFormData((prev) => ({ ...prev, [input.proprety]: null }));
          return true;
        });
        setPersonFormData(inputs);
      } else {
        // setTotal(0);
        // setDataTableList([]);
      }

      // const data = await api.path.getAll();
      // setPaths(data);
    } catch (error) {
      setActivityIsRunning(false);
      console.error("Error fetching head:", error);
    }
  };

  useEffect(() => {
    if (actionData) {
      fetchData(
        actionType == "post"
          ? actionData.getPostHead.url
          : actionData.getPatchHead.url
      );
    }
  }, [actionData, actionType]);

  return (
    <ConfigDataTableSkeleton isLoading={activityIsRunning}>
      <div className="flex flex-col h-[80vh] overflow-y-auto ">
        {(() => {
          switch (currentEAddingDataSteps) {
            case EAddingDataSteps.SECOND_SCREEN_WARNING:
              return (
                <div className="flex justify-center">
                  <ResultWarning
                    subtitle={addingDataApiResultInfo.subtitle}
                    title={addingDataApiResultInfo.title}
                    backProcessEvent={backToFirstScreen}
                    backBtnText="Retour"
                  />
                </div>
              );

            case EAddingDataSteps.THIRD_SCREEN_API_ERROR:
              return (
                <div className="flex flex-row justify-center">
                  <ResultError
                    subtitle={addingDataApiResultInfo.subtitle}
                    title={addingDataApiResultInfo.title}
                    backProcessEvent={backToFirstScreen}
                    exitProcessEvent={handleCloseProcessModal}
                  />
                </div>
              );

            case EAddingDataSteps.FOURTH_SCREEN_API_SUCCESS:
              return (
                <div className="flex flex-row justify-center">
                  <ResultSuccess
                    subtitle={addingDataApiResultInfo.subtitle}
                    title={addingDataApiResultInfo.title}
                    exitProcessEvent={handleCloseProcessModal}
                    closeBtnText="Fermer"
                  />
                </div>
              );

            default:
              return (
                <form
                  autoComplete="off"
                  noValidate
                  className="w-full px-3 lg:px-0 mx-auto xborder"
                >
                  <div className="grid grid-cols-1 mx-1 my-1 py-2 border-b">
                    {/* Form fields go here */}
                    {currentFormData.map((input) => (
                      <Box
                        key={`-${input.proprety}`}
                        style={{
                          width: input.type == "webCam" ? "100%" : "100%",
                        }}
                        className="w-full md:mb-0"
                      >
                        <InputDynamic
                          headProprety={input}
                          inputProps={{
                            label: input.verbose,
                            // : `form-${form.id}-${input.proprety}`,
                            value:
                              (formData !== null && formData[input.proprety]) ||
                              "",
                            placeholder: input.proprety,
                            setValue: (value: any) =>
                              setFormData((prev) => ({
                                ...prev,
                                [input.proprety]: value,
                              })),
                            fields: input.fields,
                            modelPath: input.modelPath,
                            constraints: input.constraints,
                          }}
                        />
                      </Box>
                    ))}
                    {/* Form fields go here */}
                  </div>
                  <div className="flex w-full">
                    <Button
                      // variant="contained"
                      // disabled={!isFormValid || loading}
                      // startIcon={
                      //   loading ? (
                      //     <CircularProgress size={20} color="inherit" />
                      //   ) : null
                      // }
                      type="button"
                      disabled={activityIsRunning}
                      onClick={async () => {
                        // setFormValidation(null);
                        let isFormValid = true;
                        for (const key in formData) {
                          if (formData[key] == null) isFormValid = false;
                        }
                        if (isFormValid) {
                          setActivityIsRunning(true);
                          const requestHandler = new RequestHandler();
                          const response = await requestHandler.post({
                            body: {
                              ...formData,
                              // photoUrl: image["data"]["url"],
                            },
                            path:
                              actionType == "post"
                                ? `/${actionData?.post.url}`
                                : `/${actionData?.patch.url}`,
                            method: actionType == "post" ? "POST" : "PATCH",
                          });
                          console.log(
                            "\n\n\n submit response :: ",
                            response,
                            "\n\n\n"
                          );
                          setActivityIsRunning(false);
                          if (response == false) {
                            setAddingDataApiResultInfo({
                              title: "Echec !",
                              subtitle:
                                "Une erreur s'est produite lors de l'envoie des donnée. Veuillez réessayer",
                            });
                            setCurrentEAddingDataSteps(
                              EAddingDataSteps.THIRD_SCREEN_API_ERROR
                            );
                          } else {
                            setAddingDataApiResultInfo({
                              title: "Success !",
                              subtitle: response.message || "Opération réussie",
                            });
                            setCurrentEAddingDataSteps(
                              EAddingDataSteps.FOURTH_SCREEN_API_SUCCESS
                            );
                          }
                          setFormData({});
                        } else {
                          // setFormValidation("veuillez remplir tous les champs");
                          toast("Formulaire invalide", {
                            description: "Veuillez remplir tous les champs",
                            action: {
                              label: "Fermer",
                              onClick: () => console.log("Fermer"),
                            },
                            actionButtonStyle: {
                              color: "white",
                              background: "red",
                            },
                            style: { color: "red" },
                          });
                        }
                      }}
                    >
                      {activityIsRunning && (
                        <Loader2 className="animate-spin" />
                      )}
                      Soumettre
                    </Button>
                  </div>
                </form>
              );
          }
        })()}
      </div>
    </ConfigDataTableSkeleton>
  );
};

export default ConfigCreationComponent;
