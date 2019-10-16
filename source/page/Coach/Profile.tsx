import { createCell, component, mixin } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { WeekDay, formatTime } from '../../utility';

import style from './Profile.less';
import { session, Coach, GenderSymbol } from '../../model';

@observer
@component({
    tagName: 'coach-profile',
    renderTarget: 'children'
})
export class CoachProfile extends mixin() {
    render() {
        const {
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
        } = session.user as Coach;

        return (
            <main className="p-3">
                <ul className={`list-group ${style.container}`}>
                    <li className="list-group-item">
                        <img className="img-thumbnail" src={avatar} />
                        {first_name}·{last_name}
                    </li>
                    <li className="list-group-item">
                        Age<span>{age}</span>
                    </li>
                    <li className="list-group-item">
                        Gender<span>{GenderSymbol[sex]}</span>
                    </li>
                    <li className="list-group-item">
                        Country<span>{(country || {}).name}</span>
                    </li>
                    <li className="list-group-item">
                        Phone<span>{phone_num}</span>
                    </li>
                    <li className="list-group-item">
                        Email<span>{email}</span>
                    </li>
                    <li className="list-group-item">
                        Favorite topic<span>{fav_topic}</span>
                    </li>
                    <li className="list-group-item">
                        Introduction<p>{introduction}</p>
                    </li>
                    <li className="list-group-item">
                        Available Times
                        <ul>
                            {available_times.map(
                                ({ day, start_time, end_time }) => (
                                    <li>
                                        {WeekDay[day - 1]}{' '}
                                        {formatTime(start_time)} ~{' '}
                                        {formatTime(end_time)}
                                    </li>
                                )
                            )}
                        </ul>
                    </li>
                </ul>
                <a
                    className="btn btn-block btn-primary mt-3"
                    href="coach/profile/edit"
                >
                    Edit
                </a>
            </main>
        );
    }
}
