import { createCell, component } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { HTMLRouter } from 'cell-router/source';

import { history } from '../model';

import PageEntry from './PageEntry';
import PageLogin from './PageLogin';
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
            case 'login':
                return <PageLogin />;
            case 'coach':
                return <PageCoach />;
            case 'student':
                return <PageStudent />;
            default:
                return <PageEntry />;
        }
    }

    render() {
        return <div>{this.renderPage()}</div>;
    }
}
