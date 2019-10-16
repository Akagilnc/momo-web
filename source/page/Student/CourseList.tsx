import { createCell, component, mixin, watch } from 'web-cell';
import { MediaItem } from '../../component';

import { Course, getCourses, GenderSymbol } from '../../model';
import style from '../Coach/Profile.less';

@component({
    tagName: 'course-list',
    renderTarget: 'children'
})
export class CourseList extends mixin() {
    @watch
    list: Course[] = [];

    async connectedCallback() {
        this.list = (await getCourses()).results;
    }

    render() {
        return (
            <main className="p-3">
                <h2>课程</h2>

                {this.list.map(
                    ({
                        coach: {
                            first_name,
                            last_name,
                            avatar,
                            age,
                            sex,
                            country,
                            fav_topic,
                            introduction
                        },
                        start_time,
                        end_time
                    }) => (
                        <MediaItem
                            className="border p-3 mb-3"
                            title={`${first_name}·${last_name}`}
                            image={avatar}
                        >
                            <ul className={`list-unstyled ${style.container}`}>
                                <li>
                                    年龄<span>{age}</span>
                                </li>
                                <li>
                                    性别<span>{GenderSymbol[sex]}</span>
                                </li>
                                <li>
                                    国籍<span>{country.name}</span>
                                </li>
                                <li>
                                    擅长话题<span>{fav_topic}</span>
                                </li>
                                <li>
                                    简介<span>{introduction}</span>
                                </li>
                                <li>
                                    时间
                                    <span>
                                        {new Date(start_time).toLocaleString()}{' '}
                                        ~ {new Date(end_time).toLocaleString()}
                                    </span>
                                </li>
                            </ul>
                        </MediaItem>
                    )
                )}
            </main>
        );
    }
}
