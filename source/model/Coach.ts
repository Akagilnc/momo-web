import { client, PageFilter, PageData } from './service';

import { User } from './User';
import { Country, AvailableTime } from './Meta';
import { Course } from './Course';

export interface Coach extends User {
    first_name: string;
    last_name: string;
    avatar: string;
    country: Country;
    email: string;
    fav_topic: string;
    introduction: string;
    available_times: AvailableTime[];
    courses?: Course[];
    status?: boolean;
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

export interface CoachFilter extends PageFilter {
    available_time?: string;
    sex?: string;
    country?: string;
    [key: string]: string;
}

export async function getCoaches(filter: CoachFilter = {}) {
    const { body } = await client.get<PageData<Coach>>(
        '/users/coaches/?' + new URLSearchParams(filter)
    );

    return body;
}

export function verifyCoach(id: number) {
    return client.post(`/users/coaches/${id}/change_activity/`);
}

export function rejectCoach(id: number) {
    return client.post(`/users/coaches/${id}/reject/`);
}
