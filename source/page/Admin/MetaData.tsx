import { createCell, component, mixin, Fragment } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { Button } from 'boot-cell/source/Form/Button';
import { Table } from 'boot-cell/source/Content/Table';
import { FormField } from 'boot-cell/source/Form/FormField';

import { WeekDay, formatTime } from '../../utility';
import { meta, AvailableTime } from '../../model';

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

    renderItem = ({
        id,
        day,
        start_time,
        end_time,
        max_kids
    }: AvailableTime) => (
        <tr>
            <td>{WeekDay[day - 1]}</td>
            <td>{formatTime(start_time)}</td>
            <td>{formatTime(end_time)}</td>
            <td>{max_kids}</td>
            <td>
                <Button color="danger" onClick={this.onDelete.bind(this, id)}>
                    Delete
                </Button>
            </td>
        </tr>
    );

    render(_, { timeLoading }: MetaState) {
        return (
            <>
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
                                {meta.availableTimes.map(this.renderItem)}
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
            </>
        );
    }
}
