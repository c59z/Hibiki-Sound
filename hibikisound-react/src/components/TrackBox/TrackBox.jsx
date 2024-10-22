import { useNavigate } from "react-router-dom";

import "./TrackBox.css";

function TrackBox(props) {
  // console.log("歌曲信息:");
  // console.log(props);

  const navigate = useNavigate();

  const songName = props.value.name; // 歌曲名称
  const albumImgList = props.value.album.images; // 专辑图片列表
  const artistsList = props.value.artists; // 艺术家名称
  const id = props.value.id; // 歌曲ID

  const Artist404 = "/img/Album200p.png";

  function goToArtist(id) {
    navigate(`/artist/${id}`);
  }

  return (
    <div className="ArtistBox">
      <div className="album-icon">
        <img
          src={albumImgList.length ? albumImgList[0].url : Artist404}
          alt=""
        />
      </div>
      <div className="track-name">{songName}</div>
      <div className="artist-list">
        {/* 艺术家名称 */}
        <span
          onClick={() => goToArtist(artistsList[0].id)}
          className="artist-name"
        >
          {artistsList[0].name}
        </span>
        {/* <span className="artist-name">{albumInfo.artists[0].name}</span> */}
      </div>
    </div>
  );
}

export default TrackBox;
