import React, { useState, useRef } from 'react'
import './styles/app.scss'
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'
import data from './data'

function App() {
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  //player state
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })
  //ref
  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration })
  }

  //auto switch to next song after the current song reached the end
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    if (isPlaying) audioRef.current.play()

  }
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        isPlaying={isPlaying}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        onEnded={songEndHandler}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
