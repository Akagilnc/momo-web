import { request, PageData } from './service';

import { User } from './User';
import { Country, AvailableTime } from './Meta';

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

export function updateCoach(data: FormData) {
    data.set('available_times', data.getAll('available_times') + '');

    return request('/users/coaches/', 'POST', data);
}

export function getCoach(id: number): Promise<Coach> {
    return request(`/users/coaches/${id}/`);
}

export function getCoaches({ page = 1 } = {}): Promise<PageData<Coach>> {
    return request(
        '/users/coaches/?' +
            new URLSearchParams({
                page: page + ''
            })
    );
}
