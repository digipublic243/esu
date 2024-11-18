import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface ModalProps {
  modalTitle: string;
  modalDescription?: string;
  children: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  onClosing: () => void;
  closeOnMaskClicked?: boolean;
}

const ConfigModalComponent = ({
  modalTitle,
  isOpen,
  children,
  closeModal,
  onClosing,
  modalDescription = "",
  closeOnMaskClicked = true,
}: ModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && closeOnMaskClicked) {
          onClosing();
          closeModal();
        }
      }}
    >
      <DialogContent className="sm:min-w-[50vw] max-md:w-[90vw]">
        <DialogHeader>
          <DialogTitle>{modalTitle || "Dialog"}</DialogTitle>{" "}
          {modalDescription && (
            <DialogDescription>{modalDescription}</DialogDescription>
          )}
          <DialogClose
            onClick={() => {
              closeModal();
            }}
          ></DialogClose>
        </DialogHeader>
        <div className="flex flex-col">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigModalComponent;
