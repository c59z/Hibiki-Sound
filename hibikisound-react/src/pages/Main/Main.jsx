import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import SearchPage from "./SearchPage/SearchPage";
import AlbumPage from "./AlbumPage/AlbumPage";
import ArtistPage from "./ArtistPage/ArtistPage";

import "./Main.css";

function Main() {
  return (
    <div id="Main">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/search" element={<SearchPage></SearchPage>}></Route>
        <Route path="/artist/:id" element={<ArtistPage></ArtistPage>}></Route>
        <Route path="/album/:id" element={<AlbumPage></AlbumPage>}></Route>
      </Routes>
    </div>
    // </BrowserRouter>
  );
}

export default Main;
