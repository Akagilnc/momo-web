import { createCell, component } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { HTMLRouter } from 'cell-router/source';
import { NavBar } from '../component';

import { history, UserRole, session } from '../model';

import PageLogin from './PageLogin';
import { CoachProfile, CoachProfileEdit } from './Coach';
import { StudentProfile, StudentProfileEdit, CourseList } from './Student';
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
            group: UserRole.Coach
        },
        {
            title: '个人资料',
            href: 'student/profile',
            group: UserRole.Kid
        },
        {
            title: '课程',
            href: 'student/courses',
            group: UserRole.Kid
        },
        {
            title: 'Coaches',
            href: 'admin/coaches',
            group: UserRole.Admin
        },
        {
            title: 'Students',
            href: 'admin/students',
            group: UserRole.Admin
        },
        {
            title: 'Meta data',
            href: 'admin/meta',
            group: UserRole.Admin
        }
    ];

    renderPage() {
        switch (history.path) {
            case 'coach':
            case 'coach/profile':
                return <CoachProfile />;
            case 'coach/profile/edit':
                return <CoachProfileEdit />;
            case 'student':
            case 'kid':
            case 'student/courses':
                return <CourseList />;
            case 'student/profile':
                return <StudentProfile />;
            case 'student/profile/edit':
                return <StudentProfileEdit />;
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
        return (
            <div className="pt-5">
                <NavBar
                    title="Momo Chat"
                    menu={this.menu.filter(item => session.hasRole(item.group))}
                />
                {this.renderPage()}
            </div>
        );
    }
}
