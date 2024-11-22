import { LocalStorageToken } from "@/src/types/localStorage/token";
import { RequestHandler } from "./api";

interface BlobWithMetadata {
  blob: Blob;
  size: number;
  width: number;
  height: number;
  name: string;
  typeMime: string;
}

export class ImageUploader {
  requestHandler: RequestHandler;

  constructor() {
    this.requestHandler = new RequestHandler();
  }

  // Changer le type de retour en Promise<BlobWithMetadata>
  base64ToBlob = async (
    base64Data: string,
    contentType = "image/jpg"
  ): Promise<BlobWithMetadata> => {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    // Extraction des dimensions de l'image
    const img = new Image();
    img.src = base64Data;

    const size = byteArray.byteLength;
    const name = `image.${contentType.split("/")[1]}`; // Par exemple, "image.jpg"
    const typeMime = contentType;

    // Note : width et height ne peuvent pas être directement déterminés sans charger l'image.
    return new Promise<BlobWithMetadata>((resolve) => {
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        resolve({ blob, size, width, height, name, typeMime });
      };
    });
  };

  uploadOne = async (base64Image: string) => {
    const formData = new FormData();

    // Utilisez await ici pour obtenir le Blob et ses métadonnées
    const { blob, name } =
      await this.base64ToBlob(base64Image);

    formData.append("file", blob, name); // Ajoutez le blob avec le nom
    formData.append("url", "http://example.com");

    // Vous pouvez maintenant utiliser size, width, height, et typeMime selon vos besoins

    try {
      const brutToken = localStorage.getItem("dpToken");
      let localStorageToken: LocalStorageToken | null = null;
      let token = "";
      if (brutToken !== null) localStorageToken = JSON.parse(brutToken);
      if (localStorageToken) {
        token = "Bearer " + localStorageToken.accessToken;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/img/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            // Pas besoin de définir le Content-Type ici
            authorization: token,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return data;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
}
