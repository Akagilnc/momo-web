import { createCell } from 'web-cell';

import { Coach, GenderSymbol } from '../model';
import style from './CoachProfile.less';
import { i18nTextOf } from '../i18n';

export function CoachProfile({
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
}: Coach) {
    return (
        <ul className={`list-group ${style.container}`}>
            <li className="list-group-item">
                <img className={style.avatar} src={avatar} />
                {first_name}·{last_name}
            </li>
            <li className="list-group-item">
                {i18nTextOf('age')}
                <span>{age}</span>
            </li>
            <li className="list-group-item">
                {i18nTextOf('gender')}
                <span>{GenderSymbol[sex]}</span>
            </li>
            <li className="list-group-item">
                {i18nTextOf('country')}
                <span>{country?.name}</span>
            </li>
            <li className="list-group-item">
                {i18nTextOf('phone')}
                <span>{phone_num}</span>
            </li>
            <li className="list-group-item">
                {i18nTextOf('email')}
                <span>{email}</span>
            </li>
            <li className="list-group-item">
                {i18nTextOf('favorite_topic')}
                <span>{fav_topic}</span>
            </li>
            <li className="list-group-item">
                {i18nTextOf('introduction')}
                <p>{introduction}</p>
            </li>
        </ul>
    );
}
