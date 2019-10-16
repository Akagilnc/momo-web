import { request } from './service';

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
    day: number;
    start_time: string;
    end_time: string;
    max_kids: number;
    enabled?: boolean;
}

export function addAvailableTime(data: FormData): Promise<AvailableTime> {
    return request('/users/available-time/', 'POST', data);
}

export function deleteAvailableTime(id: number) {
    return request(`/users/available-time/${id}/`, 'DELETE');
}

export async function getAvailableTimes(): Promise<AvailableTime[]> {
    const { results } = await request('/users/available-time/');

    return results;
}
