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
  const [error, setError] = useState("")

  const query = 'Fuckoffguysgoodday'

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true)

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
        if (!res.ok) throw new Error('Something went wrong!')
  
        const data = await res.json()
        if (data.Response === 'False') throw new Error('Movie not found!')

        setMovies(data.Search)
      } catch (err) {
        console.error(err.message)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
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
          {/* {isLoading ? <Loader /> : <MovieList movies={movies}/>} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies}/>}
          {error && <ErrorMessage message={error} />}
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

function ErrorMessage({message}) {
  return <p className="error">{message}</p>
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
