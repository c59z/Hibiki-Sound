import { AppBar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PlayController from "./PlayController/PlayController";
import OptionsBar from "./OptionsBar/OptionsBar";

// <AppBar
//   position="fixed"
//   sx={{
//     width: `calc(100% - ${drawerWidth}px)`,
//     ml: `${drawerWidth}px`,
//   }}
// >
//   <Toolbar>
//     <Typography variant="h6" noWrap component="div">
//       播放器组件
//     </Typography>
//   </Toolbar>
// </AppBar> */

// width : 18%
function PlayerBar({ width }) {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${18}%)`,
          ml: `${18}%`,
        }}
      >
        <Grid container spacing={2}>
          <Grid size={11}>
            <PlayController></PlayController>
          </Grid>
          <Grid size={1}>
            <OptionsBar></OptionsBar>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}

export default PlayerBar;
