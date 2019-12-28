import { observable } from 'mobx';
import { client } from './service';

export enum Gender {
    Female,
    Male,
    Other
}

export enum GenderSymbol {
    Female = '♀',
    Male = '♂',
    Other = '?'
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

export class Session {
    @observable
    user: User = localStorage.account ? JSON.parse(localStorage.account) : {};

    constructor() {
        if (localStorage.token) this.getCurrentUser();
    }

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

        return this.getCurrentUser();
    }

    destroy() {
        delete localStorage.token;

        location.replace('/');
    }

    hasRole(...names: UserRole[]) {
        const { group } = this.user;

        return group ? names.includes(group) : false;
    }
}
