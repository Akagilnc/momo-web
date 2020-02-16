import { client, PageData } from './service';

import { Coach } from './Coach';
import { Student } from './Student';

export interface Course {
    id: number;
    start_time: string;
    end_time: string;
    coach: Coach;
    kids: Student[];
}

export interface CourseFilter {
    available_time?: string;
    sex?: string;
    country?: string;
    [key: string]: string;
}

export async function getCourses(filter: CourseFilter = {}) {
    const { body } = await client.get<PageData<Course>>(
        '/users/courses/?' + new URLSearchParams(filter)
    );

    return body;
}

export function bookCourse(coach: number, available_time: number) {
    return client.post('/users/courses/', { coach, available_time });
}

export function cancelCourse(id: number) {
    return client.post(`/users/courses/${id}/unsubscribe/`);
}
