import { component, mixin, createCell, Fragment } from 'web-cell';
import { observer } from 'mobx-web-cell';
import { Alert } from 'boot-cell/source/Prompt/Alert';
import { Card } from 'boot-cell/source/Content/Card';
import { Button } from 'boot-cell/source/Form/Button';

import { CoachProfile } from '../../component/CoachProfile';
import { session, Coach } from '../../model';
import { timeSection } from '../../utility';
import { i18nTextOf } from '../../i18n';

@observer
@component({
    tagName: 'coach-profile',
    renderTarget: 'children'
})
export class CoachProfilePage extends mixin() {
    render() {
        const coach = session.user as Coach;

        return (
            <>
                {coach.status !== false ? null : (
                    <Alert color="danger">
                        Your profile need to be edited to pass verification
                    </Alert>
                )}
                <CoachProfile {...coach} />

                <Card title={i18nTextOf('available_times')}>
                    <ul>
                        {coach?.available_times?.map(section => (
                            <li>{timeSection(section)}</li>
                        ))}
                    </ul>
                </Card>
                <Button block className="mt-3" href="coach/profile/edit">
                    Edit
                </Button>
            </>
        );
    }
}
