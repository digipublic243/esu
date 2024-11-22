"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@mui/material";
import { SchoolIcon } from "lucide-react";
import Link from "next/link";

const AccueilPage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const surname = searchParams.get("surname");

  return (
    <div className="flex items-center justify-center bg-gray-100 h-[90vh] ">
      <div className="flex gap-4">
        <Link href="/admissionForm">
          <Button
            fullWidth
            startIcon={<SchoolIcon />}
            sx={{ mb: 2, bgcolor: "white", color: "black" }}
          >
            Inscription
          </Button>
        </Link>

        <Link href="/">
          <Button
            fullWidth
            startIcon={<SchoolIcon />} // Choisissez l'icône que vous préférez
            sx={{ mb: 2, bgcolor: "white", color: "black" }}
          >
            Diplôme
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AccueilPage;
