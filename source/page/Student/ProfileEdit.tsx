import { createCell, component, mixin, watch } from 'web-cell';
import { FormField } from '../../component';

import { updateStudent, history } from '../../model';

@component({
    tagName: 'student-profile-edit',
    renderTarget: 'children'
})
export default class StudentProfileEdit extends mixin() {
    @watch
    loading = false;

    onSubmit = async (event: Event) => {
        event.preventDefault();

        this.loading = true;
        try {
            await updateStudent(new FormData(event.target as HTMLFormElement));

            history.push('login', 'Log in');
        } finally {
            this.loading = false;
        }
    };

    render() {
        const { loading } = this;

        return (
            <form
                className="form p-3"
                onReset={() => window.history.back()}
                onSubmit={this.onSubmit}
            >
                <h2>学生</h2>
                <fieldset disabled={loading}>
                    <legend>基本信息</legend>

                    <FormField name="full_name" required label="姓名" />

                    <FormField is="select" name="sex" required label="性别">
                        <option value="1">男</option>
                        <option value="0">女</option>
                        <option value="2">其它</option>
                    </FormField>

                    <FormField
                        type="number"
                        name="age"
                        required
                        label="年龄"
                        min="0"
                    />
                </fieldset>
                <fieldset disabled={loading}>
                    <legend>账号信息</legend>
                    <FormField
                        type="tel"
                        name="phone_num"
                        required
                        label="手机号"
                    />
                    <FormField
                        type="password"
                        name="password"
                        required
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
