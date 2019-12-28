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
