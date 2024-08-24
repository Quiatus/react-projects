import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";
import { NavBar, Logo, Search, NumResults } from "./NavBar";
import { MovieList } from "./ListBox";
import { WatchList, WatchedSummary } from "./WatchedBox";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies}/>
      </NavBar>

      <Main>
        <Box>
          <MovieList movies={movies}/>
        </Box>
        {/* 

          Alternative to component compostion using elements instead of children

          <Box element={<MovieList movies={movies} />}>

          Then in the Box component, use element as a prop instead of children

          this is more explicit way and it is used in some React libraries (e.g. React Router)
        
        */}
        <Box>
          <WatchedSummary watched={watched} />
          <WatchList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  )
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>{isOpen ? "–" : "+"}</button>
      {isOpen && children}
    </div>
  );
}
