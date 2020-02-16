import { createCell, component, mixin, watch } from 'web-cell';
import { Table } from 'boot-cell/source/Content/Table';
import { Pagination } from 'boot-cell/source/Navigator/Pagination';
import { ToggleField } from 'boot-cell/source/Form/ToggleField';

import { Coach, getCoaches, GenderSymbol, verifyCoach } from '../../model';

@component({
    tagName: 'coach-table',
    renderTarget: 'children'
})
export class CoachTable extends mixin() {
    @watch
    coaches: Coach[] = [];

    @watch
    current = 0;

    @watch
    total = 0;

    connectedCallback() {
        return this.getPage();
    }

    async getPage(page = 1) {
        if (page === this.current) return;

        const { results, count } = await getCoaches({ page });

        (this.coaches = results),
            (this.current = page),
            (this.total = Math.ceil(count / 20));
    }

    async verify(event: MouseEvent, id: number) {
        event.preventDefault();

        await verifyCoach(id);

        const coach = this.coaches.find(({ id: ID }) => ID === id);

        coach.status = true;

        this.update();
    }

    render() {
        const { current, total } = this;

        return (
            <main className="p-3">
                <h2>Coach</h2>

                <Table center striped hover>
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Country</th>
                            <th>Telephone</th>
                            <th>Email</th>
                            <th>Favorite topic</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.coaches.map(
                            ({
                                avatar,
                                first_name,
                                last_name,
                                age,
                                sex,
                                country,
                                phone_num,
                                email,
                                fav_topic,
                                status,
                                id
                            }) => (
                                <tr>
                                    <td>
                                        <img
                                            className="img-thumbnail"
                                            src={avatar}
                                        />
                                    </td>
                                    <td>
                                        {first_name}·{last_name}
                                    </td>
                                    <td>{age}</td>
                                    <td>{GenderSymbol[sex]}</td>
                                    <td>{country.name}</td>
                                    <td>
                                        <a href={`tel: ${phone_num}`}>
                                            {phone_num}
                                        </a>
                                    </td>
                                    <td>
                                        <a href={`mailto: ${email}`}>{email}</a>
                                    </td>
                                    <td>{fav_topic}</td>
                                    <td>
                                        <ToggleField
                                            type="checkbox"
                                            switch
                                            checked={status}
                                            onClick={event =>
                                                this.verify(event, id)
                                            }
                                        >
                                            Verified
                                        </ToggleField>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>

                <Pagination
                    current={current}
                    total={total}
                    onChange={({ detail }) => this.getPage(detail)}
                />
            </main>
        );
    }
}
