import { useNavigate } from "react-router-dom";

import "./AlbumBox.css";

function AlbumBox(props) {
  // console.log("AlbumBox获取数据:");
  // console.log(props);

  const navigate = useNavigate();

  const imgList = props.value.images;
  const title = props.value.name;
  const artists = props.value.artists;
  const id = props.value.id;

  const Album404 = "/img/Album200p.png";

  function goToAlbum(id) {
    navigate(`/album/${id}`);
  }

  return (
    <div className="AlbumBox">
      <div className="album-icon">
        <img
          onClick={() => goToAlbum(id)}
          src={imgList.length ? imgList[0].url : Album404}
          alt=""
        />
      </div>
      <div onClick={() => goToAlbum(id)} className="album-name">
        {title}
      </div>
      <div className="artist-name">{artists[0].name}</div>
    </div>
  );
}

export default AlbumBox;
