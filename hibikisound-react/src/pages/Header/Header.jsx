import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "../../components/Search/Search";

import PlayerBar from "../../components/PlayerBar/PlayerBar";

import HomeIcon from "@mui/icons-material/Home";
import {
  Dashboard,
  LibraryMusic,
  Audiotrack,
  Apps,
  QueueMusic,
} from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import { useNavigate } from "react-router-dom";

import "./Header.css";

const drawerWidth = "18%";

function Header() {
  const navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  return (
    <div className="Header-top">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* 播放器 */}
        <PlayerBar width={drawerWidth}></PlayerBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {/* Logo */}
          <Toolbar>
            <img className="icon-img" src="/img/music.svg" alt="" />
            <span className="icon-span">Hibiki Sound</span>
          </Toolbar>
          {/* <Divider /> */}
          <List>
            <ListItem key="searchBar">
              <SearchBar></SearchBar>
              {/* <ListItemButton className="btn_search">
                <SearchIcon />
              </ListItemButton> */}
            </ListItem>
          </List>

          <List>
            <ListItem key="主页" disablePadding>
              <ListItemButton onClick={() => goHome()}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="主页" />
              </ListItemButton>
            </ListItem>
          </List>

          <List>
            <span className="nav-tag">资料库</span>
            {["艺人", "专辑", "歌曲"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? <MicIcon /> : null}
                    {index === 1 ? <LibraryMusic /> : null}
                    {index === 2 ? <Audiotrack /> : null}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {/* <Divider /> */}
          <List>
            <span className="nav-tag">播放列表</span>
            {["所有播放列表", "ACG", "花有重开日，人无再少年"].map(
              (text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index === 0 ? <Apps /> : <QueueMusic />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Drawer>
      </Box>
    </div>
  );
}

export default Header;
