import { createCell, component, mixin } from 'web-cell';
import { FormField } from '../../component/Form';

@component({
    tagName: 'coach-profile-edit',
    renderTarget: 'children'
})
export default class CoachProfileEdit extends mixin() {
    render() {
        return (
            <form className="form p-3">
                <h2>Coach Profile</h2>

                <FormField name="name" required label="Name" />

                <FormField is="select" name="gender" required label="Gender">
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

                <FormField
                    type="tel"
                    name="telephone"
                    required
                    label="Telephone"
                />

                <FormField
                    is="select"
                    name="available_time"
                    required
                    label="Available time"
                />

                <input type="submit" className="btn btn-block btn-primary" />
                <input type="reset" className="btn btn-block btn-danger" />
            </form>
        );
    }
}
