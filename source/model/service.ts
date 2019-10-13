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

export enum UserRole {
    Admin = 'Admin',
    Coach = 'Coach',
    Kid = 'Kid'
}

interface UserProfile {
    group: UserRole;
}

export async function createSession(account: FormData) {
    const { key } = await request('/rest-auth/login/', 'POST', account);

    const user: UserProfile = await request('/users/get-current-user/');

    localStorage.token = key;
    localStorage.account = JSON.stringify(user);

    return user;
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

    if (user) for (const role of names) if (user.group === role) return true;

    return false;
}

interface Data<T> {
    count: number;
    results: T[];
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

export enum GenderSymbol {
    male = '♂',
    female = '♀',
    other = '?'
}

export enum Gender {
    female,
    male,
    other
}

interface User {
    id: number;
    age: number;
    sex: Gender;
    phone_num: string;
}

export interface Coach extends User {
    first_name: string;
    last_name: string;
    avatar: string;
    country: Country;
    email: string;
    fav_topic: string;
    introduction: string;
    available_times: AvailableTime[];
}

export interface Student extends User {
    full_name: string;
    wechat_id: string;
}

export function getCoaches({ page = 1 } = {}): Promise<Data<Coach>> {
    return request(
        '/users/coaches/?' +
            new URLSearchParams({
                page: page + ''
            })
    );
}

export function updateStudent(data: FormData) {
    return request('/users/kids/', 'POST', data);
}

export function getStudents({ page = 1 } = {}): Promise<Data<Student>> {
    return request(
        '/users/kids/?' +
            new URLSearchParams({
                page: page + ''
            })
    );
}
