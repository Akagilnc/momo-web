import { observable } from 'mobx';
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

export class Session {
    @observable
    user: User = localStorage.account ? JSON.parse(localStorage.account) : {};

    async boot(account: FormData) {
        const { key } = await request('/rest-auth/login/', 'POST', account);

        localStorage.token = key;

        const user: User = await request('/users/get-current-user/');

        localStorage.account = JSON.stringify(user);

        return (this.user = user);
    }

    destroy() {
        localStorage.clear();

        location.replace('/');
    }

    hasRole(...names: UserRole[]) {
        const { group } = this.user;

        if (group) for (const role of names) if (group === role) return true;

        return false;
    }
}
