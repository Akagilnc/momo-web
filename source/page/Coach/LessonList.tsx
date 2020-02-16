import { component, mixin, createCell, Fragment } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { Card } from 'boot-cell/source/Content/Card';

import { session, Coach, GenderSymbol } from '../../model';

@observer
@component({
    tagName: 'lesson-list',
    renderTarget: 'children'
})
export class LessonList extends mixin() {
    render() {
        return (
            <Fragment>
                <h2>Lessons</h2>

                {(session.user as Coach).courses?.map(
                    ({ start_time, kids }) => (
                        <Card title={new Date(start_time).toLocaleString()}>
                            <ol>
                                {kids.map(({ id, full_name, sex, age }) => (
                                    <li key={id}>
                                        <div className="d-flex justify-content-between">
                                            <span>{full_name}</span>
                                            <span>{GenderSymbol[sex]}</span>
                                            <span>{age} years old</span>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </Card>
                    )
                )}
            </Fragment>
        );
    }
}
