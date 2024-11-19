"use client";

import { useState } from "react";
import Image from "next/image";
import { FaSignInAlt } from "react-icons/fa";
import logo from "@/public/logo-inline-green.png";
import Link from "next/link";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between  text-customBlack py-[20px] px-[4%]">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} width={150} height={50} alt="logo" priority />
        </Link>
      </div>

      {/* Navigation */}
      <nav>
        {/* Hamburger Button */}
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

        {/* Links and Connexion Button */}
        <div
          className={`absolute md:static top-[8%] left-0 w-full md:w-auto md:flex md:items-center bg-primary text-white md:bg-transparent transition-transform mb-4 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:ml-4 w-full md:w-auto">
            <li className="md:ml-4">
              <a
                href="#link1"
                className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent text-customBlack max-md:text-white "
              >
                Accueil
              </a>
            </li>
            <li className="md:ml-4">
              <a
                href="#link2"
                className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent text-customBlack max-md:text-white"
              >
                À propos
              </a>
            </li>
            <li className="md:ml-4">
              <a
                href="#link3"
                className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent text-customBlack max-md:text-white"
              >
                Services
              </a>
            </li>
            <li className="md:ml-4">
              <a
                href="#link4"
                className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent text-customBlack max-md:text-white"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Connexion Button (positionné en bas sur mobile) */}

          <p className="md:hidden flex items-center text-white py-2 px-4  hover:text-primary transition duration-200 ease-in-out mb-4 ml-4 ">
            <Dropdown>
              <MenuButton className="text-white">
                <FaSignInAlt className="mr-2 text-white hover:text-primary transition duration-200 ease-in-out" />
                <Link href="/inscription">Inscription</Link>
              </MenuButton>
            </Dropdown>
          </p>
        </div>
      </nav>

      {/* Ce bouton sera visible seulement sur les écrans medium et plus grands */}

      <p className="hidden md:flex items-center text-gray-900 py-2 px-4   hover:text-primary transition duration-200 ease-in-out">
        <Dropdown>
          <MenuButton>
            <FaSignInAlt className="mr-2 text-gray-900 hover:text-primary transition duration-200 ease-in-out " />
            <Link href="/inscription">Inscription</Link>
          </MenuButton>
        </Dropdown>
      </p>
    </header>
  );
};

export default Header;
