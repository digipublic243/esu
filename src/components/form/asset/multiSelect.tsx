import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { InputPropsType } from "@/src/types/props/input.type";
import { RequestHandler } from "@/src/utils/api";
import { SelectChangeEvent } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

export default function MultiSelect(props: InputPropsType) {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [options, setOptions] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const currentValue = event.target.value as string[];
    console.log(props);
    setSelectedOptions(currentValue);
    props.setValue(currentValue);
  };

  const displayColumns = (
    data: { [key: string]: any },
    columnsToDisplay?: string[]
  ) => {
    if (!columnsToDisplay) {
      return (
        data["name"] ||
        data["libelle"] ||
        data["label"] ||
        data["description"] ||
        data.toString()
      );
    }

    return columnsToDisplay.map((column) => data[column]).join(" ");
  };

  React.useEffect(() => {
    if (props.modelPath && props.modelPath.length > 0) {
      setIsLoading(true);
      const requestHandler = new RequestHandler();

      const fetchOptions = async () => {
        try {
          const response = await requestHandler.get({
            method: "GET",
            path:
              props.modelPath && props.modelPath.startsWith("/")
                ? props.modelPath
                : `/${props.modelPath}`,
          });

          if (response.code === 200) {
            if (Array.isArray(response.data[0])) setOptions(response.data[0]);
            else setOptions(response.data);
            toast(String(response?.message));
          } else {
            console.error("Error:", response);
            toast("Error:" + String(response));
          }
        } catch (error) {
          console.error("Request failed:", error);
          toast("Request failed:" + String(error));
        } finally {
          setIsLoading(false);
        }
      };

      fetchOptions();
    }
  }, [props.modelPath]);

  return (
    <FormControl sx={{ width: "100%" }} disabled={props.disabled}>
      <Toaster />
      <InputLabel id="demo-multiple-checkbox-label">{props.label}</InputLabel>
      <Select
        label={props.label}
        id="demo-multiple-checkbox"
        multiple
        value={selectedOptions}
        onChange={handleChange}
        input={<OutlinedInput label="Select Options" />}
        renderValue={(selected) => (selected as string[]).join(", ")}
        disabled={props.disabled}
      >
        {options.map((option: { [key: string]: string }, index: number) => {
          const displayText =
            typeof option === "string"
              ? option
              : displayColumns(option, props.displayColumns);
          return (
            <MenuItem
              key={option.id}
              value={displayText}
              onClick={() => {
                if (props.value == undefined) {
                  props.setValue([option.id]);
                } else if (props.value.includes(option.id)) {
                  props.setValue(
                    props?.value.filter((id: string) => id != option.id)
                  );
                } else {
                  props.setValue([...props.value, option.id]);
                }
              }}
            >
              <ListItemText secondary={index + 1} />
              <Checkbox checked={selectedOptions.indexOf(displayText) > -1} />
              <ListItemText sx={{ width: "100%" }} primary={displayText} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
