export const apiGet = (entity, params = {}) => {
    const url = makeAPIURL(entity, params);
    return addHandlers(fetch(url))
        .catch(ex => {
            console.log(ex);
            return Promise.reject(ex)
        });
};

export const apiPost = (entity, body = {}, params = {}) => {
    const url = makeAPIURL(entity, params);
    return addHandlers(fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
    })).catch(ex => Promise.reject(ex));
};

export const apiDelete = (entity, params = {}) => {
    const url = makeAPIURL(entity, params);
    return addHandlers(fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })).catch(ex => Promise.reject(ex));
};

const API_ROOT = 'http://127.0.0.1:8080';

const makeAPIURL = (url, params = {}) =>
    `${API_ROOT}/${url}${makeQueryString(params)}`;

const makeQueryString = (params = {}) => {
    const queryString = Object.entries(params).map(v => `${v[0]}=${v[1]}`).join('&');
    return queryString.length ? '?' + queryString : '';
};

const addHandlers = (promise, responseType = 'json') =>
    promise.then(response => {
        if (response.status === 200) {
            const resp = responseType === 'json'
                ? response.json()
                : response.text();
            return Promise.resolve(resp);
        } else {
            const err = new Error(`Server error: ${response.status}`);
            err.status = response.status;
            return Promise.reject(err);
        }
    });

