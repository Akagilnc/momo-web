import { createCell, component, mixin, watch, Fragment } from 'web-cell';
import { Image } from 'boot-cell/source/Media/Image';
import { Badge } from 'boot-cell/source/Reminder/Badge';
import { Table, TableRow } from 'boot-cell/source/Content/Table';
import { Pagination } from 'boot-cell/source/Navigator/Pagination';

import { Coach, getCoaches, GenderSymbol } from '../../model';

interface CoachTableProps {
    coaches: Coach[];
    current: number;
    total: number;
}

@component({
    tagName: 'coach-table',
    renderTarget: 'children'
})
export class CoachTable extends mixin<CoachTableProps>() {
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

        const { results, count } = await getCoaches({ page: page + '' });

        (this.coaches = results),
            (this.current = page),
            (this.total = Math.ceil(count / 20));
    }

    renderItem = ({
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
    }: Coach) => (
        <TableRow>
            <td>
                <Image thumbnail src={avatar} />
            </td>
            <td>
                <a href={'admin/coach?cid=' + id}>
                    {first_name}·{last_name}
                </a>
            </td>
            <td>{age}</td>
            <td>{GenderSymbol[sex]}</td>
            <td>{country.name}</td>
            <td>
                <a href={`tel: ${phone_num}`}>{phone_num}</a>
            </td>
            <td>
                <a href={`mailto: ${email}`}>{email}</a>
            </td>
            <td>{fav_topic}</td>
            <td>
                <Badge
                    color={
                        status != null
                            ? status
                                ? 'success'
                                : 'danger'
                            : 'warning'
                    }
                >
                    Verified
                </Badge>
            </td>
        </TableRow>
    );

    render({ coaches, current, total }: CoachTableProps) {
        return (
            <>
                <h2>Coach</h2>

                <Table center striped hover>
                    <TableRow type="head">
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Country</th>
                        <th>Telephone</th>
                        <th>Email</th>
                        <th>Favorite topic</th>
                        <th>Status</th>
                    </TableRow>
                    {coaches.map(this.renderItem)}
                </Table>

                <Pagination
                    current={current}
                    total={total}
                    onChange={({ detail }) => this.getPage(detail)}
                />
            </>
        );
    }
}
