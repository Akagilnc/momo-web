import { client, PageData } from './service';

export interface Country {
    id: number;
    name: string;
}

export async function getCountries() {
    const {
        body: { results }
    } = await client.get<PageData<Country>>('/users/country/');

    return results;
}

export interface AvailableTime {
    id: number;
    day: number;
    start_time: string;
    end_time: string;
    max_kids: number;
    enabled?: boolean;
}

export async function addAvailableTime(data: FormData) {
    const { body } = await client.post<AvailableTime>(
        '/users/available-time/',
        data
    );

    return body;
}

export function deleteAvailableTime(id: number) {
    return client.delete(`/users/available-time/${id}/`);
}

export async function getAvailableTimes() {
    const {
        body: { results }
    } = await client.get<PageData<AvailableTime>>('/users/available-time/');

    return results;
}
