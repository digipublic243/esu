import Image from "next/image";
import { Button } from "@/components/ui/button";

const ResultWarning = ({
  title,
  subtitle,
  backProcessEvent,
  backBtnText = "Back",
}: {
  title: string;
  subtitle: string;
  backBtnText: string;
  backProcessEvent: () => void;
}) => (
  <div className="flex flex-col items-center pb-10 justify-start">
    <div className="flex text-orange-500  flex-row items-center justify-center my-10">
      <svg
        className="h-20 w-20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        width="512"
        height="512"
      >
        <path d="M11.5,14.5V6.5c0-.28,.22-.5,.5-.5s.5,.22,.5,.5V14.5c0,.28-.22,.5-.5,.5s-.5-.22-.5-.5Zm.5,2.5c-.55,0-1,.45-1,1s.45,1,1,1,1-.45,1-1-.45-1-1-1Zm11.61,3.07c-.64,1.23-1.99,1.93-3.71,1.93H4.1c-1.71,0-3.07-.7-3.71-1.93-.65-1.24-.47-2.87,.48-4.24L9.3,2.43c.62-.9,1.63-1.43,2.7-1.43s2.08,.53,2.69,1.41l8.44,13.43c.95,1.37,1.13,2.99,.48,4.23Zm-1.31-3.67s0-.01-.01-.02L13.86,2.96c-.42-.61-1.1-.96-1.86-.96s-1.44,.36-1.87,.98L1.71,16.38c-.75,1.08-.91,2.31-.43,3.23,.47,.9,1.47,1.39,2.82,1.39h15.81c1.35,0,2.35-.49,2.82-1.39,.48-.91,.32-2.14-.42-3.21Z" />
      </svg>
    </div>
    <div className="text-orange-500 text-lg lg:text-xl font-MontserratBold">
      {title}
    </div>
    <div className="text-gray-600 text-center mb-10">{subtitle}</div>
    <div className="flex flex-row items-center space-x-4 w-full justify-center">
      <Button variant="secondary" onClick={backProcessEvent}>
        {backBtnText}
      </Button>
    </div>
  </div>
);

export default ResultWarning;
