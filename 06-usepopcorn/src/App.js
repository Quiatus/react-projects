import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";
import { NavBar, Logo, Search, NumResults } from "./NavBar";
import { MovieList } from "./ListBox";
import { WatchList, WatchedSummary } from "./WatchedBox";
import { KEY } from "./utils";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=rings`)
      const data = await res.json()
      setMovies(data.Search)
      setIsLoading(false)
    }

    fetchMovies()
  }, [])

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies}/>
      </NavBar>

      <Main>
        <Box>
          {isLoading ? <Loader /> : <MovieList movies={movies}/>}
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

function Loader(){
  return <p className="loader">Loading...</p>
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
