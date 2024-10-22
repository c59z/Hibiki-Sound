import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { request } from "../../../utils/request";
import TrackList from "../../../components/TrackList/TrackList";

import "./AlbumPage.css";

function AlbumPage() {
  const { id } = useParams();

  const [albumInfo, setAlbumInfo] = useState(null);
  const [songsList, setSongsList] = useState([]);

  const market = "JP";

  const album404 = "/img/Album200p.png";

  useEffect(() => {
    request
      .get(`/albums/${id}?market=${market}`)
      .then((res) => {
        if (res.status === 200) {
          // console.log("获取专辑信息成功");
          // console.log(res.data);
          setAlbumInfo(res.data);
          setSongsList(res.data.tracks.items);
        }
      })
      .catch((err) => {
        console.log("获取专辑信息失败");
        console.log(err);
      });
  }, [id]);

  // todo 如果还没加载出来就提示出来
  if (!albumInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div id="album-page">
      <div className="album-top">
        <div className="album-image">
          <img
            src={albumInfo.images.length ? albumInfo.images[0].url : album404}
            alt=""
          />
        </div>
        <div className="album-base-info">
          {/* 专辑名称 */}
          <h2 className="album-info-name">{albumInfo.name}</h2>
          <div className="artist-list">
            {/* 艺术家名称 */}
            <span className="artist-info-name">
              {albumInfo.artists[0].name}
            </span>
            {/* <span className="artist-name">{albumInfo.artists[0].name}</span> */}
          </div>
          {/* 日期 */}
          <span className="album-date">{albumInfo.release_date}</span>
        </div>
      </div>
      <div className="songs-list">
        {/* TODO 歌曲列表 */}
        <TrackList value={songsList}></TrackList>
      </div>
    </div>
  );
}

export default AlbumPage;
