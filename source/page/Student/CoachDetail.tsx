import { component, mixin, watch, createCell } from 'web-cell';
import { Button } from 'boot-cell/source/Form/Button';

import {
    Coach,
    Country,
    GenderSymbol,
    getCoach,
    bookCourse
} from '../../model';
import { timeSection } from '../../utility';
import style from '../Coach/Profile.less';

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

        self.alert('预约成功！');
    }

    render(
        _,
        {
            avatar,
            first_name,
            last_name,
            age,
            sex,
            country,
            phone_num,
            email,
            fav_topic,
            introduction,
            available_times
        }: Coach
    ) {
        return (
            <div className="p-3">
                <ul className={`list-group ${style.container}`}>
                    <li className="list-group-item">
                        <img className={style.avatar} src={avatar} />
                        {first_name}·{last_name}
                    </li>
                    <li className="list-group-item">
                        年龄<span>{age}</span>
                    </li>
                    <li className="list-group-item">
                        性别<span>{GenderSymbol[sex]}</span>
                    </li>
                    <li className="list-group-item">
                        国籍<span>{country.name}</span>
                    </li>
                    <li className="list-group-item">
                        电话<span>{phone_num}</span>
                    </li>
                    <li className="list-group-item">
                        电邮<span>{email}</span>
                    </li>
                    <li className="list-group-item">
                        感兴趣的话题<span>{fav_topic}</span>
                    </li>
                    <li className="list-group-item">
                        简介<p>{introduction}</p>
                    </li>
                    <li className="list-group-item">
                        选择时段
                        <div className="d-flex flex-column">
                            {available_times.map(section => {
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
                    </li>
                </ul>
            </div>
        );
    }
}
