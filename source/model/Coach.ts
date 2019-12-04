import { client, PageData } from './service';

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

export async function updateCoach(data: FormData) {
    data.set('available_times', data.getAll('available_times') + '');

    const id = data.get('id');

    if (!id) return (await client.post<Coach>('/users/coaches/', data)).body;

    if (!(data.get('avatar') instanceof Blob)) data.delete('avatar');

    if (!data.get('password')) data.delete('password');

    return (await client.patch<Coach>(`/users/coaches/${id}/`, data)).body;
}

export async function getCoach(id: number) {
    const { body } = await client.get<Coach>(`/users/coaches/${id}/`);

    return body;
}

export async function getCoaches({ page = 1 } = {}) {
    const { body } = await client.get<PageData<Coach>>(
        '/users/coaches/?' +
            new URLSearchParams({
                page: page + ''
            })
    );

    return body;
}
