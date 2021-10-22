/**
 * DOCS https://oxidapi-skpamglgeq-ey.a.run.app/swagger-ui.html
 * API Endpoint https://oxidapi-skpamglgeq-ey.a.run.app/
 * ( GCP Proxy http://35.232.164.134:8010/proxy/ )
  */
const apiPath = 'https://oxidapi-skpamglgeq-ey.a.run.app/';
const basePath = process.env.API_HOST || apiPath;
console.log('basePath', basePath);
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