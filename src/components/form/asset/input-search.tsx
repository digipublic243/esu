import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { MdOutlineClose } from "react-icons/md";

const SearchInput: React.FC<{
  placeholder?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}> = ({ placeholder = "Search...",searchQuery,  setSearchQuery }) => {

  const handleSearch = () => {
    setSearchQuery(searchQuery);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <TextField
      fullWidth
      type="search"
      variant="outlined"
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyPress={handleKeyPress}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {searchQuery.length > 0 ? (
              <IconButton onClick={() => setSearchQuery("")}>
                <MdOutlineClose />
              </IconButton>
            ) : (
              false
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
