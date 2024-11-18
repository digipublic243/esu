"use client";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AOS from "aos";
import "aos/dist/aos.css"; // Importation des styles AOS

function Additionals() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durée de l'animation
      easing: "ease-in-out", // Type de transition
      once: true, // Ne s'active qu'une seule fois
    });
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-6 px-4 max-w-7xl mx-auto">
      {/* Section 1 */}
      <div
        className="w-full md:w-1/2 p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        data-aos="fade-right"
      >
        <h3 className="text-4xl font-bold text-green-600  mb-4">04</h3>
        <p className="text-lg text-gray-700 mb-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing.
        </p>
        <p className="text-md text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
          totam!
        </p>

        {/* Accordion */}
        <div className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="item-1"
              className="border-b border-gray-300"
              data-aos="fade-up"
            >
              <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-green-500 transition duration-300">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 py-2 pl-4">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="border-b border-gray-300"
              data-aos="fade-up"
            >
              <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-green-500 transition duration-300">
                Is it styled?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 py-2 pl-4">
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="border-b border-gray-300"
              data-aos="fade-up"
            >
              <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-green-500 transition duration-300">
                Is it animated?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 py-2 pl-4">
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Section 2 */}
      <div
        className="w-full md:w-1/2 p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        data-aos="fade-left"
      >
        <h3 className="text-4xl font-bold text-green-600  mb-4">04</h3>
        <p className="text-lg text-gray-700 mb-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing.
        </p>
        <p className="text-md text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
          totam!
        </p>

        {/* Accordion */}
        <div className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="item-1"
              className="border-b border-gray-300"
              data-aos="fade-up"
            >
              <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-green-500 transition duration-300">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 py-2 pl-4">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="border-b border-gray-300"
              data-aos="fade-up"
            >
              <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-green-500 transition duration-300">
                Is it styled?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 py-2 pl-4">
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="border-b border-gray-300"
              data-aos="fade-up"
            >
              <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-green-500 transition duration-300">
                Is it animated?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 py-2 pl-4">
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Additionals;
