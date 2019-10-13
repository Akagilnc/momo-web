import { User } from './User';
import { request, PageData } from './service';

export interface Student extends User {
    full_name: string;
    wechat_id: string;
}

export function updateStudent(data: FormData) {
    return request('/users/kids/', 'POST', data);
}

export function getStudents({ page = 1 } = {}): Promise<PageData<Student>> {
    return request(
        '/users/kids/?' +
            new URLSearchParams({
                page: page + ''
            })
    );
}
