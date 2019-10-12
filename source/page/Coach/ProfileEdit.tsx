import { createCell, component, mixin, watch } from 'web-cell';
import { FormField, FileInput } from '../../component';

import {
    Country,
    getCountries,
    AvailableTime,
    getAvailableTimes,
    updateCoach,
    history
} from '../../model';

@component({
    tagName: 'coach-profile-edit',
    renderTarget: 'children'
})
export default class CoachProfileEdit extends mixin() {
    @watch
    loading = false;

    @watch
    countries: Country[] = [];

    @watch
    availableTimes: AvailableTime[] = [];

    async connectedCallback() {
        this.loading = true;

        this.countries = await getCountries();
        this.availableTimes = await getAvailableTimes();

        this.loading = false;
    }

    onSubmit = async (event: Event) => {
        event.preventDefault();

        this.loading = true;
        try {
            await updateCoach(new FormData(event.target as HTMLFormElement));

            history.push('login', 'Log in');
        } finally {
            this.loading = false;
        }
    };

    render() {
        const { loading, countries, availableTimes } = this;

        return (
            <form
                className="form p-3"
                onReset={() => window.history.back()}
                onSubmit={this.onSubmit}
            >
                <h2>Coach</h2>
                <fieldset disabled={loading}>
                    <legend>Profile</legend>

                    <FormField name="first_name" required label="First name" />
                    <FormField name="last_name" required label="Last name" />

                    <FormField is="select" name="sex" required label="Gender">
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                        <option value="2">Other</option>
                    </FormField>

                    <FormField
                        type="number"
                        name="age"
                        required
                        label="Age"
                        min="0"
                    />
                    <FormField
                        is="select"
                        name="country"
                        required
                        label="Country"
                    >
                        {countries.map(({ id, name }) => (
                            <option value={id}>{name}</option>
                        ))}
                    </FormField>

                    <FormField label="Avatar">
                        <FileInput name="avatar" required />
                    </FormField>

                    <FormField
                        is="textarea"
                        name="introduction"
                        required
                        label="Introduction"
                    />
                </fieldset>
                <fieldset disabled={loading}>
                    <legend>Lesson</legend>
                    <FormField
                        is="select"
                        name="available_times"
                        required
                        multiple
                        label="Available time"
                    >
                        {availableTimes.map(({ id, start_time, end_time }) => (
                            <option value={id}>
                                {new Date(start_time).toLocaleString()}~
                                {new Date(end_time).toLocaleString()}
                            </option>
                        ))}
                    </FormField>

                    <FormField
                        name="fav_topic"
                        required
                        label="Favorite topic"
                    />
                </fieldset>
                <fieldset disabled={loading}>
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
