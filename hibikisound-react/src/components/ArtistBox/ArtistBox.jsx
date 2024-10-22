import { useNavigate } from "react-router-dom";

import "./ArtistBox.css";

function ArtistBox(props) {
  const navigate = useNavigate();

  const artistsName = props.value.name;
  const artistsImgList = props.value.images;
  const artistsType = props.value.type;
  const id = props.value.id;

  const Artist404 = "/img/person200p.png";

  function goToArtist(id) {
    navigate(`/artist/${id}`);
  }

  return (
    <div className="ArtistBox">
      <div className="artist-icon">
        <img
          onClick={() => goToArtist(id)}
          src={artistsImgList.length ? artistsImgList[0].url : Artist404}
          alt=""
        />
      </div>
      <div onClick={() => goToArtist(id)} className="artist-name">
        {artistsName}
      </div>
      <div className="artist-category">{artistsType}</div>
    </div>
  );
}

export default ArtistBox;
