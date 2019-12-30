import { createCell, component } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { HTMLRouter, matchRoutes } from 'cell-router/source';
import { NavBar } from 'boot-cell/source/Navigator/NavBar';

import { history, UserRole, session } from '../model';

import PageLogin from './PageLogin';
import { CoachProfile, CoachProfileEdit, LessonList } from './Coach';
import {
    StudentProfile,
    StudentProfileEdit,
    CoachList,
    CoachDetail
} from './Student';
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
                            paths: ['coach/lessons'],
                            component: LessonList
                        },
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
                        }
                    ],
                    history.path
                ) || <PageLogin />}
            </div>
        );
    }
}
