import {useEffect} from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect( () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)

    const access_token = urlParams.get('access_token')
    const refresh_token = urlParams.get('refresh_token')

    console.log("I am access token ", access_token)
    console.log("I am refresh token", refresh_token)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:8888/login"
        >
          Login to Spotify
        </a>
      </header>
    </div>
  );
}

export default App;
