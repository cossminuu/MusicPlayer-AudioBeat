import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const Nav = ({ setLibraryStatus, libraryStatus }) => {
    return (
        <nav>
            <img src="/logo.png" alt="logo" style={{ maxWidth: "50px" }}></img>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    )
}

export default Nav
