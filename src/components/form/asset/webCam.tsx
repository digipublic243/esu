import Loading from "@/src/components/atoms/loading";
import { InputPropsType } from "@/src/types/props/input.type";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import Image from "next/image";
import React, { useRef, useCallback, useState, useEffect } from "react";
import { MdCameraAlt } from "react-icons/md";
import Webcam from "react-webcam";
import FingerIFrame from "../../../../public/finger.component";

interface MediaDeviceInfoExtended extends MediaDeviceInfo {
  kind: "videoinput";
}

function WebCamComponent(props: InputPropsType) {
  const webcamRef = useRef<Webcam>(null);
  const [devices, setDevices] = useState<MediaDeviceInfoExtended[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleDevices = useCallback((mediaDevices: MediaDeviceInfo[]) => {
    const videoDevices = mediaDevices.filter(
      (device) => device.kind === "videoinput"
    ) as MediaDeviceInfoExtended[];
    setDevices(videoDevices);
    if (videoDevices.length > 0) {
      setSelectedDeviceId(videoDevices[0].deviceId);
    }
  }, []);
  useEffect(() => {
    navigator?.mediaDevices?.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      props.setValue(imageSrc);
    } else {
      props.setValue("");
    }
  }, [props, webcamRef]);

  const handleDeviceChange = (value: string) => {
    setSelectedDeviceId(value);
  };

  return (
    <fieldset className="flex flex-col gap-2.5 border border-gray-400 hover:border-gray-500 rounded-md p-2.5">
      <legend className="px-2 text-sm">photo</legend>
      <div className="flex items-start gap-5 max-md:flex-wrap">
        <div className="border p-2 rounded-md">
          <Box
            maxWidth="sm"
            className="h-96 w-96 max-md:w-full max-md:h-auto bg-gray-200 flex justify-center items-center"
          >
            {props.value ? (
              props.value && (
                <Image
                  src={props.value}
                  alt="Captured"
                  width={720}
                  height={720}
                  style={{
                    objectFit: "cover",
                    width: "auto",
                    height: "100%",
                  }}
                />
              )
            ) : selectedDeviceId ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{
                  objectFit: "cover",
                  width: "auto",
                  height: "100%",
                }}
                videoConstraints={{
                  deviceId: selectedDeviceId,
                  width: 720,
                  height: 720, // Conserver un format
                }}
              />
            ) : (
              <Loading />
            )}
          </Box>
        </div>
        <div className="flex flex-col items-start justify-between gap-5 w-full">
          <div className="flex flex-col w-full">
            <FormControl variant="filled" sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Camera
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedDeviceId || ""}
                onChange={(event) => handleDeviceChange(event.target.value)}
                label="Camera"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {devices.map((device, index) => (
                  <MenuItem
                    key={device.deviceId + index}
                    value={device.deviceId}
                  >
                    {device.label
                      ? device.label
                      : `Caméra ${devices.indexOf(device) + 1}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            onClick={capture}
            variant={props.value ? "outlined" : "contained"}
            color={!props.value ? "primary" : "error"}
          >
            {props.value ? (
              "reprendre la photo"
            ) : (
              <span className="flex gap-2.5">
                <MdCameraAlt size={25} />
                Capturer la photo
              </span>
            )}
          </Button>

          <Button onClick={() => setOpenModal(true)}>
            Prelevez les empruntes digitals
          </Button>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            className="my-8 max-md:my-0"
          >
            <Box
              component="div"
              className="modalContainer h-[90%] overflow-y-auto max-h-[90vh] p-4 rounded w-full max-w-[80%] mx-auto bg-white max-md:w-screen max-md:h-[100vh] max-md:top-0 max-md:left-0"
            >
              <FingerIFrame />
            </Box>
          </Modal>
        </div>
      </div>
    </fieldset>
  );
}

export default WebCamComponent;
