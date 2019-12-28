import { createCell, component, mixin, on } from 'web-cell';
import { FormField, MediaItem } from 'boot-cell/source';

import {
    Course,
    CourseFilter,
    getCourses,
    meta,
    Gender,
    GenderSymbol
} from '../../model';
import style from '../Coach/Profile.less';
import { formatTime } from '../../utility';

interface CourseState {
    list: Course[];
}

@component({
    tagName: 'course-list',
    renderTarget: 'children'
})
export class CourseList extends mixin<{}, CourseState>() {
    state = {
        list: []
    };

    connectedCallback() {
        this.changeFilter();
    }

    async changeFilter(options?: CourseFilter) {
        this.setState({ list: (await getCourses(options)).results });
    }

    @on('change', 'form select[name]')
    handleFilter(event: Event) {
        const { name, value } = event.target as HTMLInputElement;

        this.changeFilter({ [name]: value });
    }

    render(_, { list }: CourseState) {
        return (
            <div className="p-3">
                <h2>课程</h2>

                <details className="my-3">
                    <summary>筛选</summary>
                    <form>
                        <FormField
                            is="select"
                            name="available_times"
                            label="课时"
                        >
                            <option value="">（不限）</option>
                            {meta.availableTimes.map(
                                ({ id, start_time, end_time }) => (
                                    <option value={id}>
                                        {formatTime(start_time)} ~{' '}
                                        {formatTime(end_time)}
                                    </option>
                                )
                            )}
                        </FormField>

                        <FormField is="select" name="gender" label="性别">
                            <option value="">（不限）</option>
                            {Object.entries(Gender).map(([key, value]) =>
                                isNaN(+key) ? (
                                    <option value={value}>{key}</option>
                                ) : null
                            )}
                        </FormField>

                        <FormField is="select" name="country" label="国籍">
                            <option value="">（不限）</option>
                            {meta.countries.map(({ id, name }) => (
                                <option value={id}>{name}</option>
                            ))}
                        </FormField>
                    </form>
                </details>

                {list.map(
                    ({
                        coach: {
                            first_name,
                            last_name,
                            avatar,
                            age,
                            sex,
                            country,
                            fav_topic
                        },
                        start_time,
                        end_time,
                        kids
                    }) => (
                        <MediaItem
                            className="border p-3 mb-3"
                            title={`${first_name}·${last_name}`}
                            image={
                                <img
                                    className={`${style.avatar} mr-3`}
                                    src={avatar}
                                />
                            }
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
                                    时间
                                    <span>
                                        {formatTime(start_time)} ~{' '}
                                        {formatTime(end_time)}
                                    </span>
                                </li>
                                <li>
                                    学生<span>{kids.length}人</span>
                                </li>
                            </ul>
                        </MediaItem>
                    )
                )}
            </div>
        );
    }
}
