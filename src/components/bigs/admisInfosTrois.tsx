"use client";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import sect_trois from "@/public/sect_trois.png";
import AOS from "aos";
import "aos/dist/aos.css"; // Importer les styles AOS

function AdmisInfos() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durée de l'animation
      easing: "ease-in-out", // Type de transition
      once: true, // Ne s'active qu'une fois
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row py-6 px-4 md:px-10 justify-between items-center gap-6 max-w-7xl mx-auto">
      {/* Image Section */}
      <div
        className="w-[80%] md:w-1/2"
        data-aos="fade-right" // Animation au défilement
      >
        <Image
          src={sect_trois}
          layout="responsive"
          width={700}
          height={100}
          alt="Logo"
          priority
          objectFit="cover"
        />
      </div>

      {/* Accordion Section */}
      <div
        className="w-full md:w-1/2 space-y-4"
        data-aos="fade-left" // Animation au défilement
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="item-1"
            className="border-b border-gray-200"
            data-aos="fade-up" // Animation au clic
          >
            <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-green-600 transition duration-300 ease-in-out">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 py-2 pl-4">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border-b border-gray-200"
            data-aos="fade-up"
          >
            <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-green-600 transition duration-300 ease-in-out">
              Is it styled?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 py-2 pl-4">
              Yes. It comes with default styles that match the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border-b border-gray-200"
            data-aos="fade-up"
          >
            <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-green-600 transition duration-300 ease-in-out">
              Is it animated?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 py-2 pl-4">
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default AdmisInfos;
