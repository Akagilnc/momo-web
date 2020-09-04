import { component, mixin, createCell, Fragment } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { ListGroup, ListItem } from 'boot-cell/source/Content/ListGroup';
import { Button } from 'boot-cell/source/Form/Button';

import style from '../../component/CoachProfile.less';
import {
    Course,
    session,
    Student,
    GenderSymbol,
    cancelCourse
} from '../../model';

@observer
@component({
    tagName: 'student-profile',
    renderTarget: 'children'
})
export class StudentProfile extends mixin() {
    async cancelCourse(id: number) {
        await cancelCourse(id);

        await session.getCurrentUser();
    }

    renderCourse = ({ coach, start_time, end_time, id }: Course) => (
        <li>
            <ul className="list-unstyled">
                <li>陪练：{coach}</li>
                <li>
                    时间：{new Date(start_time).toLocaleString()} ~{' '}
                    {new Date(end_time).toLocaleString()}
                </li>
                <li>
                    <Button
                        color="danger"
                        size="sm"
                        onClick={() => this.cancelCourse(id)}
                    >
                        退订
                    </Button>
                </li>
            </ul>
        </li>
    );

    render() {
        const {
            full_name,
            age,
            sex,
            phone_num,
            courses
        } = session.user as Student;

        return (
            <>
                <ListGroup className={style.container}>
                    <ListItem>{full_name}</ListItem>
                    <ListItem>
                        年龄<span>{age}</span>
                    </ListItem>
                    <ListItem>
                        性别<span>{GenderSymbol[sex]}</span>
                    </ListItem>
                    <ListItem>
                        电话<span>{phone_num}</span>
                    </ListItem>
                    <ListItem>
                        预订课程
                        {!courses[0] ? (
                            <Button size="sm" href="student/coaches">
                                预订
                            </Button>
                        ) : (
                            <ol>{courses.map(this.renderCourse)}</ol>
                        )}
                    </ListItem>
                </ListGroup>

                <Button block className="mt-3" href="student/profile/edit">
                    编辑
                </Button>
            </>
        );
    }
}
