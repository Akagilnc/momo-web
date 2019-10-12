import { createCell, component } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { HTMLRouter } from 'cell-router/source';
import { NavBar } from '../component';

import { history } from '../model';

import PageEntry from './PageEntry';
import PageLogin from './PageLogin';
import PageCoach from './Coach';
import PageStudent from './Student';
import PageAdmin from './Admin';

@observer
@component({
    tagName: 'page-router',
    renderTarget: 'children'
})
export default class PageRouter extends HTMLRouter {
    protected history = history;

    protected menu = [
        {
            title: 'Coaches',
            href: 'admin/coaches'
        },
        {
            title: 'Students',
            href: 'admin/students'
        }
    ];

    renderPage() {
        switch (history.path) {
            case 'login':
                return <PageLogin />;
            case 'coach':
                return <PageCoach />;
            case 'student':
            case 'kid':
                return <PageStudent />;
            case 'admin':
                return <PageAdmin />;
            default:
                return <PageEntry />;
        }
    }

    render() {
        return (
            <div className="pt-5">
                <NavBar title="Momo Chat" menu={this.menu} />

                {this.renderPage()}
            </div>
        );
    }
}
