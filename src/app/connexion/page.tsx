// components/Login.js
"use client";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Username/Email:", username);
    console.log("Password:", password);
  };

  return (
    <div className="bg-gray-100 h-[87vh] p-[5%] ">
      <div className=" px-4 py-4 justify-center flex gap-4">
        <div className="p-6 bg-white border border-black w-[40%] ">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Connecte-toi à ton compte
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Email/Nom d'utilisateur */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Adresse Email ou Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Entrez votre email ou nom d'utilisateur"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Champ Mot de Passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? "Cacher" : "Voir"}
                </button>
              </div>
              <Link
                href="/"
                className="flex justify-end italic underline text-primary pt-4"
              >
                Mot de oublié
              </Link>
            </div>
            {/* Bouton de Soumission */}
            <button
              type="submit"
              className="ml-[30%] text-center w-[150px] px-4 py-2 text-white bg-primary hover:bg-primaryHover rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Se Connecter
            </button>
          </form>

          <div className="pt-4">
            <Link href="/" className="font-bold text-primary">
              Lorem ipsum dolor sit amet.
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[40%]">
          <div className="p-6 bg-white border border-black ">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              DigiPublic | eStudent
            </h2>
            <p className="text-[#141414] ">
              Créer un compte <br />
              Si tu n'as pas de compte , créer un en une minute.
            </p>
            <button
              type="submit"
              className="ml-[30%] mt-4 text-center w-[200x] px-4 py-2 text-white bg-primary hover:bg-primaryHover rounded-md shadow-sm focus:outline-none focus:ring-2 "
            >
              Créer un compte
            </button>
          </div>

          <div className="p-6 bg-white border border-black">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit.
              Nobis, eius. Laudantium quos cupiditate vero nostrum!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit.
              Nobis, eius. Laudantium quos cupiditate vero nostrum!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit.
              Nobis, eius. Laudantium quos cupiditate vero nostrum!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
