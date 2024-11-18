import { Button } from "@/components/ui/button";
import { Pencil, Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";

const ConfigsTitle = ({
  title,
  subTitle,
  handleAddEvent,
  handleRefreshEvent,
}: {
  title: string;
  subTitle: string;
  handleAddEvent: () => void;
  handleRefreshEvent: () => void;
}) => {
  return (
    <>
      <div className="border-b w-full space-x-3 mb-4 text-primary-hover py-3 px-4 flex items-center">
        <Pencil />
        <div className="flex flex-col flex-1">
          <h3 className="font-bold flex-1 text-primary-hover">{title}</h3>
          <small className="text-gray-500">{subTitle}</small>
        </div>
        <div className="px-2 flex space-x-3">
          <Button onClick={handleAddEvent} variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>

          <Button onClick={handleRefreshEvent} variant="outline" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConfigsTitle;
