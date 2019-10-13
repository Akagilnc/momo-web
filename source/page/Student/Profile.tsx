import { createCell, component, mixin, watch } from 'web-cell';

import style from './Profile.less';
import { session, Student, getStudent, GenderSymbol } from '../../model';

@component({
    tagName: 'student-profile',
    renderTarget: 'children'
})
export class StudentProfile extends mixin() {
    @watch
    fields: Student = {} as Student;

    async connectedCallback() {
        const { id } = session.user;

        if (id) this.fields = await getStudent(id);
    }

    render() {
        const { full_name, age, sex, phone_num } = this.fields;

        return (
            <ul class={`list-group p-3 ${style.container}`}>
                <li class="list-group-item">{full_name}</li>
                <li class="list-group-item">
                    Age<span>{age}</span>
                </li>
                <li class="list-group-item">
                    Gender<span>{GenderSymbol[sex]}</span>
                </li>
                <li class="list-group-item">
                    Phone<span>{phone_num}</span>
                </li>
            </ul>
        );
    }
}
