"use client";

import * as React from "react";
import { Button, Input } from "@mui/material";
import { InputPropsType } from "@/types/props/input.type";

// export default function InputFile() {
//   const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       // Convertir FileList en un tableau de fichiers
//       const filesArray = Array.from(event.target.files);
//       // Ajouter les nouveaux fichiers aux fichiers existants
//       setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
//     }
//   };

//   return (
//     <div>
//       {selectedFiles.length > 0 && (
//         <div>
//           {selectedFiles.map((file, index) => (
//             <p key={index}>Fichier Sélectionné: {file.name}</p>
//           ))}
//         </div>
//       )}
//       <Input
//         id="file-input"
//         type={props.type || "file"}
//         inputProps={{ multiple: true }}
//         onChange={handleFileChange}
//         style={{ display: "none" }}
//       />
//       <label htmlFor="file-input">
//         <Button variant="contained" component="span">
//           {props.label ? props.label : "Choisir des fichiers"}
//         </Button>
//       </label>
//     </div>
//   );
// }

import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ImageUploader } from "@/src/app/utils/imageUploader";
import { LocalStorageToken } from "@/types/localStorage/token";
import Image from "next/image";

const InputFile = (props: InputPropsType) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      handleClickOpen();
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("url", "http://example.com");

      const brutToken = localStorage.getItem("dpToken");
      let localStorageToken: LocalStorageToken | null = null;
      let token = "";
      if (brutToken !== null) localStorageToken = JSON.parse(brutToken);
      if (localStorageToken) {
        token = "Bearer " + localStorageToken.accessToken;
      }

      const response: any = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/img/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            authorization: token,
          },
        }
      );

      if (!response.ok) throw new Error("Erreur lors de l'upload");
      const data = await response.json();
      props.setValue(data["data"]["url"]);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Échec de l'upload");
    } finally {
      handleClose();
      setSelectedFile(null);
      setPreview(null);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="image-upload"
      />

      {props.value && props.value.length > 0 ? (
        <div className="h-auto w-full">
          <Image
            height={1200}
            width={1200}
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/img${
              props.value[0] === "/" ? "" : "/"
            }${props.value}`}
            alt="hello word"
          />
        </div>
      ) : (
        <label htmlFor="image-upload" className="border border-red-400 w-full">
          <Button
            variant="contained"
            color="primary"
            component="span"
            className="w-full"
          >
            {props.label}
          </Button>
        </label>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmer l&apos;upload</DialogTitle>
        <DialogContent>
          {preview && (
            <Image
              height={1200}
              width={1200}
              src={preview}
              alt="Aperçu"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleUpload} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InputFile;
