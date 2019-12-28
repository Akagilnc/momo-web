import { observable } from 'mobx';
import { client, PageData } from './service';

export interface Country {
    id: number;
    name: string;
}

export interface AvailableTime {
    id: number;
    day: number;
    start_time: string;
    end_time: string;
    max_kids: number;
    enabled?: boolean;
}

export class Meta {
    @observable
    countries: Country[] = [];

    @observable
    availableTimes: AvailableTime[] = [];

    constructor() {
        this.getCountries();
        this.getAvailableTimes();
    }

    async getCountries() {
        const {
            body: { results }
        } = await client.get<PageData<Country>>('/users/country/');

        return (this.countries = results);
    }

    async getAvailableTimes() {
        const {
            body: { results }
        } = await client.get<PageData<AvailableTime>>('/users/available-time/');

        return (this.availableTimes = results);
    }

    async addAvailableTime(data: FormData) {
        const { body } = await client.post<AvailableTime>(
            '/users/available-time/',
            data
        );

        this.availableTimes = this.availableTimes.concat(body);
    }

    async deleteAvailableTime(id: number) {
        await client.delete(`/users/available-time/${id}/`);

        this.availableTimes = this.availableTimes.filter(
            item => item.id === id
        );
    }
}
