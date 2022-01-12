const LOCALSTORAGE_KEYS = {
    access_token: 'spotify_access_token',
    refresh_token: 'spotify_refresh_token',
    expire_time: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}

const LOCALSTORAGE_VALUES = {
    access_token: window.localStorage.getItem(LOCALSTORAGE_KEYS.access_token),
    refresh_token: window.localStorage.getItem(LOCALSTORAGE_KEYS.refresh_token),
    expire_time: window.localStorage.getItem(LOCALSTORAGE_KEYS.expire_time),
    timeStamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timeStamp),
}

const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)

    const access_token = urlParams.get('access_token')
    const refresh_token = urlParams.get('refresh_token')

    return access_token;
}

export const access_token = getAccessToken();