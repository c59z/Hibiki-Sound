import Grid from "@mui/material/Grid2";
import Header from "./pages/Header/Header";
import Main from "./pages/Main/Main";
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import { useStore } from "./store/index";

function App() {
  const rootStore = useStore();

  rootStore.authenticationStore.getAuthentication();

  return (
    <div>
      <BrowserRouter>
        <Grid container spacing={0}>
          <Grid size={2.1}>
            {/* 左侧导航栏 */}
            <Header />
          </Grid>
          {/* 右边主要内容和播放进度条 */}
          <Grid size={9.9}>
            <Main />
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
