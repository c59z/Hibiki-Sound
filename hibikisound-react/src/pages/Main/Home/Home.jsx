import { Divider, Stack } from "@mui/material";
import ArtistBox from "../../../components/ArtistBox/ArtistBox";
import AlbumBox from "../../../components/AlbumBox/AlbumBox";

import { useEffect, useState } from "react";

import "./Home.css";
import { request } from "../../../utils/request";

function Home() {
  const [albumList, setAlbumList] = useState([]);
  const [artistsList, setArtistsList] = useState([]);

  // 获取专辑
  useEffect(() => {
    request.get("/browse/new-releases?offset=15&limit=5").then((res) => {
      if (res.status === 200) {
        // console.log(res.data.albums.items);
        setAlbumList(res.data.albums.items);
      }
    });
  }, []);

  useEffect(() => {
    // 固定数据
    request
      .get(
        "/artists?ids=34QbYbTlUCLkZsQ8QmacV9,1KXJUpTiNeMv93LrJbbm7G,2EWXgN0xWOnbqJOxa9pWNO,3X1afU2VL6MV0AJacARH7T,38WbKH6oKAZskBhqDFA8Uj"
      )
      .then((res) => {
        if (res.status === 200) {
          // console.log("歌手信息");
          // console.log(res.data.artists);
          setArtistsList(res.data.artists);
        }
      });
  }, []);

  return (
    <div className="Home">
      <h1>Home</h1>
      <Divider />
      {/* 人气歌手 */}
      <div className="ArtistBoxList">
        <h2>人气歌手</h2>
        <Stack direction="row" spacing={2}>
          {artistsList.map((item) => (
            <ArtistBox key={item.id} value={item}></ArtistBox>
          ))}
        </Stack>
      </div>
      {/* 人气专辑 */}
      <div className="ArtistBoxList">
        <h2>人气专辑</h2>
        <Stack direction="row" spacing={2}>
          {albumList.map((item) => (
            <AlbumBox key={item.id} value={item}></AlbumBox>
          ))}
        </Stack>
      </div>
    </div>
  );
}

export default Home;
