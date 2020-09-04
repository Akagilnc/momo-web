import { component, mixin, watch, createCell, Fragment } from 'web-cell';
import { Table } from 'boot-cell/source/Content/Table';
import { Pagination } from 'boot-cell/source/Navigator/Pagination';
import { ToggleField } from 'boot-cell/source/Form/ToggleField';

import { Student, getStudents, GenderSymbol, toggleStudent } from '../../model';

interface StudentTableProps {
    students: Student[];
    current: number;
    total: number;
}

@component({
    tagName: 'student-table',
    renderTarget: 'children'
})
export class StudentTable extends mixin<StudentTableProps>() {
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

    async toggle(event: MouseEvent, id: number) {
        event.preventDefault();

        await toggleStudent(id);

        const student = this.students.find(({ id: ID }) => ID === id);

        student.status = !student.status;

        this.update();
    }

    renderItem = ({ full_name, age, sex, phone_num, status, id }: Student) => (
        <tr>
            <td>{full_name}</td>
            <td>{age}</td>
            <td>{GenderSymbol[sex]}</td>
            <td>
                <a href={`tel: ${phone_num}`}>{phone_num}</a>
            </td>
            <td>
                <ToggleField
                    type="checkbox"
                    switch
                    checked={status}
                    onClick={event => this.toggle(event, id)}
                >
                    Enable
                </ToggleField>
            </td>
        </tr>
    );

    render({ students, current, total }: StudentTableProps) {
        return (
            <>
                <h2>Student</h2>

                <Table center striped hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Telephone</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>{students.map(this.renderItem)}</tbody>
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
