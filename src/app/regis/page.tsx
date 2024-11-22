"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRef, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from "@heroicons/react/solid";
import { CiCircleRemove } from "react-icons/ci";

const schema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  firstName: z.string().nonempty("Le prénom est requis"),
  lastName: z.string().nonempty("Le nom est requis"),
  password: z
    .string()
    .min(8, "Au moins 8 caractères")
    .max(32, "Pas plus de 32 caractères")
    .refine((val) => new Set(val).size >= 4, "Au moins 4 caractères différents")
    .refine(
      (val) => /[a-zA-Z]/.test(val),
      "Au moins 2 caractères alphabétiques"
    )
    .refine(
      (val) => /\d|[.,!?@#$%^&*()_+<>]/.test(val),
      "Au moins 2 caractères numériques ou de ponctuation"
    )
    .refine(
      (val) => /^[^\sÀ-ÿ]+$/.test(val),
      "Ne doit pas contenir d'accents ou de caractères non permis"
    )
    .refine(
      (val) => !/(\d{6,})/.test(val),
      "Pas plus de 5 chiffres consécutifs"
    )
    .refine(
      (val, ctx) =>
        !val.includes(ctx.parent.email) &&
        !val.includes(ctx.parent.firstName) &&
        !val.includes(ctx.parent.lastName),
      "Ne doit pas contenir le courriel, prénom ou nom"
    ),
  confirmPassword: z
    .string()
    .refine((val, ctx) => val === ctx.parent.password, {
      message: "Les mots de passe doivent être identiques",
    }),
});

type FormData = z.infer<typeof schema>;
interface RegistrationFormProps {
  closeModal: () => void;
}

const RegistrationForm: React.FC = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password") || "";
  const email = watch("email") || "";
  const firstName = watch("firstName") || "";
  const lastName = watch("lastName") || "";

  const passwordRules = [
    {
      label: "Entre 8 et 32 caractères",
      isValid: password.length >= 8 && password.length <= 32,
    },
    {
      label: "Au moins 4 caractères différents",
      isValid: new Set(password).size >= 4,
    },
    {
      label: "Au moins 2 caractères alphabétiques",
      isValid: /[a-zA-Z]/.test(password),
    },
    {
      label: "Au moins 2 caractères numériques ou de ponctuation",
      isValid: /\d|[.,!?@#$%^&*()_+<>]/.test(password),
    },
    {
      label: "Ne doit pas contenir d'accents ou caractères non permis",
      isValid: /^[^\sÀ-ÿ]+$/.test(password),
    },
    {
      label: "Au plus 5 chiffres consécutifs",
      isValid: !/(\d{6,})/.test(password),
    },
    {
      label: "Ne doit pas contenir l'email, prénom ou nom",
      isValid:
        !password.includes(email) &&
        !password.includes(firstName) &&
        !password.includes(lastName),
    },
  ];

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    setIsSubmitted(true);
  };

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Logique de soumission ici, comme l'envoi de données
    console.log("Form submitted");
    alert("compte créer avec succès !");
    // Réinitialiser le formulaire après la soumission
    if (formRef.current) {
      formRef.current.reset();
    }

    // Optionnel : Fermer le modal après la soumission
    closeModal();
  };
  return (
    <div className="flex flex-col items-center justify-center py-10  ">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 ">
            Création de ton compte admission
          </h2>
          <div
            onClick={closeModal}
            className="cursor-pointer text-gray-600 hover:text-gray-900 "
          >
            <CiCircleRemove className="text-[2rem]" />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Courriel
              </label>
              <input
                type="email"
                {...register("email")}
                className={`mt-1 w-full p-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                placeholder="Votre email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Prénom
              </label>
              <input
                type="text"
                {...register("firstName")}
                className={`mt-1 w-full p-2 border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                placeholder="Votre prénom"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Nom
              </label>
              <input
                type="text"
                {...register("lastName")}
                className={`mt-1 w-full p-2 border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                placeholder="Votre nom"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Mot de passe */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600">
                Mot de passe
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`mt-1 w-full p-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                placeholder="Votre mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirmation mot de passe */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600">
                Confirmation mot de passe
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={`mt-1 w-full p-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                placeholder="Confirmez le mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              onClick={handleFormSubmit}
            >
              Créer mon compte
            </button>
            {isSubmitted && (
              <p className="text-green-500 mt-2">
                Votre compte a été créé avec succès !
              </p>
            )}
          </div>

          {/* Règles */}
          <div className="bg-gray-50 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Règles de mot de passe
            </h3>
            <ul className="space-y-2">
              {passwordRules.map((rule, index) => (
                <li key={index} className="flex items-center space-x-2">
                  {rule.isValid ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                  <span
                    className={rule.isValid ? "text-gray-700" : "text-gray-500"}
                  >
                    {rule.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
