import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TrackList from "../../../components/TrackList/TrackList";

import { request } from "../../../utils/request";
import AlbumBox from "../../../components/AlbumBox/AlbumBox";

import "./ArtistPage.css";

function ArtistPage() {
  const { id } = useParams();

  const [artistInfo, setArtistInfo] = useState(null); // 艺术家信息
  const [hotSongList, setHotSongList] = useState([]); // 10个热门音乐
  // const [albumsInfo, setAlbumsInfo] = useState(null);
  const [total, setTotal] = useState(0);
  const [albumList, setAlbumList] = useState([]);
  const [offset, setOffset] = useState(0); // 控制分页

  const artist404 = "/img/person200p.png";
  const market = "JP";
  const limit = 10;

  // 获取艺术家信息
  useEffect(() => {
    // console.log("---------------");
    request.get(`/artists/${id}`).then((res) => {
      if (res.status === 200) {
        // console.log("艺术家页面 >>> 获取数据成功:");
        // console.log(res.data);

        setArtistInfo(res.data);
      }
    });
  }, [id]);

  // 获取这个艺术家的Top10歌曲
  useEffect(() => {
    // 清除上一个艺术家的专辑信息
    setAlbumList([]);
    setOffset(0);
    setArtistInfo(null);
    request.get(`/artists/${id}/top-tracks?market=${market}`).then((res) => {
      if (res.status === 200) {
        // console.log(res.data.tracks);

        setHotSongList(res.data.tracks);
      }
    });
  }, [id]);

  // 获取这个艺术家的专辑
  useEffect(() => {
    request
      .get(
        `artists/${id}/albums?market=${market}&offset=${offset}&limit=${limit}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          // console.log(res.data.items);
          setTotal(res.data.total);
          // setAlbumsInfo(res.data);
          setAlbumList((e) => [...albumList, ...res.data.items]);
        }
      });
  }, [offset]);

  // todo 如果还没加载出来就提示出来
  if (!artistInfo || !albumList) {
    return <div>Loading...</div>;
  }

  function showMoreAlbum() {
    if (offset < total) setOffset((e) => albumList.length);
  }

  return (
    <div id="artist-page">
      {/* 艺术家头部信息 */}
      <Stack direction="row" spacing={0}>
        <div
          className="artist-header"
          style={{
            backgroundImage: `url(${artistInfo.images ? artistInfo.images[0].url : artist404})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "300px",
          }}
        >
          <h1>{artistInfo.name}</h1>
          <h3>followers: {artistInfo.followers.total}</h3>
        </div>
      </Stack>
      {/* 人气曲 */}
      <div>
        <h1
          style={{
            marginTop: "1rem",
          }}
        >
          人气曲
        </h1>
        <TrackList value={hotSongList}></TrackList>
      </div>
      {/* 专辑 */}
      <>
        <h1
          style={{
            marginTop: "1rem",
          }}
        >
          专辑
        </h1>
        <Grid container spacing={2}>
          {albumList.map((item, index) => (
            <AlbumBox key={index} value={item}></AlbumBox>
          ))}
        </Grid>
        <div style={{ textAlign: "center" }}>
          {total > offset ? (
            <Button onClick={() => showMoreAlbum()} variant="outlined">
              显示更多
            </Button>
          ) : (
            <span>已经到底啦</span>
          )}
        </div>
      </>
    </div>
  );
}

export default ArtistPage;
