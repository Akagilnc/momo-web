import { createCell, component, mixin, watch } from 'web-cell';
import { Table, FormField } from 'boot-cell';

import { formatTime } from '../../utility';
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
                                    <th>Day of Week</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Max Kids</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {available_times.map(
                                    ({
                                        id,
                                        day,
                                        start_time,
                                        end_time,
                                        max_kids
                                    }) => (
                                        <tr>
                                            <td>{day}</td>
                                            <td>{formatTime(start_time)}</td>
                                            <td>{formatTime(end_time)}</td>
                                            <td>{max_kids}</td>
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
                            type="number"
                            name="day"
                            required
                            label="Day of Week"
                        />
                        <FormField
                            type="time"
                            name="start_time"
                            required
                            label="Start"
                        />
                        <FormField
                            type="time"
                            name="end_time"
                            required
                            label="End"
                        />
                        <FormField
                            type="number"
                            name="max_kids"
                            required
                            label="Max Kids"
                        />
                        <input type="submit" className="btn btn-primary" />
                    </fieldset>
                </form>
            </main>
        );
    }
}
