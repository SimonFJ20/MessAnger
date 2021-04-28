/* HTTP request */

/**
 * Execute HTTP GET request, with fetch api as JSON.
 * @param {string} url - For local location use `/path/location`, for outside location use `http(s)://yourURL/location`
 * @param {(response: object) => void} callback - Callback function for handling the response
 * @param {object} data - Optional, parse a JavaScript object as requst body
 */

 export const hostname = 'http://172.16.115.168:80'

 export const get = (url: string, callback: (response: object, error?: boolean) => void, data?: object): void => {
    
    // setting up request and body

    const body = JSON.stringify(data);

    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    headers.append("Data-Body", body)


    const options: RequestInit = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    }

    // maximum error handling to maintain stability
    try {

        // execute request, follows redirects, expects json
        fetch(url, options)
            .then(body => body.json())
            .then(response => callback(response))
            .catch(error => callback(error, true));

    } catch(error) {
        callback(error, true);
    }

}


/**
 * Execute HTTP GET request, with fetch api as JSON.
 * @param {string} url - Url relative to root, for outside use `http(s)://`
 * @param {object} data - Parse a JavaScript object as requst body
 * @param {(response: object) => void} callback - Callback function for handling the response
 */

export const post = (url: string, data: object, callback: (response: object, error?: boolean) => void) => {
    
    // setting up request and body

    const body = JSON.stringify(data);

    const headers = new Headers();

    headers.append("Content-Type", "application/json");



    // maximum error handling to maintain stability
    try {

        // execute request, follows redirects, expects json
        fetch(url, {method: 'POST', headers: headers, body: body, redirect: 'follow'})
            .then(body => body.json())
            .then(response => callback(response))
            .catch(error => callback(error, true));

    } catch(error) {
        callback(error, true);
    }

}