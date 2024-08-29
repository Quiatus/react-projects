import { useState } from "react";
import { NavBar, Logo, Search, NumResults } from "./NavBar";
import { MovieList } from "./ListBox";
import { WatchList, WatchedSummary } from "./WatchedBox";
import { MovieDetails } from "./MovieDetails";
import { Loader, ErrorMessage } from "./Reusables";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)

  const {movies, isLoading, error} = useMovies(query)
  const [watched, setWatched] = useLocalStorageState([], 'watched')

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
