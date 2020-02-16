import { observable } from 'mobx';
import { History } from 'cell-router/source';

import { client } from './service';

export enum Gender {
    Female,
    Male,
    Other
}

export enum GenderSymbol {
    '♀',
    '♂',
    '?'
}

export enum UserRole {
    Admin = 'Admin',
    Coach = 'Coach',
    Kid = 'Kid'
}

export interface User {
    id?: number;
    username?: string;
    age: number;
    sex: Gender;
    phone_num: string;
    group?: UserRole;
}

export class Session extends History {
    @observable
    user: User = localStorage.account ? JSON.parse(localStorage.account) : {};

    async getCurrentUser() {
        const { body } = await client.get<User>('/users/get-current-user/');

        return (this.user = body);
    }

    async setCurrentUser(data: User) {
        this.user = { ...this.user, ...data };
    }

    async boot(account: FormData) {
        const {
            body: { key }
        } = await client.post('/rest-auth/login/', account);

        localStorage.token = key;

        const { group } = await this.getCurrentUser();

        this.push(group.toLowerCase(), group);
    }

    destroy() {
        delete localStorage.token;

        location.replace('/');
    }

    async init() {
        if (localStorage.token)
            try {
                await this.getCurrentUser();
            } catch {
                return this.destroy();
            }
        else return this.push('login');

        if (this.path) return;

        const { group } = this.user;

        this.push(group.toLowerCase(), group);
    }

    hasRole(...names: UserRole[]) {
        const { group } = this.user;

        return group ? names.includes(group) : false;
    }
}
