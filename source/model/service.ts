import { HTTPClient } from 'koajax';

export function formToJSON(form: FormData) {
    const data = {};
    // @ts-ignore
    for (const key of Array.from(new Set(form.keys() as string[]))) {
        let item = form.getAll(key);

        data[key] = item[1] ? item : item[0];
    }

    return data;
}

export const client = new HTTPClient({
    baseURI: 'https://momochat-background.herokuapp.com',
    responseType: 'json'
});

let token = localStorage.token;

client.use(async ({ request: { method, path, headers }, response }, next) => {
    if (token) headers['Authorization'] = 'token ' + token;

    try {
        await next();
    } catch ({ body: error, statusText, ...rest }) {
        if (!error.detail)
            error = Object.entries(error)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');

        throw Object.assign(new URIError(error.detail || error || statusText), {
            statusText,
            ...rest,
            error
        });
    }

    if (method === 'POST' && (path + '').startsWith('/rest-auth/login/'))
        localStorage.token = token = response.body.key;
});

export interface PageFilter {
    page?: string;
}

export interface PageData<T> {
    count: number;
    results: T[];
}
