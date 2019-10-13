import memoize from 'lodash.memoize';
import { request } from './service';

export enum Gender {
    female,
    male,
    other
}

export enum GenderSymbol {
    male = '♂',
    female = '♀',
    other = '?'
}

export interface User {
    id: number;
    age: number;
    sex: Gender;
    phone_num: string;
    group: UserRole;
}

export enum UserRole {
    Admin = 'Admin',
    Coach = 'Coach',
    Kid = 'Kid'
}

export async function createSession(account: FormData) {
    const { key } = await request('/rest-auth/login/', 'POST', account);

    localStorage.token = key;

    const user: User = await request('/users/get-current-user/');

    localStorage.account = JSON.stringify(user);

    return user;
}

export const getSession = memoize(
    (): User | null => localStorage.account && JSON.parse(localStorage.account)
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
