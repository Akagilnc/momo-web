import { createCell, component, mixin, watch } from 'web-cell';

import style from './Profile.less';
import { getSession, Coach, getCoach, GenderSymbol } from '../../model';

@component({
    tagName: 'coach-profile',
    renderTarget: 'children'
})
export class CoachProfile extends mixin() {
    @watch
    fields: Coach = {} as Coach;

    async connectedCallback() {
        const coach = getSession();

        if (coach) this.fields = await getCoach(coach.id);
    }

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
            introduction
        } = this.fields;

        return (
            <ul class={`list-group p-3 ${style.container}`}>
                <li class="list-group-item">
                    <img className="img-thumbnail" src={avatar} />
                    {first_name}·{last_name}
                </li>
                <li class="list-group-item">
                    Age<span>{age}</span>
                </li>
                <li class="list-group-item">
                    Gender<span>{GenderSymbol[sex]}</span>
                </li>
                <li class="list-group-item">
                    Country<span>{(country || {}).name}</span>
                </li>
                <li class="list-group-item">
                    Phone<span>{phone_num}</span>
                </li>
                <li class="list-group-item">
                    Email<span>{email}</span>
                </li>
                <li class="list-group-item">
                    Favorite topic<span>{fav_topic}</span>
                </li>
                <li class="list-group-item">
                    Introduction<p>{introduction}</p>
                </li>
            </ul>
        );
    }
}
