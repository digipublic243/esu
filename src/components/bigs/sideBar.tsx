import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SchoolIcon from "@mui/icons-material/School";

import { Box, Button, IconButton, Typography } from "@mui/material";
import Link from "next/link";

type SidebarProps = {
  admissionComplete: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ admissionComplete }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Box
      sx={{
        width: isOpen ? "250px" : "0px",
        overflow: "hidden",
        bgcolor: "#048996",
        transition: "width 0.3s ease",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: "absolute",
          top: "10px",
          right: "-45px",
          zIndex: 10,
          bgcolor: "gray",
          color: "white",
          borderRadius: "50%",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      {isOpen && (
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: "white", mb: 2, textAlign: "center" }}
          >
            Menu
          </Typography>
          <Link href="/admissionForm">
            <Button
              fullWidth
              startIcon={<SchoolIcon />}
              sx={{ mb: 2, bgcolor: "white", color: "black" }}
            >
              Inscription
            </Button>
          </Link>
          {admissionComplete && (
            <Button
              fullWidth
              startIcon={<AssignmentTurnedInIcon />}
              sx={{ bgcolor: "white", color: "black", marginBottom: 2 }}
            >
              Suivre l'inscription
            </Button>
          )}

          <div>
            <Link href="/diplome">
              <Button
                fullWidth
                startIcon={<SchoolIcon />}
                sx={{ mb: 2, bgcolor: "white", color: "black" }}
              >
                Diplôme
              </Button>
            </Link>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
