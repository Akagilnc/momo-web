import { component, createCell, Fragment } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { HTMLRouter } from 'cell-router/source';
import { NavBar } from 'boot-cell/source/Navigator/NavBar';
import { DropMenu } from 'boot-cell/source/Navigator/DropMenu';

import { session, UserRole } from '../model';

import PageLogin from './PageLogin';
import { CoachProfilePage, CoachProfileEdit, LessonList } from './Coach';
import {
    StudentProfile,
    StudentProfileEdit,
    CoachList,
    CoachDetail
} from './Student';
import { CoachTable, AdminCoachProfile, StudentTable, MetaData } from './Admin';

@observer
@component({
    tagName: 'page-router',
    renderTarget: 'children'
})
export default class PageRouter extends HTMLRouter {
    protected history = session;
    protected routes = [
        {
            paths: ['login'],
            component: PageLogin
        },
        {
            paths: ['coach/lessons'],
            component: LessonList
        },
        {
            paths: ['coach/profile/edit'],
            component: CoachProfileEdit
        },
        {
            paths: ['coach/profile', 'coach'],
            component: CoachProfilePage
        },
        {
            paths: ['student/profile/edit'],
            component: StudentProfileEdit
        },
        {
            paths: ['student/profile'],
            component: StudentProfile
        },
        {
            paths: ['student/coach'],
            component: CoachDetail
        },
        {
            paths: ['student/coaches', 'student', 'kid'],
            component: CoachList
        },
        { paths: ['admin/meta'], component: MetaData },
        { paths: ['admin/students'], component: StudentTable },
        {
            paths: ['admin/coaches', 'admin'],
            component: CoachTable
        },
        {
            paths: ['admin/coach'],
            component: AdminCoachProfile
        }
    ];
    protected menu = [
        {
            title: 'Profile',
            href: 'coach/profile',
            group: UserRole.Coach
        },
        {
            title: 'Lessons',
            href: 'coach/lessons',
            group: UserRole.Coach
        },
        {
            title: '个人资料',
            href: 'student/profile',
            group: UserRole.Kid
        },
        {
            title: '教练',
            href: 'student/coaches',
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

    connectedCallback() {
        super.connectedCallback();

        session.init();
    }

    render() {
        const {
            user: { group, username, phone_num }
        } = session;

        return (
            <Fragment>
                <NavBar
                    brand="Momo Chat"
                    menu={this.menu.filter(item => session.hasRole(item.group))}
                >
                    {group && (
                        <DropMenu
                            title={username || phone_num}
                            alignType="right"
                            alignSize="md"
                            list={[
                                {
                                    title: 'Sign out',
                                    onClick: () => session.destroy()
                                }
                            ]}
                        />
                    )}
                </NavBar>
                <main className="container mt-5 py-3">{super.render()}</main>
            </Fragment>
        );
    }
}
