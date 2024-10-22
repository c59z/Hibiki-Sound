import "./PlayController.css";
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import { RepeatOne, Repeat, QueueMusic } from "@mui/icons-material";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

function PlayController() {
  // 是否点击了播放
  const [paused, setPaused] = useState(false);
  // 音量
  const [soundValue, setSoundValue] = useState(30);
  // 播放方式 true: 列表循环 ,false: 单曲播放
  const [playMethod, setPlayMethod] = useState(true);

  //  调整音量
  function handleSoundValueChange(e) {
    setSoundValue((s) => (s = e.target.value));
  }

  // 改变播放方式
  function changePlayMethod() {
    setPlayMethod((e) => !playMethod);
  }

  return (
    <div className="play-controller">
      <Grid container spacing={3}>
        <Grid size="auto">
          {/* 切换上下歌曲以及播放方式 */}
          <div className="playback-controls">
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: -1,
                "& svg": {
                  color: "#000",
                  ...theme.applyStyles("dark", {
                    color: "#fff",
                  }),
                },
              })}
            >
              {/* 单曲循环 与 列表循环播放 */}
              <IconButton
                onClick={() => changePlayMethod()}
                aria-label="next song"
              >
                {playMethod ? <Repeat /> : <RepeatOne />}
              </IconButton>
              <IconButton aria-label="previous song">
                <FastRewindRounded fontSize="large" />
              </IconButton>
              <IconButton
                aria-label={paused ? "play" : "pause"}
                onClick={() => setPaused(!paused)}
              >
                {paused ? (
                  <PlayArrowRounded sx={{ fontSize: "2rem" }} />
                ) : (
                  <PauseRounded sx={{ fontSize: "2rem" }} />
                )}
              </IconButton>
              <IconButton aria-label="next song">
                <FastForwardRounded fontSize="large" />
              </IconButton>
              {/* 是否显示播放列表 */}
              <IconButton aria-label="next song">
                {/* 可以使用style={{color: "skyblue"}} 调整图标颜色 */}
                <QueueMusic />
              </IconButton>
            </Box>
          </div>
        </Grid>
        <Grid size={7}>
          {/* 歌曲信息 */}{" "}
          <div className="player-main">
            <img className="cover-img" src="/cover88.jpg" alt="" />{" "}
            <span className="song-info">
              {" "}
              <span style={{ fontWeight: "bold", fontSize: "14px" }}>
                Hands Up to the Sky (feat. Laco){" "}
              </span>
              <br />{" "}
              <span style={{ color: "#ada7a7", fontSize: "14px" }}>
                {"SawanoHiroyuki[nZk]" +
                  " - " +
                  "Avid / Hands Up to the Sky - EP"}{" "}
              </span>
              <div className="progress-bar-div"></div>{" "}
            </span>{" "}
          </div>
        </Grid>
        <Grid xs="2">
          <div className="player-sound">
            <Stack
              spacing={1}
              direction="row"
              sx={{
                alignItems: "center",
                mb: 1,
                marginBottom: "0",
                paddingTop: "8px",
              }}
            >
              <VolumeDown />
              <Slider
                aria-label="Volume"
                value={soundValue}
                onChange={handleSoundValueChange}
              />
              <VolumeUp />
            </Stack>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PlayController;
