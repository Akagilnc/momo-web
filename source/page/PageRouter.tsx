import { component, createCell, Fragment, mixin } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { CellRouter } from 'cell-router/source';
import { NavBar } from 'boot-cell/source/Navigator/NavBar';
import { NavLink } from 'boot-cell/source/Navigator/Nav';
import { DropMenu, DropMenuItem } from 'boot-cell/source/Navigator/DropMenu';

import { UserRole, session, history } from '../model';

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
export default class PageRouter extends mixin() {
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
            <>
                <NavBar brand="Momo Chat">
                    {this.menu.map(({ group, title, ...rest }) =>
                        !session.hasRole(group) ? null : (
                            <NavLink {...rest}>{title}</NavLink>
                        )
                    )}
                    {group && (
                        <DropMenu
                            caption={username || phone_num}
                            alignType="right"
                            alignSize="md"
                        >
                            <DropMenuItem onClick={() => session.destroy()}>
                                Sign out
                            </DropMenuItem>
                        </DropMenu>
                    )}
                </NavBar>

                <CellRouter
                    className="container py-3"
                    history={history}
                    routes={this.routes}
                />
            </>
        );
    }
}
