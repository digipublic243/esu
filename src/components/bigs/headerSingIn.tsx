"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { FaSignInAlt } from "react-icons/fa";
import logo from "@/public/logo-inline-green.png";
import Link from "next/link";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";

const HeaderSingIn: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback(
    (event: React.SyntheticEvent | null, isOpen: boolean) => {
      setOpen(isOpen);
    },
    []
  );
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between  text-customBlack py-[20px] px-[4%]">
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} width={150} height={50} alt="logo" priority />
        </Link>
      </div>

      <nav>
        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <div
            className={`w-6 h-1 bg-primary mb-1 transition-transform ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-1 bg-primary mb-1 transition-opacity ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-1 bg-primary transition-transform ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </button>

        <div
          className={`absolute md:static top-[8%] left-0 w-full md:w-auto md:flex md:items-center bg-primary text-white md:bg-transparent transition-transform mb-4 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <p className="md:hidden flex items-center text-white py-2 px-4  hover:text-primary transition duration-200 ease-in-out mb-4 ml-4 ">
            <Dropdown>
              <MenuButton>Dashboard...</MenuButton>
              <Menu>
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
              </Menu>
            </Dropdown>
          </p>
        </div>
      </nav>

      <p className="hidden md:flex items-center text-gray-900 py-2 px-4   hover:text-primary transition duration-200 ease-in-out">
        <Dropdown open={open} onOpenChange={handleOpenChange}>
          <MenuButton>Winner Luyeye</MenuButton>
          <Menu>
            <MenuItem>
              <Link href="/">Mon Profil</Link>
            </MenuItem>
            <MenuItem>
              {" "}
              <Link href="/">Déconnexion</Link>
            </MenuItem>
          </Menu>
        </Dropdown>
      </p>
    </header>
  );
};

export default HeaderSingIn;
