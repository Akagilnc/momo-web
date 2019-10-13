import { createCell, component, mixin } from 'web-cell';

import style from './Profile.less';
import { session, Student, GenderSymbol } from '../../model';

@component({
    tagName: 'student-profile',
    renderTarget: 'children'
})
export class StudentProfile extends mixin() {
    render() {
        const { full_name, age, sex, phone_num } = session.user as Student;

        return (
            <main className="p-3">
                <ul class={`list-group p-3 ${style.container}`}>
                    <li class="list-group-item">{full_name}</li>
                    <li class="list-group-item">
                        年龄<span>{age}</span>
                    </li>
                    <li class="list-group-item">
                        性别<span>{GenderSymbol[sex]}</span>
                    </li>
                    <li class="list-group-item">
                        电话<span>{phone_num}</span>
                    </li>
                </ul>
                <a
                    className="btn btn-block btn-primary mt-3"
                    href="student/profile/edit"
                >
                    编辑
                </a>
            </main>
        );
    }
}
