import {useEffect, useState} from 'react'
import {access_token} from './spotify'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  const [token, setToken] = useState(null);
  useEffect( () => {
    setToken(access_token);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
            <a
                className="App-link"
                href="http://localhost:8888/login"
            >
              Log in to Spotify
            </a>
        ): (
            <h1>
              Logged in!!
            </h1>
        ) }
      </header>
    </div>
  );
}

export default App;
