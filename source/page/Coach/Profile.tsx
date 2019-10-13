import { createCell, component, mixin } from 'web-cell';

import style from './Profile.less';
import { session, Coach, GenderSymbol } from '../../model';

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
            introduction
        } = session.user as Coach;

        return (
            <main className="p-3">
                <ul class={`list-group ${style.container}`}>
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
