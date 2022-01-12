// create a legend for local storage keys
const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}

const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.access_token),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refresh_token),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expire_time),
    timeStamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timeStamp),
}

const getAccessToken = () => {
    //first get the
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };

    const hasError = urlParams.get('error');

    if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken();
        return LOCALSTORAGE_VALUES.accessToken;
    }

    if(LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined'){
        return LOCALSTORAGE_VALUES.accessToken;
    }

    if(queryParams[LOCALSTORAGE_KEYS.accessToken]){

        for (const property in queryParams){
            window.localStorage.setItem(property, queryParams[property]);
        }

        window.localStorage.setItem(LOCALSTORAGE_KEYS.timeStamp, Date.now());

        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    return false;

}

export const access_token = getAccessToken();