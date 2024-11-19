import React, {
  useState,
  useRef,
  useCallback,
  FormEvent,
  useMemo,
} from "react";
import { PrimaryButton } from "@/src/components/form/asset/button";
import { InputDynamic } from "@/src/components/form/bigs/inputDynamic";
import { CurrentFormStore } from "@/src/store/form/currentForm";
import { useStore } from "zustand";
import { useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

interface FormNode {
  id: number;
  parentId: number | null;
  children: FormNode[];
  formData: { [key: string]: string | number | boolean | any[] };
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

const InputSection: React.FC<InputSectionProps> = ({
  errors,
  formState,
  setFormState,
  pushFormData,
  setIsLoading,
  setErrors,
  setIsSubmitted,
  hideSubmitButton = false,
}) => {
  const formIdRef = useRef(0);
  const [forms, setForms] = useState<FormNode[]>([]);
  const generateId = useCallback(() => ++formIdRef.current, []);
  const { currentForm } = useStore(CurrentFormStore);

  useEffect(() => {
    if (currentForm) {
      const initialFormData = currentForm.inputs.reduce((acc, input) => {
        if (input.defaultValue !== undefined) {
          acc[input.proprety] = input.defaultValue;
        }
        return acc;
      }, {} as { [key: string]: string | number | boolean | any[] });

      setForms([
        {
          id: generateId(),
          parentId: null,
          children: [],
          formData: initialFormData,
        },
      ]);
    }
  }, [currentForm, generateId]);

  const addChildForm = useCallback(
    (parentId: number) => {
      if (!currentForm) return;
      setForms((prevForms) => {
        const newForm: FormNode = {
          id: generateId(),
          parentId,
          children: [],
          formData: currentForm.inputs.reduce((acc, input) => {
            if (input.defaultValue !== undefined) {
              acc[input.proprety] = input.defaultValue;
            }
            return acc;
          }, {} as { [key: string]: string | number | boolean | any[] }),
        };

        const addChild = (formsList: FormNode[]): FormNode[] => {
          return formsList.map((form) => {
            if (form.id === parentId) {
              return { ...form, children: [...form.children, newForm] };
            }
            return { ...form, children: addChild(form.children) };
          });
        };

        return addChild(prevForms);
      });
    },
    [generateId, currentForm]
  );

  const addSiblingForm = useCallback(
    (parentId: number | null) => {
      setForms((prevForms) => [
        ...prevForms,
        { id: generateId(), parentId, children: [], formData: {} },
      ]);
    },
    [generateId]
  );

  const updateFormData = useCallback(
    (formId: number, key: string, value: string | number | boolean | any[]) => {
      setForms((prevForms) => {
        const updateData = (formsList: FormNode[]): FormNode[] => {
          return formsList.map((form) => {
            if (form.id === formId) {
              return {
                ...form,
                formData: { ...form.formData, [key]: value },
              };
            }
            return { ...form, children: updateData(form.children) };
          });
        };
        return updateData(prevForms);
      });
    },
    []
  );

  const removeForm = useCallback((formId: number) => {
    setForms((prevForms) => {
      const removeById = (formsList: FormNode[]): FormNode[] => {
        return formsList.reduce<FormNode[]>((acc, form) => {
          if (form.id !== formId) {
            acc.push({ ...form, children: removeById(form.children) });
          }
          return acc;
        }, []);
      };
      return removeById(prevForms);
    });
  }, []);

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

  const collectFormData = useCallback(
    (
      formNodes: FormNode[]
    ): { [key: string]: string | number | boolean | any[] }[] => {
      const allData: { [key: string]: string | number | boolean | any[] }[] =
        [];

      const collectData = (nodes: FormNode[]) => {
        nodes.forEach((form) => {
          allData.push(form.formData);
          if (form.children.length > 0) {
            collectData(form.children);
          }
        });
      };

      collectData(formNodes);
      return allData;
    },
    []
  );

  const resetForms = useCallback((formNodes: FormNode[]) => {
    setForms((prevForms) => {
      const resetData = (formsList: FormNode[]): FormNode[] => {
        return formsList.map((form) => ({
          ...form,
          formData: {},
          children: resetData(form.children),
        }));
      };
      return resetData(prevForms);
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    const allFormData = collectFormData(forms);
    setIsLoading(true);
    try {
      setFormState(allFormData[0]);
      await pushFormData(allFormData[0]);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        submit: "Une erreur est survenue lors de la soumission du formulaire",
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    forms,
    collectFormData,
    setFormState,
    pushFormData,
    setIsLoading,
    setErrors,
  ]);

  const renderForms = useCallback(
    (formNodes: FormNode[], level = 0) => {
      const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newErrors: { [key: string]: string } = {};
        let isValid = true;

        currentForm?.inputs.forEach((input) => {
          if (
            !formState[input.proprety] ||
            formState[input.proprety].length === 0
          ) {
            newErrors[input.proprety] = `Veuillez entrer un ${input.verbose}`;
            isValid = false;
          }
        });

        if (isValid) {
          setIsLoading(true);
          // pushFormData(allFormData[0]);
          setErrors({});
        } else {
          setErrors(newErrors);
          setIsSubmitted(false);
        }
      };

      return formNodes.map((form) => (
        <Box
          component="form"
          key={form.id}
          className="flex flex-col gap-3"
          onSubmit={handleFormSubmit}
        >
          {currentForm?.inputs.map((input) => (
            <Box
              key={`${form.id}-${input.proprety}`}
              className="w-full md:mb-0"
            >
              <InputDynamic
                headProprety={input}
                setError={() => {}}
                inputProps={{
                  label: input.verbose,
                  isDesabled: input.isDisabled || false,
                  value: form.formData[input.proprety],
                  defaultValue: input.defaultValue,
                  placeholder: input.proprety,
                  setValue: (value) =>
                    updateFormData(form.id, input.proprety, value),
                  fields: input.fields,
                  modelPath: input.modelPath,
                  constraints: input.constraints,
                  error: null,
                }}
              />
              {getErrorsForForm(form.id)[input.proprety] && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ fontWeight: 600 }}
                >
                  {getErrorsForForm(form.id)[input.proprety]}
                </Typography>
              )}

              {currentForm.hasChildrens !== false &&
                currentForm?.inputs.length - 1 ===
                  currentForm?.inputs.indexOf(input) && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={2}
                    marginTop={2}
                  >
                    <Typography variant="body2" color="textSecondary">
                      **Instructions pour ajouter des formulaires :**
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      - Cliquez sur Ajouter un enfant pour créer un formulaire
                      sous celui-ci. Ce formulaire sera imbriqué et apparaîtra
                      en dessous du formulaire actuel.
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => addChildForm(form.id)}
                    >
                      Ajouter un enfant
                    </Typography>
                    {form.parentId === null && (
                      <>
                        <Typography variant="body2" color="textSecondary">
                          - Cliquez sur Ajouter un frère pour créer un
                          formulaire parallèle au formulaire actuel. Ce
                          formulaire sera ajouté au même niveau que le
                          formulaire actuel.
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary"
                          sx={{ cursor: "pointer" }}
                          onClick={() => addSiblingForm(null)}
                        >
                          Ajouter un frère
                        </Typography>
                      </>
                    )}
                  </Box>
                )}
            </Box>
          ))}
          {renderForms(form.children, level + 1)}
        </Box>
      ));
    },
    [
      currentForm?.inputs,
      addChildForm,
      addSiblingForm,
      updateFormData,
      getErrorsForForm,
      currentForm?.hasChildrens,
      formState,
      setErrors,
      setIsLoading,
      setIsSubmitted,
    ]
  );

  const memoizedRenderForms = useMemo(
    () => renderForms(forms),
    [renderForms, forms]
  );

  return (
    <>
      <Box flexWrap="wrap" gap={4} paddingY={4}>
        {memoizedRenderForms}
      </Box>

      {hideSubmitButton ? (
        ""
      ) : (
        <Box className="flex justify-center mt-6">
          <PrimaryButton
            type="submit"
            isDisabled={false}
            text={formState.isLoading ? "Soumission..." : "Soumettre"}
            className="w-4 py-3 text-white"
            onClick={handleSubmit}
            startIcon={
              formState.isLoading ? <CircularProgress size={20} /> : null
            }
          ></PrimaryButton>
        </Box>
      )}
    </>
  );
};

export default React.memo(InputSection);
