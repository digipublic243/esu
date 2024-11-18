import Image from "next/image";
import { Button } from "@/components/ui/button";

const ResultError = ({
  title,
  subtitle,
  backProcessEvent,
  exitProcessEvent,
  closeBtnText = "Close",
  backBtnText = "Back",
}: {
  title: string;
  subtitle: string;
  closeBtnText?: string;
  backBtnText?: string;
  backProcessEvent: () => void;
  exitProcessEvent: () => void;
}) => (
  <div className="flex flex-col items-center pb-10 justify-start">
    <div className="flex text-red-500  flex-row items-center justify-center my-10">
      <div className="h-20 w-20">
        <Image
          unoptimized
          alt="logo de digipublic"
          src="/images/gifs/fail.gif"
          width={400}
          height={200}
        />
      </div>
    </div>
    <div className="text-red-500 text-lg lg:text-xl font-MontserratBold">
      {title}
    </div>
    <div className="text-gray-600 text-center mb-10">{subtitle}</div>
    <div className="flex flex-row items-center space-x-4 w-full justify-center">
      <Button variant="secondary" onClick={backProcessEvent}>
        {backBtnText}
      </Button>
      <Button variant="destructive" onClick={exitProcessEvent}>
        {closeBtnText}
      </Button>
    </div>
  </div>
);

export default ResultError;
