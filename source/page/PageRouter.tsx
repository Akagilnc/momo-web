import { createCell, component } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { HTMLRouter, matchRoutes } from 'cell-router/source';
import { NavBar } from 'boot-cell/source/Navigator/NavBar';

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

    render() {
        return (
            <div className="pt-5">
                <NavBar
                    title="Momo Chat"
                    menu={this.menu.filter(item => session.hasRole(item.group))}
                />
                {matchRoutes(
                    [
                        {
                            paths: ['coach/profile/edit'],
                            component: CoachProfileEdit
                        },
                        {
                            paths: ['coach/profile', 'coach'],
                            component: CoachProfile
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
                            paths: ['student/courses', 'student', 'kid'],
                            component: CourseList
                        },
                        { paths: ['admin/meta'], component: MetaData },
                        { paths: ['admin/students'], component: StudentTable },
                        {
                            paths: ['admin/coaches', 'admin'],
                            component: CoachTable
                        }
                    ],
                    history.path
                ) || <PageLogin />}
            </div>
        );
    }
}
