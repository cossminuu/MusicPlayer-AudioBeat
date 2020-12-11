import React from 'react'

const Song = ({ currentSong, isPlaying }) => {
    const { cover, name, artist } = currentSong

    return (
        <div className="song-container">
            <img className={isPlaying ? "play-effect" : ""} src={cover} alt={name} />
            <h2>{name}</h2>
            <h3>{artist}</h3>
        </div>
    )
}

export default Song
