// components/Login.js
"use client";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Se Connecter
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
          </div>

          {/* Bouton de Soumission */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Se Connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
