import { createCell, component, mixin, watch } from 'web-cell';
import { FormField, FileInput } from 'boot-cell';

import { formatTime, WeekDay } from '../../utility';
import {
    Country,
    getCountries,
    AvailableTime,
    getAvailableTimes,
    updateCoach,
    history,
    session,
    Coach
} from '../../model';

@component({
    tagName: 'coach-profile-edit',
    renderTarget: 'children'
})
export class CoachProfileEdit extends mixin() {
    @watch
    loading = false;

    @watch
    countries: Country[] = [];

    @watch
    availableTimes: AvailableTime[] = [];

    async connectedCallback() {
        this.loading = true;

        const [countries, availableTimes] = await Promise.all([
            getCountries(),
            getAvailableTimes()
        ]);

        this.countries = countries;
        this.availableTimes = availableTimes;

        this.loading = false;
    }

    onSubmit = async (event: Event) => {
        event.preventDefault();

        const data = new FormData(event.target as HTMLFormElement);

        this.loading = true;
        try {
            session.setCurrentUser(await updateCoach(data));

            if (!data.get('id')) history.push('login', 'Log in');
            else history.push('coach', 'Coach Profile');
        } finally {
            this.loading = false;
        }
    };

    render() {
        const { loading, countries, availableTimes } = this,
            user = session.user as Coach;

        const country = user.country || ({} as Country),
            available_times = user.available_times || ([] as AvailableTime[]);

        return (
            <form
                className="form p-3"
                onReset={() => window.history.back()}
                onSubmit={this.onSubmit}
            >
                {user.id && <input type="hidden" name="id" value={user.id} />}

                <h2>Coach</h2>
                <fieldset disabled={loading}>
                    <legend>Profile</legend>

                    <FormField
                        name="first_name"
                        required
                        label="First name"
                        defaultValue={user.first_name}
                    />
                    <FormField
                        name="last_name"
                        required
                        label="Last name"
                        defaultValue={user.last_name}
                    />
                    <FormField is="select" name="sex" required label="Gender">
                        <option value="1" selected={user.sex === 1}>
                            Male
                        </option>
                        <option value="0" selected={user.sex === 0}>
                            Female
                        </option>
                        <option value="2" selected={user.sex === 2}>
                            Other
                        </option>
                    </FormField>

                    <FormField
                        type="number"
                        name="age"
                        required
                        label="Age"
                        min="0"
                        defaultValue={user.age + ''}
                    />
                    <FormField
                        is="select"
                        name="country"
                        required
                        label="Country"
                    >
                        {countries.map(({ id, name }) => (
                            <option value={id} selected={id === country.id}>
                                {name}
                            </option>
                        ))}
                    </FormField>

                    <FormField label="Avatar">
                        <FileInput name="avatar" required value={user.avatar} />
                    </FormField>

                    <FormField
                        is="textarea"
                        name="introduction"
                        required
                        label="Introduction"
                        defaultValue={user.introduction}
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
                        {availableTimes.map(
                            ({ id, day, start_time, end_time }) => (
                                <option
                                    value={id}
                                    selected={available_times.find(
                                        item => item.id === id
                                    )}
                                >
                                    {WeekDay[day - 1]} {formatTime(start_time)}{' '}
                                    ~ {formatTime(end_time)}
                                </option>
                            )
                        )}
                    </FormField>

                    <FormField
                        name="fav_topic"
                        required
                        label="Favorite topic"
                        defaultValue={user.fav_topic}
                    />
                </fieldset>
                <fieldset disabled={loading}>
                    <legend>Account</legend>

                    <FormField
                        type="tel"
                        name="phone_num"
                        required
                        label="Telephone"
                        defaultValue={user.phone_num}
                    />
                    <FormField
                        type="email"
                        name="email"
                        required
                        label="Email"
                        defaultValue={user.email}
                    />
                    <FormField
                        type="password"
                        name="password"
                        required={!user.id}
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
