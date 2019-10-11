import { createCell, component, mixin } from 'web-cell';
import { FormField, FileInput } from '../../component';

@component({
    tagName: 'coach-profile-edit',
    renderTarget: 'children'
})
export default class CoachProfileEdit extends mixin() {
    render() {
        return (
            <form className="form p-3" onReset={() => history.back()}>
                <h2>Coach</h2>
                <fieldset>
                    <legend>Profile</legend>

                    <FormField name="first_name" required label="First name" />
                    <FormField name="last_name" required label="Last name" />

                    <FormField is="select" name="sex" required label="Gender">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </FormField>

                    <FormField
                        type="number"
                        name="age"
                        required
                        label="Age"
                        min="0"
                    />
                    <FormField name="country" required label="Country" />

                    <FormField label="Avatar">
                        <FileInput name="avatar" required />
                    </FormField>

                    <FormField
                        is="textarea"
                        name="introduction"
                        label="Introduction"
                    />
                </fieldset>
                <fieldset>
                    <legend>Lesson</legend>
                    <FormField
                        is="select"
                        name="available_time"
                        required
                        multiple
                        label="Available time"
                    />
                    <FormField
                        name="fav_topic"
                        required
                        label="Favorite topic"
                    />
                </fieldset>
                <fieldset>
                    <legend>Account</legend>
                    <FormField
                        type="tel"
                        name="phone_num"
                        required
                        label="Telephone"
                    />
                    <FormField
                        type="email"
                        name="email"
                        required
                        label="Email"
                    />
                    <FormField
                        type="password"
                        name="password"
                        required
                        label="Password"
                    />
                </fieldset>
                <input type="submit" className="btn btn-block btn-primary" />
                <input type="reset" className="btn btn-block btn-danger" />
            </form>
        );
    }
}
