import { useEffect, useState } from "react";
// import { tempMovieData, tempWatchedData } from "./data";
import { NavBar, Logo, Search, NumResults } from "./NavBar";
import { MovieList } from "./ListBox";
import { WatchList, WatchedSummary } from "./WatchedBox";
import { MovieDetails } from "./MovieDetails";
import { KEY } from "./utils";
import { Loader, ErrorMessage } from "./Reusables";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)

  function handleSelectMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id)
  }

  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  useEffect(() => {
    const controller = new AbortController()
  
    async function fetchMovies() {
      try {
        setIsLoading(true)
        setError("")

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal})
        if (!res.ok) throw new Error('Something went wrong!')
  
        const data = await res.json()
        if (data.Response === 'False') throw new Error('Movie not found!')

        setMovies(data.Search)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setMovies([])
      setError('')
      return
    }

    fetchMovies()

    return () => {
      controller.abort()
    }
  }, [query])

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies}/>} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        {/* 

          Alternative to component compostion using elements instead of children

          <Box element={<MovieList movies={movies} />}>

          Then in the Box component, use element as a prop instead of children

          this is more explicit way and it is used in some React libraries (e.g. React Router)
        
        */}
        <Box>
          {
            selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} watched={watched}/> :
            <>
              <WatchedSummary watched={watched} />
              <WatchList watched={watched} onDeleteWatched={handleDeleteWatched}/>
            </>
          }
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
