import axios from "axios";

require('dotenv').config();
const express = require('express');
const querystring = require('querystring');
const port = 8888;
const axios = require('axios')

const app = express();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI

app.get('/', (req, res) => {
    const data = {
        name: "son",
        isAwesome: true
    }
    res.json(data);
})

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';


app.get('/login', (req, res) => {
    const state = generateRandomString(16)
    res.cookie(stateKey, state)

    const scope = 'user-read-private user-read-email'

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type:'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope,
    })
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
})

app.get('/callback', (req,res) => {
    res.send('callback')
})

app.listen(port, () => {
    console.log(`server listening on port ` + port + `at http://localhost:${port}`)
});
