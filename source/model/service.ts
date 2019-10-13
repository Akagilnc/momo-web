function formToJSON(form: FormData) {
    const data = {};
    // @ts-ignore
    for (const key of Array.from(new Set(form.keys() as string[]))) {
        let item = form.getAll(key);

        data[key] = item[1] ? item : item[0];
    }

    return data;
}

export async function request(
    path: string,
    method?: RequestInit['method'],
    body?: FormData,
    headers: HeadersInit = {},
    options?: RequestInit
) {
    if (localStorage.token)
        headers = { Authorization: `token ${localStorage.token}`, ...headers };

    const response = await fetch(
        new URL(path, 'https://momochat-background.herokuapp.com') + '',
        {
            method,
            body:
                headers['Content-Type'] === 'application/json'
                    ? JSON.stringify(formToJSON(body))
                    : body,
            headers,
            ...options
        }
    );

    if (response.status > 299) {
        let error = await response.json();

        if (!error.detail)
            error = Object.entries(error)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');

        throw Object.assign(
            new URIError(error.detail || error || response.statusText),
            {
                response
            }
        );
    }

    switch ((response.headers.get('Content-Type') || '').split(';')[0]) {
        case 'application/json':
            return response.json();
        default:
            return response.blob();
    }
}

export interface PageData<T> {
    count: number;
    results: T[];
}
