/**
 * DOCS https://oxidapi-skpamglgeq-ey.a.run.app/swagger-ui.html
 * API Endpoint https://oxidapi-skpamglgeq-ey.a.run.app/
  */
const apiPath = 'http://192.168.1.23:8010/proxy/';
const basePath = process.env.API_HOST || apiPath;
console.log('process.env.API_HOST', process.env.API_HOST);
console.log('basePath', process.env.API_HOST);
const baseOptions = {
    //mode: 'no-cors'
};
/**
 *
 * @param path
 * @param options
 * @returns {Promise<Response>}
 */
function call(path, options) {
    const url = `${basePath+path}${options && options.queryStr ? '?' + urlEncode(options.queryStr) : ''}`;
    return fetch(url, Object.assign(baseOptions, options))
        .catch((err) => handleConnectionError(err))
        .then(response => {
            console.log('Api.js', response);
            if (response.ok) {
                return response && response.json ? response.json() : {};
            } else {
                throw response;
            }
        });
}

/**
 * URL encode a JavaScript object. Arrays are encoded to multiples of the
 * same key, ex. { a: [ 1, 2 ] } => "a=1&a=2"
 */
function urlEncode(data) {
    return Object.keys(data)
        .sort()
        .reduce((acc, key) => {
            const value = data[key];
            return acc.concat(
                // If the value isn't mappable wrap it in a Array.
                (value && typeof value.map === 'function' ? value : [value]).map(
                    (v) => encodeURIComponent(key) + '=' + encodeURIComponent(v)
                )
            );
        }, [])
        .join('&');
};

function handleConnectionError(err) {
    console.error(`Failed to send fetch-request ${err}`);
}

export default call;