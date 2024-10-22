import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import "./OptionsBar.css";

function OptionsBar() {
  const [auth, setAuth] = useState(false);

  return (
    <div className="options-bar">
      {/* 如果没有登录，跳转至登录页面 */}
      {!auth && (
        <div className="user-avatar">
          <IconButton size="large" color="inherit">
            <AccountCircle />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default OptionsBar;
