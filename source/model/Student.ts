import { User } from './User';
import { request, PageData } from './service';

export interface Student extends User {
    full_name: string;
    wechat_id: string;
}

export function updateStudent(data: FormData) {
    const id = data.get('id');

    return id
        ? request(`/users/kids/${id}/`, 'PUT', data)
        : request('/users/kids/', 'POST', data);
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
