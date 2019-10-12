import { createCell, component, mixin, watch } from 'web-cell';
import { FormField } from '../component';

import { createSession, history } from '../model';

@component({
    tagName: 'page-login',
    renderTarget: 'children'
})
export default class PageLogin extends mixin() {
    @watch
    loading = false;

    onSubmit = async (event: Event) => {
        event.preventDefault();

        this.loading = true;
        try {
            await createSession(new FormData(event.target as HTMLFormElement));

            history.push('', 'Entry');
        } finally {
            this.loading = false;
        }
    };

    render() {
        const { loading } = this;

        return (
            <form
                className="vh-100 d-flex align-items-center justify-content-center"
                onSubmit={this.onSubmit}
            >
                <fieldset disabled={loading}>
                    <legend>Log in</legend>

                    <FormField name="email" required label="Email" />
                    <FormField
                        type="password"
                        name="password"
                        required
                        label="Password"
                    />
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                    />
                </fieldset>
            </form>
        );
    }
}
