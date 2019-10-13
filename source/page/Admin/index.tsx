import { createCell, component, mixin, watch } from 'web-cell';
import { Table, Pagination } from '../../component';

import { Coach, getCoaches, GenderSymbol } from '../../model';

@component({
    tagName: 'page-admin',
    renderTarget: 'children'
})
export default class PageAdmin extends mixin() {
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
                                fav_topic
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
