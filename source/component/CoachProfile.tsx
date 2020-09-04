import { createCell } from 'web-cell';
import { ListGroup, ListItem } from 'boot-cell/source/Content/ListGroup';

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
        <ListGroup className={style.container}>
            <ListItem>
                <img className={style.avatar} src={avatar} />
                {first_name}·{last_name}
            </ListItem>
            <ListItem>
                {i18nTextOf('age')}
                <span>{age}</span>
            </ListItem>
            <ListItem>
                {i18nTextOf('gender')}
                <span>{GenderSymbol[sex]}</span>
            </ListItem>
            <ListItem>
                {i18nTextOf('country')}
                <span>{country?.name}</span>
            </ListItem>
            <ListItem>
                {i18nTextOf('phone')}
                <span>{phone_num}</span>
            </ListItem>
            <ListItem>
                {i18nTextOf('email')}
                <span>{email}</span>
            </ListItem>
            <ListItem>
                {i18nTextOf('favorite_topic')}
                <span>{fav_topic}</span>
            </ListItem>
            <ListItem>
                {i18nTextOf('introduction')}
                <p>{introduction}</p>
            </ListItem>
        </ListGroup>
    );
}
