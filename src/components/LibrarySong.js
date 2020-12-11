import React from 'react';

const LibrarySong = ({ song, songs, setCurrentSong, audioRef, isPlaying, setSongs }) => {
    const { cover, name, artist } = song
    const songSelectHandler = async () => {
        await setCurrentSong(song)
        //Add active state(class)
        setSongs(
            songs.map((targetSong) => {
                return {
                    ...targetSong,
                    active: targetSong.id === song.id
                }
            }
            )
        )
        //check if the song is playing
        if (isPlaying) audioRef.current.play()
    }
    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active && "selected"}`}>
            <img src={cover} alt={name} />
            <div className="song-description">
                <h3>{name}</h3>
                <h4>{artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong
