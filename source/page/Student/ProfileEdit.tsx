import { createCell, component, mixin, watch } from 'web-cell';
import { FormField } from 'boot-cell/source/Form/FormField';

import { updateStudent, history, session, Student } from '../../model';

@component({
    tagName: 'student-profile-edit',
    renderTarget: 'children'
})
export class StudentProfileEdit extends mixin() {
    @watch
    loading = false;

    onSubmit = async (event: Event) => {
        event.preventDefault();

        const data = new FormData(event.target as HTMLFormElement);

        this.loading = true;
        try {
            session.setCurrentUser(await updateStudent(data));

            if (!data.get('id')) history.push('login', 'Log in');
            else history.push('student', 'Student Profile');
        } finally {
            this.loading = false;
        }
    };

    render() {
        const { loading } = this,
            { id, full_name, sex, age, phone_num } = session.user as Student;

        return (
            <form
                className="form p-3"
                onReset={() => window.history.back()}
                onSubmit={this.onSubmit}
            >
                {id && <input type="hidden" name="id" value={id} />}

                <h2>学生</h2>
                <fieldset disabled={loading}>
                    <legend>基本信息</legend>

                    <FormField
                        name="full_name"
                        required
                        label="姓名"
                        defaultValue={full_name}
                    />
                    <FormField is="select" name="sex" required label="性别">
                        <option value="0" selected={sex === 0}>
                            女
                        </option>
                        <option value="1" selected={sex === 1}>
                            男
                        </option>
                        <option value="2" selected={sex === 2}>
                            其它
                        </option>
                    </FormField>

                    <FormField
                        type="number"
                        name="age"
                        required
                        label="年龄"
                        min="0"
                        defaultValue={age + ''}
                    />
                </fieldset>
                <fieldset disabled={loading}>
                    <legend>账号信息</legend>
                    <FormField
                        type="tel"
                        name="phone_num"
                        required
                        label="手机号"
                        defaultValue={phone_num}
                    />
                    <FormField
                        type="password"
                        name="password"
                        required={!id}
                        label="密码"
                    />
                </fieldset>

                <input
                    type="submit"
                    className="btn btn-block btn-primary"
                    disabled={loading}
                />
                <input type="reset" className="btn btn-block btn-danger" />
            </form>
        );
    }
}
