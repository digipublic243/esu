"use client";
import HeaderSingIn from "@/src/components/bigs/headerSingIn";
import Sidebar from "@/src/components/bigs/sideBar";
import React from "react";

function HomePage() {
  return (
    <div>
      <HeaderSingIn />
      <div className="flex bg-slate-100">
        <Sidebar admissionComplete={false} />
        <div className="flex-1 bg-slate-100 text-white flex items-center justify-center">
          <p className="text-center text-gray-950">
            🎓 Bienvenue sur DigiPublic | eStudent.
            <br />
            Sélectionnez une option dans le menu à gauche pour commencer !
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
