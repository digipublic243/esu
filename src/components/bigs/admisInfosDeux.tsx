"use client";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import sect_deux from "@/public/sect_deux.png";
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
    <div className="flex md:flex-row py-6 px-4 md:px-10 justify-between items-center gap-6 max-w-7xl mx-auto flex-row-reverse max-md:flex-col-reverse ">
      {/* Accordion Section */}
      <div
        className="w-full md:w-1/2 space-y-4"
        data-aos="fade-left" // Animation d'apparition au scroll
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="item-1"
            className="border-b border-gray-200"
            data-aos="fade-up" // Animation lors de l'activation de l'élément
          >
            <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-purple-800 transition duration-300 ease-in-out">
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
            <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-purple-800 transition duration-300 ease-in-out">
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
            <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-purple-800 transition duration-300 ease-in-out">
              Is it animated?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 py-2 pl-4">
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {/* Image Section */}
      <div
        className="w-[80%] md:w-1/2"
        data-aos="fade-right" // Animation pour l'image lors du scroll
      >
        <Image
          src={sect_deux}
          layout="responsive"
          width={700}
          height={100}
          alt="Logo"
          priority
          objectFit="cover"
        />
      </div>
    </div>
  );
}

export default AdmisInfos;
