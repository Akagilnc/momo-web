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

export async function getCourses() {
    const { body } = await client.get<PageData<Course>>('/users/courses/');

    return body;
}
