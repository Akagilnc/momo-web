import { createCell, component, mixin, watch } from 'web-cell';
import { Table } from 'boot-cell/source/Content/Table';
import { Pagination } from 'boot-cell/source/Navigator/Pagination';

import { Student, getStudents, GenderSymbol } from '../../model';

@component({
    tagName: 'student-table',
    renderTarget: 'children'
})
export class StudentTable extends mixin() {
    @watch
    students: Student[] = [];

    @watch
    current = 0;

    @watch
    total = 0;

    connectedCallback() {
        return this.getPage();
    }

    async getPage(page = 1) {
        if (page === this.current) return;

        const { results, count } = await getStudents({ page });

        (this.students = results),
            (this.current = page),
            (this.total = Math.ceil(count / 20));
    }

    render() {
        const { current, total } = this;

        return (
            <main className="p-3">
                <h2>Student</h2>

                <Table center striped hover>
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Telephone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.students.map(
                            ({ full_name, age, sex, phone_num }) => (
                                <tr>
                                    <td>{full_name}</td>
                                    <td>{age}</td>
                                    <td>{GenderSymbol[sex]}</td>
                                    <td>
                                        <a href={`tel: ${phone_num}`}>
                                            {phone_num}
                                        </a>
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
