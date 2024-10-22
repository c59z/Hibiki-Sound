import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { PlayArrowRounded } from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

import "./TrackList.css";
import { useState } from "react";
import { IconButton } from "@mui/material";

function TrackList({ value }) {
  // console.log(value);

  const track404 = "/img/music_note_200p.png";

  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);

  const convertMilliseconds = (ms) => {
    const seconds = Math.floor(ms / 1000); // 把毫秒转成秒
    const minutes = Math.floor(seconds / 60); // 计算分钟数
    const remainingSeconds = seconds % 60; // 计算剩余的秒数

    return `${minutes} : ${remainingSeconds} `;
  };

  function goToArtist(id) {
    navigate(`/artist/${id}`);
  }

  function playThisTrack(id) {
    // todo 获取音频数据，把数据传到Header组件中
    console.log(id);
  }

  return (
    <div className="track-list">
      <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="track-list">
          <TableBody>
            {value.map((row, index) => (
              <TableRow
                onDoubleClick={() => playThisTrack(row.id)}
                onMouseEnter={() => setHoverIndex((e) => index + 1)}
                onMouseLeave={() => setHoverIndex(null)}
                className="track-row"
                key={row.id} // 歌曲的id作为key，播放的时候应该可以直接获取对应id的
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#1f1f1f" }, // 奇数列背景颜色
                  "&:nth-of-type(even)": { backgroundColor: "#1b1b1b" }, // 偶数列背景颜色
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                {/* TODO 当鼠标指到这一行的时候这个歌曲编号变为播放按钮 */}
                <TableCell align="center" style={{ position: "relative" }}>
                  {hoverIndex === index + 1 ? (
                    <div>
                      <PlayArrowRounded
                        onClick={() => playThisTrack(row.id)}
                        className="play-this-track-icons"
                        sx={{
                          position: "absolute", // 使用绝对定位
                          top: "50%", // 垂直居中
                          left: "50%", // 水平居中
                          transform: "translate(-50%, -50%)", // 使图标完全居中
                          fontSize: "2rem",
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <span
                        style={{
                          position: "absolute", // 使用绝对定位
                          top: "50%", // 垂直居中
                          left: "50%", // 水平居中
                          transform: "translate(-50%, -50%)", // 使图标完全居中
                          // fontSize: "2rem",
                        }}
                      >
                        {index + 1}
                      </span>
                    </>
                  )}
                </TableCell>
                <TableCell sx={{ padding: "8px" }} component="th" scope="row">
                  <div className="track-list-album-image">
                    {/* 为什么要这样写？ */}
                    {/* 因为如果是从专辑跳转过来的话，是获取不到专辑封面的，而且，同一个专辑的封面都是一个，不需要每一个都添加专辑封面 */}
                    {row?.album?.images?.length > 0 ? (
                      <img
                        src={row.album.images[0].url}
                        className="track-list-album-image"
                        alt=""
                      />
                    ) : (
                      <img
                        src={track404}
                        className="track-list-album-image"
                        alt=""
                      />
                    )}
                  </div>
                  <span className="track-title">{row.name}</span>
                </TableCell>
                <TableCell className="track-artist-area">
                  {row.artists.map((item, index) => (
                    <span key={index}>
                      <span
                        key={index}
                        className="track-artist"
                        onClick={() => goToArtist(item.id)}
                      >
                        {item.name}
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  ))}
                </TableCell>
                <TableCell>{convertMilliseconds(row.duration_ms)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TrackList;
