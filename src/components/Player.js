import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBackward, faForward, faPause, faVolumeUp, faVolumeDown } from '@fortawesome/free-solid-svg-icons'


const Player = ({ songInfo, setSongInfo, audioRef, currentSong, setCurrentSong, isPlaying, setIsPlaying, songs, setSongs }) => {
    const [volume, setVolume] = useState(0.7)
    const activeLibraryHandler = (nextPrev) => {
        setSongs(
            songs.map((targetSong) => {
                return {
                    ...targetSong,
                    active: targetSong.id === nextPrev.id
                }
            }
            )
        )
    }
    //event handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying)
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying)
        }
    }

    const getTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        const secondsWithZero = String(seconds).padStart(2, "0")
        return `${minutes}:${secondsWithZero}`
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }
    const volumeHandler = (e) => {
        audioRef.current.volume = e.target.value
        setVolume(e.target.value)
    }


    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id)
        if (direction === "skip-forward") {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
        }
        if (direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1])
                activeLibraryHandler(songs[songs.length - 1])
                if (isPlaying) audioRef.current.play()
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length])
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
        }
        if (isPlaying) audioRef.current.play()
    }


    //calculate percentage
    const animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;
    const volumePercentage = volume * 100;

    //Add the styles
    const trackAnim = {
        transform: `translateX(${animationPercentage}%)`
    }
    const volumeAnim = {
        transform: `translateX(${volumePercentage}%)`
    }

    return (
        <div className="player">
            <div className="volume-control">
                <FontAwesomeIcon size="1x" icon={faVolumeDown} />
                <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})` }} className="volume">
                    <input min={0} max={1} step={0.05} onChange={volumeHandler} type="range" />
                    <div style={volumeAnim} className="animate-track"></div>
                </div>
                <FontAwesomeIcon size="1x" icon={faVolumeUp} />
            </div>

            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})` }} className="track">
                    <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} type="range" />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{getTime(songInfo.duration || 0)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faBackward} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faForward} />
            </div>


        </div>
    )
}

export default Player
