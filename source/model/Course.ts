import { request, PageData } from './service';

import { Coach } from './Coach';
import { Student } from './Student';

export interface Course {
    id: number;
    start_time: string;
    end_time: string;
    coach: Coach;
    kids: Student[];
}

export function getCourses(): Promise<PageData<Course>> {
    return request('/users/courses/');
}
