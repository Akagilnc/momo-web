import { createCell, component } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { HTMLRouter } from 'cell-router/source';

import { history } from '../model';
import PageCoach from './Coach';
import PageStudent from './Student';

@observer
@component({
    tagName: 'page-router',
    renderTarget: 'children'
})
export default class PageRouter extends HTMLRouter {
    protected history = history;

    renderPage() {
        switch (history.path) {
            case 'coach':
                return <PageCoach />;
            case 'student':
                return <PageStudent />;
        }
    }

    render() {
        return (
            <main>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <a href="coach">Coach</a>
                            </li>
                            <li>
                                <a href="student">Student</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                {this.renderPage()}
            </main>
        );
    }
}
