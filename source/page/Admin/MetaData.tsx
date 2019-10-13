import { createCell, component, mixin, watch } from 'web-cell';
import { Table, FormField } from '../../component';

import {
    AvailableTime,
    getAvailableTimes,
    addAvailableTime,
    deleteAvailableTime
} from '../../model';

@component({
    tagName: 'meta-data',
    renderTarget: 'children'
})
export class MetaData extends mixin() {
    @watch
    timeLoading = false;

    @watch
    available_times: AvailableTime[] = [];

    async connectedCallback() {
        this.timeLoading = true;

        this.available_times = await getAvailableTimes();

        this.timeLoading = false;
    }

    onAdd = async (event: Event) => {
        event.preventDefault();

        this.timeLoading = true;
        try {
            const time = await addAvailableTime(
                new FormData(event.target as HTMLFormElement)
            );

            this.available_times = [time, ...this.available_times];
        } finally {
            this.timeLoading = false;
        }
    };

    async onDelete(id: number, event: MouseEvent) {
        event.preventDefault();

        this.timeLoading = true;
        try {
            await deleteAvailableTime(id);

            const { available_times } = this;

            this.available_times = available_times.splice(
                available_times.findIndex(item => item.id === id),
                1
            );
        } finally {
            this.timeLoading = false;
        }
    }

    render() {
        const { timeLoading, available_times } = this;

        return (
            <main className="p-3">
                <h2>Meta data</h2>

                <form onSubmit={this.onAdd}>
                    <fieldset disabled={timeLoading}>
                        <legend>Available times</legend>

                        <Table center striped hover>
                            <thead>
                                <tr>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {available_times.map(
                                    ({ id, start_time, end_time }) => (
                                        <tr>
                                            <td>
                                                {new Date(
                                                    start_time
                                                ).toLocaleString()}
                                            </td>
                                            <td>
                                                {new Date(
                                                    end_time
                                                ).toLocaleString()}
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={this.onDelete.bind(
                                                        this,
                                                        id
                                                    )}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </Table>

                        <FormField
                            type="datetime-local"
                            name="start_time"
                            required
                            label="Start"
                        />
                        <FormField
                            type="datetime-local"
                            name="end_time"
                            required
                            label="End"
                        />
                        <input type="submit" className="btn btn-primary" />
                    </fieldset>
                </form>
            </main>
        );
    }
}
