import { Divider, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArtistBox from "../../../components/ArtistBox/ArtistBox";
import AlbumBox from "../../../components/AlbumBox/AlbumBox";
import TrackBox from "../../../components/TrackBox/TrackBox";

import { request } from "../../../utils/request";
import "./SearchPage.css";

function SearchPage() {
  const [searchParams] = useSearchParams();

  const [songsList, setSongsList] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [artistsList, setArtistsList] = useState([]);

  // 获取路径中的关键字参数
  const keyWord = searchParams.get("key"); // 关键字
  const type = ["album", "artist", "track"]; // 可以搜索专辑和艺术家
  const market = "JP"; // 市场
  const limit = 5; // 最多获取5个
  const offset = 0; // 不分页

  useEffect(() => {
    request
      .get(
        `/search?q=${keyWord}&type=${type}&market=${market}&limit=${limit}&offset=${offset}`
      )
      .then((res) => {
        if (res.status === 200) {
          // console.log("搜索内容:");
          // console.log(res.data);

          setAlbumList(res.data.albums.items);
          setArtistsList(res.data.artists.items);
          setSongsList(res.data.tracks.items);
        }
      });
  }, [keyWord]);

  return (
    <div id="search-page">
      <h1>Search By {keyWord}</h1>
      <Divider />
      {/* 歌曲 */}
      <div className="ArtistBoxList">
        <h2>歌曲</h2>
        <Stack direction="row" spacing={2}>
          {songsList.map((item) => (
            <TrackBox key={item.id} value={item}></TrackBox>
          ))}
        </Stack>
      </div>
      {/* 歌手 */}
      <div className="ArtistBoxList">
        <h2>歌手</h2>
        <Stack direction="row" spacing={2}>
          {artistsList.map((item) => (
            <ArtistBox key={item.id} value={item}></ArtistBox>
          ))}
        </Stack>
      </div>
      {/* 专辑 */}
      <div className="ArtistBoxList">
        <h2>专辑</h2>
        <Stack direction="row" spacing={2}>
          {albumList.map((item) => (
            <AlbumBox key={item.id} value={item}></AlbumBox>
          ))}
        </Stack>
      </div>
    </div>
  );
}

export default SearchPage;
