import { createCell, component, mixin } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { FormField } from 'boot-cell/source/Form/FormField';
import { FileInput } from 'boot-cell/source/Form/FileInput';

import {
    updateCoach,
    session,
    Coach,
    Country,
    AvailableTime,
    Gender,
    meta
} from '../../model';
import { timeSection } from '../../utility';

interface EditState {
    loading: boolean;
}

@observer
@component({
    tagName: 'coach-profile-edit',
    renderTarget: 'children'
})
export class CoachProfileEdit extends mixin<{}, EditState>() {
    state = {
        loading: false
    };

    onSubmit = async (event: Event) => {
        event.preventDefault();

        const data = new FormData(event.target as HTMLFormElement);

        this.setState({ loading: true });
        try {
            session.setCurrentUser(await updateCoach(data));

            if (!data.get('id')) session.push('login', 'Log in');
            else session.push('coach', 'Coach Profile');
        } finally {
            this.setState({ loading: false });
        }
    };

    render(_, { loading }: EditState) {
        const {
            id,
            first_name,
            last_name,
            sex,
            age,
            avatar,
            introduction,
            fav_topic,
            phone_num,
            email,
            country = {} as Country,
            available_times = [] as AvailableTime[]
        } = session.user as Coach;

        return (
            <form
                className="form"
                onReset={() => window.history.back()}
                onSubmit={this.onSubmit}
            >
                {id && <input type="hidden" name="id" value={id} />}

                <h2>Coach</h2>
                <fieldset disabled={loading}>
                    <legend>Profile</legend>

                    <FormField
                        name="first_name"
                        required
                        label="First name"
                        defaultValue={first_name}
                    />
                    <FormField
                        name="last_name"
                        required
                        label="Last name"
                        defaultValue={last_name}
                    />
                    <FormField is="select" name="sex" required label="Gender">
                        {Object.entries(Gender).map(([key, value]) =>
                            isNaN(+key) ? (
                                <option value={value} selected={sex === +value}>
                                    {key}
                                </option>
                            ) : null
                        )}
                    </FormField>

                    <FormField
                        type="number"
                        name="age"
                        required
                        label="Age"
                        min="0"
                        defaultValue={age + ''}
                    />
                    <FormField
                        is="select"
                        name="country"
                        required
                        label="Country"
                    >
                        {meta.countries.map(({ id, name }) => (
                            <option value={id} selected={id === country.id}>
                                {name}
                            </option>
                        ))}
                    </FormField>

                    <FormField label="Avatar">
                        <FileInput name="avatar" required value={avatar} />
                    </FormField>

                    <FormField
                        is="textarea"
                        name="introduction"
                        required
                        label="Introduction"
                        defaultValue={introduction}
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
                        {meta.availableTimes.map(section => (
                            <option
                                value={section.id}
                                selected={available_times.find(
                                    ({ id }) => id === section.id
                                )}
                            >
                                {timeSection(section)}
                            </option>
                        ))}
                    </FormField>

                    <FormField
                        name="fav_topic"
                        required
                        label="Favorite topic"
                        defaultValue={fav_topic}
                    />
                </fieldset>
                <fieldset disabled={loading}>
                    <legend>Account</legend>

                    <FormField
                        type="tel"
                        name="phone_num"
                        required
                        label="Telephone"
                        defaultValue={phone_num}
                    />
                    <FormField
                        type="email"
                        name="email"
                        required
                        label="Email"
                        defaultValue={email}
                    />
                    <FormField
                        type="password"
                        name="password"
                        required={!id}
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
