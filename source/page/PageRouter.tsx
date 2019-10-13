import { createCell, component } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { HTMLRouter } from 'cell-router/source';
import { NavBar } from '../component';

import { history, getSession } from '../model';

import PageEntry from './PageEntry';
import PageLogin from './PageLogin';
import { CoachProfileEdit, CoachProfile } from './Coach';
import PageStudent from './Student';
import { CoachTable, StudentTable, MetaData } from './Admin';

@observer
@component({
    tagName: 'page-router',
    renderTarget: 'children'
})
export default class PageRouter extends HTMLRouter {
    protected history = history;

    protected menu = [
        {
            title: 'Profile',
            href: 'coach/profile',
            group: 'Coach'
        },
        {
            title: 'Coaches',
            href: 'admin/coaches',
            group: 'Admin'
        },
        {
            title: 'Students',
            href: 'admin/students',
            group: 'Admin'
        },
        {
            title: 'Meta data',
            href: 'admin/meta',
            group: 'Admin'
        }
    ];

    renderPage() {
        switch (history.path) {
            case 'entry':
                return <PageEntry />;
            case 'coach':
            case 'coach/profile':
                return <CoachProfile />;
            case 'coach/profile/edit':
                return <CoachProfileEdit />;
            case 'student':
            case 'kid':
                return <PageStudent />;
            case 'admin':
            case 'admin/coaches':
                return <CoachTable />;
            case 'admin/students':
                return <StudentTable />;
            case 'admin/meta':
                return <MetaData />;
            default:
                return <PageLogin />;
        }
    }

    render() {
        const { group } = getSession() || {};

        return (
            <div className="pt-5">
                <NavBar
                    title="Momo Chat"
                    menu={this.menu.filter(item => item.group === group)}
                />
                {this.renderPage()}
            </div>
        );
    }
}
