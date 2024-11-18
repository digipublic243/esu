import Image from "next/image";
import { Button } from "@/components/ui/button";

const ResultSuccess = ({
  title,
  subtitle,
  closeBtnText = "Close",
  exitProcessEvent,
}: {
  title: string;
  closeBtnText?: string;
  subtitle: string;
  exitProcessEvent: () => void;
}) => (
  <>
    <div className="flex flex-col items-center pb-10 justify-start">
      <div className="flex text-green-500  flex-row items-center justify-center my-10">
        <div className="h-20 w-20">
          <Image
            unoptimized
            alt="logo de digipublic"
            src="/images/gifs/success.gif"
            width={400}
            height={200}
          />
        </div>
      </div>
      <div className="text-green-500 text-lg lg:text-xl font-MontserratBold">
        {title}
      </div>
      <div className="text-gray-600 text-center mb-10">{subtitle}</div>
      <div className="flex justify-center">
        <Button variant="destructive" onClick={exitProcessEvent}>
          {closeBtnText}
        </Button>
      </div>
    </div>
  </>
);

export default ResultSuccess;
