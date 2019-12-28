import { createCell, component, mixin } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { Table, FormField } from 'boot-cell/source';

import { formatTime } from '../../utility';
import { meta } from '../../model';

interface MetaState {
    timeLoading: boolean;
}

@observer
@component({
    tagName: 'meta-data',
    renderTarget: 'children'
})
export class MetaData extends mixin<{}, MetaState>() {
    state = {
        timeLoading: false
    };

    onAdd = async (event: Event) => {
        event.preventDefault();

        this.setState({ timeLoading: true });
        try {
            await meta.addAvailableTime(
                new FormData(event.target as HTMLFormElement)
            );
        } finally {
            this.setState({ timeLoading: false });
        }
    };

    async onDelete(id: number, event: MouseEvent) {
        event.preventDefault();

        this.setState({ timeLoading: true });
        try {
            await meta.deleteAvailableTime(id);
        } finally {
            this.setState({ timeLoading: false });
        }
    }

    render(_, { timeLoading }: MetaState) {
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
                                {meta.availableTimes.map(
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
