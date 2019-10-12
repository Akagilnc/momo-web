import memoize from 'lodash.memoize';

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
    method?: string,
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

export async function createSession(account: FormData) {
    const { key } = await request('/rest-auth/login/', 'POST', account);

    localStorage.token = key;
    localStorage.account = JSON.stringify(
        await request('/users/get-current-user/')
    );
}

export enum UserRole {
    admin = 'admin',
    coach = 'coach',
    student = 'student'
}

interface UserProfile {
    groups: UserRole[];
}

export const getSession = memoize(
    (): UserProfile | null =>
        localStorage.account && JSON.parse(localStorage.account)
);

export function destroySession() {
    localStorage.clear();

    location.replace('/');
}

export function hasRole(...names: UserRole[]) {
    const user = getSession();

    if (user)
        for (const role of names) if (user.groups.includes(role)) return true;

    return false;
}

export interface Country {
    id: number;
    name: string;
}

export async function getCountries(): Promise<Country[]> {
    const { results } = await request('/users/country/');

    return results;
}

export interface AvailableTime {
    id: number;
    start_time: string;
    end_time: string;
}

export async function getAvailableTimes(): Promise<AvailableTime[]> {
    const { results } = await request('/users/available-time/');

    return results;
}

export function updateCoach(data: FormData) {
    data.set('available_times', data.getAll('available_times') + '');

    return request('/users/coaches/', 'POST', data);
}
