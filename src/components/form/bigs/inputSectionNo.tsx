import { PrimaryButton } from "@/src/components/form/asset/button";
import { InputDynamic } from "@/src/components/form/bigs/inputDynamic";
import { CurrentFormStore } from "@/src/store/form/currentForm";
import { useStore } from "zustand";
import { Box, Typography } from "@mui/material";
import { useState, useCallback, useRef } from "react";

interface FormNode {
  id: number;
  parentId: number | null;
  children: FormNode[];
  formData: { [key: string]: string };
}

interface InputSectionProps {
  errors: { [key: string]: string };
  formState: { [key: string]: any };
  setFormState: (data: { [key: string]: any }) => void;
  pushFormData: (data: { [key: string]: any }) => Promise<void>;
  setIsLoading: (data: boolean) => void;
  setErrors: (data: { [key: string]: string }) => void;
  setIsSubmitted: (data: boolean) => void;
  hideSubmitButton?: boolean;
}

const InputSectionNo = ({
  errors,
  formState,
  setFormState,
  pushFormData,
  setIsLoading,
  setErrors,
  setIsSubmitted,
  hideSubmitButton = false,
}: InputSectionProps) => {
  const formIdRef = useRef(0);
  const generateId = () => ++formIdRef.current;

  const { currentForm } = useStore(CurrentFormStore);
  const [forms, setForms] = useState<FormNode[]>([
    {
      id: generateId(),
      parentId: null,
      children: [],
      formData: {},
    },
  ]);

  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );

  const updateFormData = useCallback(
    (formId: number, key: string, value: string) => {
      setForms((prevForms) => {
        const updateData = (formsList: FormNode[]): FormNode[] => {
          return formsList.map((form) => {
            if (form.id === formId) {
              return {
                ...form,
                formData: { ...form.formData, [key]: value },
              };
            } else {
              return { ...form, children: updateData(form.children) };
            }
          });
        };
        return updateData(prevForms);
      });
    },
    []
  );

  const getErrorsForForm = useCallback(
    (formId: number) => {
      const formErrors: { [key: string]: string } = {};
      Object.keys(errors).forEach((key) => {
        if (errors[key].includes(`formId_${formId}`)) {
          formErrors[key] = errors[key];
        }
      });
      return formErrors;
    },
    [errors]
  );

  const validateForms = () => {
    const formErrors: { [key: number]: { [key: string]: string } } = {};

    forms.forEach((form) => {
      const errors: { [key: string]: string } = {};

      currentForm?.inputs.forEach(
        (input: {
          proprety: string | number;
          constraints: any;
          verbose: any;
        }) => {
          if (!form.formData[input.proprety] && input.constraints) {
            errors[input.proprety] = `${input.verbose} est requis.`;
          }
        }
      );

      if (Object.keys(errors).length > 0) {
        formErrors[form.id] = errors;
      }
    });

    console.log("Validation Errors:", formErrors); // Ajout d'un log pour vérifier les erreurs
    return formErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForms();

    if (Object.keys(validationErrors).length > 0) {
      setSubmissionMessage("Veuillez corriger les erreurs avant de soumettre.");
      return;
    } else {
      pushFormData(forms[0].formData);
    }
  };

  const renderForms = useCallback(
    (formNodes: FormNode[]) => {
      return formNodes.map((form) => (
        <Box key={form.id} className="w-full md:mb-0 flex flex-col gap-2">
          {currentForm?.inputs.map((input) => {
            const formErrors = getErrorsForForm(form.id);
            const errorMessage = formErrors[input.proprety];

            return (
              <Box
                key={`${form.id}-${input.proprety}`}
                className="w-full md:mb-0"
              >
                <InputDynamic
                  headProprety={input}
                  inputProps={{
                    label: input.verbose,
                    // : `form-${form.id}-${input.proprety}`,
                    value: form.formData[input.proprety] || "",
                    placeholder: input.proprety,
                    setValue: (value) =>
                      updateFormData(form.id, input.proprety, value.toString()),
                    fields: input.fields,
                    modelPath: input.modelPath,
                    constraints: input.constraints,
                  }}
                />
                {errorMessage && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ fontWeight: 600, marginTop: 1 }}
                  >
                    {errorMessage}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      ));
    },
    [currentForm?.inputs, updateFormData, getErrorsForForm]
  );

  return (
    <>
      <Box flexWrap="wrap" gap={4} paddingY={4}>
        {renderForms(forms)}
      </Box>

      <Box className="flex justify-center mt-6">
        <PrimaryButton
          type="submit"
          isDisabled={false}
          text="Soumettre"
          className="w-4 py-3 text-white"
          onClick={handleSubmit}
        />
      </Box>

      {submissionMessage && (
        <Typography
          variant="body2"
          color="success.main"
          sx={{ textAlign: "center", marginTop: 2 }}
        >
          {submissionMessage}
        </Typography>
      )}
    </>
  );
};

export default InputSectionNo;
