import { createCell, component, mixin } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { Button } from 'boot-cell/source/Form/Button';

import { session, Coach, GenderSymbol } from '../../model';
import { timeSection } from '../../utility';
import style from './Profile.less';

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
                        <img className={style.avatar} src={avatar} />
                        {first_name}·{last_name}
                    </li>
                    <li className="list-group-item">
                        Age<span>{age}</span>
                    </li>
                    <li className="list-group-item">
                        Gender<span>{GenderSymbol[sex]}</span>
                    </li>
                    <li className="list-group-item">
                        Country<span>{country?.name}</span>
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
                            {available_times?.map(section => (
                                <li>{timeSection(section)}</li>
                            ))}
                        </ul>
                    </li>
                </ul>
                <Button block className="mt-3" href="coach/profile/edit">
                    Edit
                </Button>
            </main>
        );
    }
}
