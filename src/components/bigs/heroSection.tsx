import React from "react";
import HeroSectionImage from "@/public/HeroSectionImage.jpg";
import Image from "next/image";
import Link from "next/link";

function HeroSection() {
  return (
    <div className="relative w-full">
      <div className="relative w-full h-[100%] ">
        <Image
          src={HeroSectionImage}
          layout="responsive"
          width={1000}
          height={100}
          alt="logo"
          priority
          objectFit="cover"
        />
        <div className="absolute top-[20%] left-[10%] text-primary z-10">
          <p className="text-[3.25rem] max-md:text-[2rem] ">Etudier en RDC</p>
          <h1 className="text-[6rem] font-bold max-md:text-[4rem] ">
            Admission
          </h1>
        </div>
      </div>
      <div className="w-full flex items-center justify-between py-[40px] px-[4%] bg-[#40a18f] text-white h-[100%] max-md:flex-col max-md:justify-center max-md:items-center max-md:text-[30px] max-md:gap-4">
        <div className="text-3xl">
          Ton aventure commence ici. <strong> Fais ta demande.</strong>
        </div>
        <button className="text-[24px] text-white p-[20px] rounded-[10px] bg-primaryHover">
          Admission
        </button>
      </div>

      <div className="py-[20px] px-[4%] flex gap-4  border-b border-[##f3f3f3] max-md:hidden">
        <Link href="/#">
          <div className="text-[#8f939c] flex hover:text-primaryHover items-center">
            <h3 className="block mr-2 font-bold text-[2rem] leading-[0.9em]">
              01.
            </h3>
            <p className="block m-0 font-sans font-semibold leading-[1.5rem]">
              Lorem ipsum dolor sit amet, consectetur{" "}
            </p>
          </div>
        </Link>
        <Link href="/#">
          <div className="text-[#8f939c] flex hover:text-primaryHover items-center">
            <h3 className="block mr-2 font-bold text-[2rem] leading-[0.9em]">
              02.
            </h3>
            <p className="block m-0 font-sans font-semibold leading-[1.5rem]">
              Lorem ipsum dolor sit amet, consectetur{" "}
            </p>
          </div>
        </Link>
        <Link href="/#">
          <div className="text-[#8f939c] flex hover:text-primaryHover items-center">
            <h3 className="block mr-2 font-bold text-[2rem] leading-[0.9em]">
              03.
            </h3>
            <p className="block m-0 font-sans font-semibold leading-[1.5rem]">
              Lorem ipsum dolor sit amet, consectetur{" "}
            </p>
          </div>
        </Link>
        <Link href="/#">
          <div className="text-[#8f939c] flex hover:text-primaryHover items-center">
            <h3 className="block mr-2 font-bold text-[2rem] leading-[0.9em]">
              04.
            </h3>
            <p className="block m-0 font-sans font-semibold leading-[1.5rem]">
              Lorem ipsum dolor sit amet, consectetur{" "}
            </p>
          </div>
        </Link>
        <Link href="/#">
          <div className="text-[#8f939c] flex hover:text-primaryHover items-center">
            <h3 className="block mr-2 font-bold text-[2rem] leading-[0.9em]">
              05.
            </h3>
            <p className="block m-0 font-sans font-semibold leading-[1.5rem]">
              Lorem ipsum dolor sit amet, consectetur{" "}
            </p>
          </div>
        </Link>
      </div>

      <div className="text-[#8f939c] py-[20px] px-[4%] gap-4 border-b border-[#f3f3f3] block md:hidden font-bold text-[1.4rem] ">
        Suivez les 5 étapes
      </div>
    </div>
  );
}

export default HeroSection;
