import { component, mixin, on, createCell, Fragment } from 'web-cell';
import { FormField } from 'boot-cell/source/Form/FormField';
import { MediaItem } from 'boot-cell/source/Content/MediaItem';

import {
    Coach,
    CoachFilter,
    getCoaches,
    meta,
    Gender,
    GenderSymbol,
    session
} from '../../model';
import { timeSection } from '../../utility';
import style from '../../component/CoachProfile.less';

interface CoachListState {
    list: Coach[];
}

@component({
    tagName: 'coach-list',
    renderTarget: 'children'
})
export class CoachList extends mixin<{}, CoachListState>() {
    state = {
        list: []
    };

    connectedCallback() {
        this.changeFilter();
    }

    async changeFilter(options?: CoachFilter) {
        this.setState({ list: (await getCoaches(options)).results });
    }

    @on('change', 'form select[name]')
    handleFilter(event: Event) {
        const { name, value } = event.target as HTMLInputElement;

        this.changeFilter({ [name]: value });
    }

    renderItem = ({
        id,
        first_name,
        last_name,
        avatar,
        age,
        sex,
        country,
        fav_topic
    }: Coach) => (
        <MediaItem
            key={id}
            className="border p-3 mb-3"
            title={`${first_name}·${last_name}`}
            image={<img className={`${style.avatar} mr-3`} src={avatar} />}
            onClick={() => session.push('student/coach?coachId=' + id)}
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
            </ul>
        </MediaItem>
    );

    render(_, { list }: CoachListState) {
        return (
            <Fragment>
                <h2>教练</h2>

                <details className="my-3">
                    <summary>筛选</summary>
                    <form>
                        <FormField
                            is="select"
                            name="available_times"
                            label="时段"
                        >
                            <option value="">（不限）</option>
                            {meta.availableTimes.map(section => (
                                <option value={section.id}>
                                    {timeSection(section)}
                                </option>
                            ))}
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

                {list.map(this.renderItem)}
            </Fragment>
        );
    }
}
