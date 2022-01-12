// create a legend for local storage keys
const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}

// creating object to hold token values and timestamps. If nothing in local storage then values should be "undefined"
const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}


const hasTokenExpired = () => {
    const {accessToken, timestamp, expireTime} = LOCALSTORAGE_VALUES;
    if(!accessToken || !timestamp){
        return false;
    }

    const timeElapsed = Date.now() - Number(timestamp);
    return (timeElapsed/1000) > Number(expireTime);
}


const getAccessToken = () => {
    //first get the query values from the url and store them in queryParams. If there is no query then the values should be undefined
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };

    const hasError = urlParams.get('error');

    //if there is an error or the access token has expired then refresh the access token.
    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken();
        return LOCALSTORAGE_VALUES.accessToken;
    }

    //if there is a valid access token in local storage then return that token to use
    if(LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined'){
        return LOCALSTORAGE_VALUES.accessToken;
    }

    // Otherwise the user is logging in for the first time and there are tokens in the query params.
    if(queryParams[LOCALSTORAGE_KEYS.accessToken]){
        for (const property in queryParams){
            window.localStorage.setItem(property, queryParams[property]);
        }

        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp,  Date.now());

        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    return false;

}

export const access_token = getAccessToken();