import { CircularProgress, Modal, Stack } from "@mui/material";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RequestHandler } from "@/src/app/utils/api";
import { CurrentFormStore } from "@/store/form/currentForm";
import { useStore } from "zustand";
import { InputDynamic } from "../bigs/inputDynamic";
import { HeadProprety } from "@/types/form/currentForm";
import { MethodType } from "@/types/dataActions.type";

const RecipeType = ({
  isActive,
  setStatus,
  title,
}: {
  isActive: boolean;
  setStatus: () => void;
  title: string;
}) => {
  return (
    <Box
      onClick={() => setStatus()}
      className={
        "p-3 border rounded-lg cursor-pointer hover:scale-x-[102%] flex gap-2.5 items-center " +
        (isActive ? "bg-primary text-white" : "bg-white hover:bg-[#f9f9f9]")
      }
    >
      {" "}
      {isActive ? <IoIosCheckmarkCircle /> : ""}
      {title}{" "}
    </Box>
  );
};

const DefineRecipeLevel = ({
  recipeType,
  setRecipeType,
}: {
  recipeType: string | null;
  setRecipeType: (type: string) => void;
}) => {
  return (
    <Box>
      <Stack direction="column" spacing={2}>
        <RecipeType
          isActive={recipeType == "BRANCH"}
          setStatus={() => setRecipeType("BRANCH")}
          title="Branche (non payable)"
        />
        <RecipeType
          isActive={recipeType == "RECIPE"}
          setStatus={() => setRecipeType("RECIPE")}
          title="recette (payable)"
        />
      </Stack>
    </Box>
  );
};

export default function VerticalLinearStepper({
  item,
  recipeId,
}: {
  item: any;
  recipeId: string | null;
}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [recipeType, setRecipeType] = React.useState<string | null>(null);
  const { setCurrentFormData, currentForm } = useStore(CurrentFormStore);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [enableNextButon, setEnableNextButon] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<{ [key: string]: any }>({});
  const [recapeData, setRecapData] = React.useState<{
    code: number;
    message: string;
  } | null>(null);

  const handleNext = async () => {
    setIsLoading(true);
    if (activeStep == 0) {
      if (recipeType == null) {
        setIsLoading(false);
      }
      const headStatus = await hadleHeadsFetch();
      if (headStatus) {
        setEnableNextButon(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIsLoading(false);
      }
      setIsLoading(false);
    } else if (activeStep == 1) {
      setIsLoading(true);
      const postStatus = await pushData();
      if (postStatus) {
        setEnableNextButon(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setIsLoading(false);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const hadleHeadsFetch = async () => {
    const requestHandler = new RequestHandler();
    setIsLoading(true);

    const response = await requestHandler.get({
      method: "GET",
      path: `/recipe/${recipeType == "BRANCH" ? "branch" : "asset"}/head`,
    });
    if (response.code === 200) {
      setCurrentFormData({
        headPath: `recipe/${recipeType == "BRANCH" ? "branch" : "asset"}/head`,
        submitPath: "/core/recipe",
        inputs: response.data,
        title: "Création d'une branche des recette",
        hasChildrens: false,
      });
      response.data.map((head: HeadProprety) => {
        setForm((prev) => ({ ...prev, [head.proprety]: null }));
        if (item) {
          setForm((prev) => ({ ...prev, entityId: item.parentEntityId }));
          setForm((prev) => ({ ...prev, sectorId: item.id }));
        }
      });
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const pushData = async () => {
    const requestHandler = new RequestHandler();
    setIsLoading(true);
    let response = null;
    if (recipeId !== null && recipeId.length > 0) {
      response = await requestHandler.update({
        method: "POST",
        path: `/recipe/add-child/${recipeId}/${
          recipeType == "BRANCH" ? "branch" : "asset"
        }`,
        body: form,
        setErrorMessage: (str) => setRecapData({ code: 400, message: str }),
      });
    } else {
      response = await requestHandler.post({
        method: "POST",
        path: `/recipe/${recipeType == "BRANCH" ? "branch" : "asset"}`,
        body: form,
        setErrorMessage: (str) => setRecapData({ code: 400, message: str }),
      });
    }
    if (response.code === 201) {
      setRecapData({
        code: response.code,
        message: response.message || "création effectué avec succès",
      });
      return true;
    }
    setRecapData({
      code: response.code,
      message: response.message || "création effectué avec succès",
    });
    setIsLoading(false);
    return false;
  };

  const steps = [
    {
      label: "Que voulez-vous créer ?",
      children: (
        <DefineRecipeLevel
          {...{
            recipeType,
            setRecipeType: (str) => {
              setRecipeType(str);
              setEnableNextButon(true);
            },
          }}
        />
      ),
    },
    {
      label: "Formulaire",
      children: (
        <Box className="w-full flex flex-col gap-2.5">
          {recipeType == "BRANCH" ? "une branche" : "une recette non payable"}
          {currentForm?.inputs.map((input, index) => {
            if (["entityId", "sectorId"].includes(input.proprety)) return false;
            return (
              <InputDynamic
                key={`form-${index}-${input.proprety}`}
                headProprety={{ ...input }}
                inputProps={{
                  label: input.verbose,
                  value: form[input.proprety] || "",
                  placeholder: input.proprety,
                  setValue: (value) =>
                    setForm((prev) => ({ ...prev, [input.proprety]: value })),
                  fields: input.fields,
                  modelPath: input.modelPath,
                  constraints: input.constraints,
                  disabled: ["entityId", "sectorId"].includes(input.proprety),
                }}
              />
            );
          })}
        </Box>
      ),
    },
    {
      label: "status",
      children: (
        <Box>
          <Box> {recapeData?.code} </Box>
          <Box> {recapeData?.message} </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">recap</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.children}
              <Box sx={{ mb: 2, width: "100%" }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!enableNextButon}
                  sx={{ mt: 1, mr: 1 }}
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {index === steps.length - 1 ? "Finir" : "Suivant"}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  retour
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}

export const CreateFromActivitySector = ({
  isOpen,
  onClose,
  item,
  recipeId,
}: {
  isOpen: boolean;
  onClose: (state: boolean) => void;
  item: any;
  recipeId: string | null;
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="flex justify-center items-center"
    >
      <Box className="m-auto bg-white w-1/2 h-3/4 p-5 overflow-y-auto">
        <div> {String(item)} </div>
        <VerticalLinearStepper recipeId={recipeId} item={item} />
      </Box>
    </Modal>
  );
};
