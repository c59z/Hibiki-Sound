import TextField from "@mui/material/TextField";
import { InputAdornment, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { replace, useNavigate } from "react-router-dom";

import "./Search.css";
import { useState, useRef } from "react";

function SearchBar() {
  const navigate = useNavigate();
  const debounceTimer = useRef(null); // 定时器引用

  const inputChange = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      navigate("/");
    }
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (value !== "" && value === e.target.value.trim()) {
        navigate(`/search?key=${e.target.value.trim()}`);
      } else if (value === "") {
        navigate("/");
      }
    }, 1000);
  };

  return (
    <>
      <TextField
        id="outlined-search"
        label="搜索"
        type="search"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        onChange={inputChange}
      />
    </>
  );
}

export default SearchBar;
