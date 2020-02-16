import { User } from './User';
import { Course } from './Course';
import { client, PageData } from './service';

export interface Student extends User {
    full_name: string;
    wechat_id: string;
    courses: Course[];
    status: boolean;
}

export async function updateStudent(data: FormData) {
    const id = data.get('id');

    if (!id) return (await client.post<Student>('/users/kids/', data)).body;

    if (!data.get('password')) data.delete('password');

    return (await client.patch<Student>(`/users/kids/${id}/`, data)).body;
}

export async function getStudent(id: number) {
    const { body } = await client.get<Student>(`/users/kids/${id}/`);

    return body;
}

export async function getStudents({ page = 1 } = {}) {
    const { body } = await client.get<PageData<Student>>(
        '/users/kids/?' +
            new URLSearchParams({
                page: page + ''
            })
    );

    return body;
}

export function toggleStudent(id: number) {
    return client.post(`/users/kids/${id}/change_activity/`);
}
