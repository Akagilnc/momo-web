import { User } from './User';
import { request, PageData } from './service';

export interface Student extends User {
    full_name: string;
    wechat_id: string;
}

export function updateStudent(data: FormData) {
    const id = data.get('id');

    if (!id) return request('/users/kids/', 'POST', data);

    if (!data.get('password')) data.delete('password');

    return request(`/users/kids/${id}/`, 'PATCH', data);
}

export function getStudent(id: number): Promise<Student> {
    return request(`/users/kids/${id}/`);
}

export function getStudents({ page = 1 } = {}): Promise<PageData<Student>> {
    return request(
        '/users/kids/?' +
            new URLSearchParams({
                page: page + ''
            })
    );
}
