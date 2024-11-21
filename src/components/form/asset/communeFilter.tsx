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
import { RequestHandler } from "@/src/utils/api";
import { InputPropsType } from "@/src/types/props/input.type";

export default function CommuneFilter(props: InputPropsType) {
  const [selectedProvince, setSelectedProvince] = React.useState<string>("");
  const [selectedCity, setSelectedCity] = React.useState<string>("");
  const [selectedCommune, setSelectedCommune] = React.useState<string>("");

  const [provinces, setProvinces] = React.useState<Array<any>>([]);
  const [cities, setCities] = React.useState<Array<any>>([]);
  const [communes, setCommunes] = React.useState<Array<any>>([]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Handle selection of province, city, and commune
  const handleProvinceChange = async (event: SelectChangeEvent<string>) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);

    // Fetch cities based on selected province
    await fetchCities(provinceId);
  };

  const handleCityChange = async (event: SelectChangeEvent<string>) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);

    // Fetch communes based on selected city
    await fetchCommunes(cityId);
  };

  const handleCommuneChange = (event: SelectChangeEvent<string>) => {
    const communeId = event.target.value;
    setSelectedCommune(communeId);
    console.log("Commune selected:", communeId); // Output the selected commune
  };

  // Fetch provinces data
  React.useEffect(() => {
    const fetchProvinces = async () => {
      setIsLoading(true);
      const requestHandler = new RequestHandler();
      try {
        const response = await requestHandler.get({
          method: "GET",
          path: "/core/entity?parent=null&include__childrens__include__childrens__include__childrens=true",
        });
        console.log(response.data);

        if (response.code === 200) {
          setProvinces(response.data);
        } else {
          console.error("Error fetching provinces:", response);
        }
      } catch (error) {
        console.error("Request failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch cities based on selected province
  const fetchCities = async (provinceId: string) => {
    const requestHandler = new RequestHandler();
    try {
      const response = await requestHandler.get({
        method: "GET",
        path: `/core/entity/fetch/${provinceId}?include__childrens=true`,
      });

      if (response.code === 200) {
        setCities(response.data.childrens);
      } else {
        console.error("Error fetching cities:", response);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  // Fetch communes based on selected city
  const fetchCommunes = async (cityId: string) => {
    const requestHandler = new RequestHandler();
    try {
      const response = await requestHandler.get({
        method: "GET",
        path: `/core/entity/fetch/${cityId}?include__childrens=true`,
      });
      console.log("Communes :::::::", response);
      console.log("Communes :::::::", response.data);
      if (response.code === 200) {
        setCommunes(response.data.childrens);
      } else {
        console.error("Error fetching communes:", response);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 300, width: "100%" }}>
        <InputLabel id="province-select-label">Province</InputLabel>
        <Select
          labelId="province-select-label"
          value={selectedProvince}
          onChange={handleProvinceChange}
          input={<OutlinedInput label="Province" />}
          renderValue={(selected) => selected || "Select a Province"}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {isLoading ? (
            <MenuItem disabled>Loading...</MenuItem>
          ) : (
            provinces.map((province) => (
              <MenuItem key={province.id} value={province.name}>
                <ListItemText primary={province.name} />
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {selectedProvince && (
        <FormControl sx={{ minWidth: 300, width: "100%" }}>
          <InputLabel id="city-select-label">City</InputLabel>
          <Select
            labelId="city-select-label"
            value={selectedCity}
            onChange={handleCityChange}
            input={<OutlinedInput label="City" />}
            renderValue={(selected) => selected || "Select a City"}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {isLoading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              cities.map((city) => (
                <MenuItem key={city.id} value={city.name}>
                  <ListItemText primary={city.name} />
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      )}

      {selectedCity && (
        <FormControl sx={{ minWidth: 300, width: "100%" }}>
          <InputLabel id="commune-select-label">Commune</InputLabel>
          <Select
            labelId="commune-select-label"
            value={selectedCommune}
            onChange={handleCommuneChange}
            input={<OutlinedInput label="Commune" />}
            renderValue={(selected) => selected || "Select a Commune"}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {isLoading ? (
              <MenuItem disabled>Loading...</MenuItem>
            ) : (
              communes.map((commune) => (
                <MenuItem key={commune.id} value={commune.name}>
                  <ListItemText primary={commune.name} />
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
