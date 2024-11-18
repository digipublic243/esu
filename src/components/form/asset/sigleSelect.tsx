"use client";

import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { InputPropsType } from "@/src/types/props/input.type";
import { RequestHandler } from "@/src/utils/api";
export default function SingleSelect(props: InputPropsType) {
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const [options, setOptions] = React.useState<Array<any>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selected = event.target.value as string;
    setSelectedOption(selected);
    const [displayValue, actualValue] = selected.split("::");
    props.setValue(actualValue || displayValue);
  };

  React.useEffect(() => {
    if (props.fields && props.fields.length > 0) {
      setOptions(props.fields);
    }
  }, [props.fields]);

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
            setOptions(response.data);
          } else {
            console.error("Error:", response);
          }
        } catch (error) {
          console.error("Request failed:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchOptions();
    }
  }, [props.modelPath]);

  const displayColumns = (
    data: { [key: string]: any },
    columnsToDisplay?: string[]
  ) => {
    if (!columnsToDisplay) {
      return (
        data["name"] ||
        data["label"] ||
        data["label"] ||
        data["libelle"] ||
        data["description"] ||
        data.toString()
      );
    }

    return columnsToDisplay.map((column) => data[column]).join(" ");
  };

  return (
    <FormControl
      required
      sx={{ minWidth: 300, width: "100%" }}
      disabled={props.disabled}
    >
      <InputLabel id="single-select-label">{props.label}</InputLabel>
      <Select
        labelId="single-select-label"
        id="single-select"
        value={selectedOption}
        sx={{}}
        onChange={handleChange}
        input={<OutlinedInput label="Select Option" />}
        renderValue={(selected) =>
          selected ? selected.split("::")[0] : "Select an option"
        }
        disabled={props.disabled}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {isLoading ? (
          <MenuItem disabled>Loading...</MenuItem>
        ) : (
          options.map((option) => {
            const displayText =
              typeof option === "string"
                ? option
                : displayColumns(option, props.displayColumns);
            const valueText = `${displayText}::${
              typeof option === "string" ? option : option["id"]
            }`;

            return (
              <MenuItem key={valueText} value={valueText}>
                <ListItemText primary={displayText} />
              </MenuItem>
            );
          })
        )}
      </Select>
    </FormControl>
  );
}
