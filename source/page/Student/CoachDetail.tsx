import { component, mixin, watch, createCell, Fragment } from 'web-cell';
import { Card } from 'boot-cell/source/Content/Card';
import { Button } from 'boot-cell/source/Form/Button';

import { CoachProfile } from '../../component/CoachProfile';
import {
    Coach,
    Country,
    getCoach,
    bookCourse,
    session,
    history
} from '../../model';
import { timeSection } from '../../utility';
import { i18nTextOf } from '../../i18n';

@component({
    tagName: 'coach-detail',
    renderTarget: 'children'
})
export class CoachDetail extends mixin<{ coachId: number }, Coach>() {
    @watch
    coachId = 0;

    state = {
        avatar: '',
        first_name: '',
        last_name: '',
        age: 0,
        sex: 2,
        country: {} as Country,
        phone_num: '',
        email: '',
        fav_topic: '',
        introduction: '',
        available_times: []
    };

    async connectedCallback() {
        this.setState(await getCoach(this.coachId));
    }

    async bookLesson(id: number, title: string) {
        if (!self.confirm(`确认预约 ${title} 的练习？`)) return;

        await bookCourse(this.coachId, id);

        await session.getCurrentUser();

        history.push('student/profile');
    }

    render(_, coach: Coach) {
        return (
            <>
                <CoachProfile {...coach} />

                <Card title={i18nTextOf('available_times')}>
                    <div className="d-flex flex-column">
                        {coach.available_times.map(section => {
                            const title = timeSection(section);

                            return (
                                <Button
                                    key={section.id}
                                    className="my-1"
                                    onClick={() =>
                                        this.bookLesson(section.id, title)
                                    }
                                >
                                    {title}
                                </Button>
                            );
                        })}
                    </div>
                </Card>
            </>
        );
    }
}
