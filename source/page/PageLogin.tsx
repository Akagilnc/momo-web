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
            const { group } = await createSession(
                new FormData(event.target as HTMLFormElement)
            );

            history.push(group.toLowerCase(), group);
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

                    <FormField
                        name="username"
                        required
                        label="Telephone / User name"
                    />
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
                    <a className="btn btn-block btn-success" href="entry">
                        Sign up
                    </a>
                </fieldset>
            </form>
        );
    }
}
