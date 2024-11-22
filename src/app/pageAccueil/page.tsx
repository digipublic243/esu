"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@mui/material";
import { SchoolIcon } from "lucide-react";
import Link from "next/link";
import HeaderSingIn from "@/src/components/bigs/headerSingIn";

const AccueilPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const surname = searchParams.get("surname");

  return (
    <div>
      <HeaderSingIn />
      <div className="flex items-center justify-center bg-gray-100 h-[90vh] ">
        <div className="flex gap-4">
          <Link
            href="/admissionForm"
            className="p-[25px] border border-primary rounded hover:bg-primaryHover hover:text-white "
          >
            <Button
              fullWidth
              startIcon={<SchoolIcon />}
              className="text-black hover:text-white"
            >
              Demande d'inscription Inscription
            </Button>
          </Link>

          <Link
            href="/diplome"
            className="p-[25px] border border-primary rounded hover:bg-primaryHover hover:text-white"
          >
            <Button
              fullWidth
              startIcon={<SchoolIcon />}
              className="text-black hover:text-white"
            >
              Demande d'inscription de Diplôme
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccueilPage;
