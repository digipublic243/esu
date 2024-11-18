"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HandFingerType = { [key: string]: { name: string; value: string } };

function FingerIFrame() {
  const [image, setImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [fingerImages, setFingerImages] = useState<HandFingerType>({
    imageSrc1: { name: "anulaire", value: "" },
    imageSrc2: { name: "index", value: "" },
    imageSrc3: { name: "majeur", value: "" },
    imageSrc4: { name: "oriculaire", value: "" },
    imageSrc5: { name: "pousse", value: "" },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const key = "imageSrc" + prevIndex;
        const currentValue = localStorage.getItem(key);

        if (prevIndex < 6 && currentValue != null) {
          setFingerImages((prev) => ({
            ...prev,
            [key]: {
              name: prev[key] ? prev[key].name : "",
              value: currentValue != null ? currentValue : "",
            },
          }));
          return prevIndex + 1;
        }
        return prevIndex;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-lg font-semibold">
        choisissez un lecteur avant de scan
      </h1>
      <div className="flex gap-5">
        <iframe
          src="/finger/index.html"
          width="500px"
          height="700px"
          title="FINGER PRINT iFRAME"
          style={{ border: "none" }}
        />

        <div className="flex flex-wrap gap-5 justify-center">
          {Object.keys(fingerImages).map((finger: string) => {
            return (
              <div
                onClick={() => {
                  if (fingerImages[finger].value == "")
                    setCurrentIndex(+finger[finger.length - 1]);
                }}
                className="border h-fit w-[200px] flex flex-col gap-2.5 p-2.5"
              >
                <div className="flex justify-between">
                  <span className="font-medium">
                    {fingerImages[finger].name}
                  </span>
                  <button
                    onClick={() => {
                      setFingerImages((prev) => ({
                        ...prev,
                        [finger]: {
                          name: prev[finger] ? prev[finger].name : "",
                          value: "",
                        },
                      }));
                    }}
                  >
                    x
                  </button>
                </div>
                {fingerImages[finger].value == "" ? (
                  false
                ) : (
                  <Image
                    src={fingerImages[finger].value}
                    alt="hello word"
                    className=""
                    width={200}
                    height={200}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FingerIFrame;
