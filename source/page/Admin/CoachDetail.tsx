import {
    component,
    mixin,
    watch,
    attribute,
    createCell,
    Fragment
} from 'web-cell';
import { observer } from 'mobx-web-cell';
import { Card } from 'boot-cell/source/Content/Card';
import { Button } from 'boot-cell/source/Form/Button';

import { CoachProfile } from '../../component/CoachProfile';
import {
    Coach,
    Country,
    getCoach,
    verifyCoach,
    session,
    rejectCoach
} from '../../model';
import { timeSection } from '../../utility';
import { i18nTextOf } from '../../i18n';

@observer
@component({
    tagName: 'admin-coach-profile',
    renderTarget: 'children'
})
export class AdminCoachProfile extends mixin<{ cid: number }, Coach>() {
    @attribute
    @watch
    cid = 0;

    state = {
        avatar: '',
        first_name: '',
        last_name: '',
        age: 0,
        sex: 2,
        country: {} as Country,
        phone_num: '',
        email: '',
        fav_topic: '',
        introduction: '',
        available_times: []
    };

    async connectedCallback() {
        if (!this.cid) return;

        this.setState(await getCoach(this.cid));
    }

    verify = async () => {
        await verifyCoach(this.cid);

        session.push('admin/coaches');
    };

    reject = async () => {
        await rejectCoach(this.cid);

        session.push('admin/coaches');
    };

    render(_, coach: Coach) {
        return (
            <Fragment>
                <CoachProfile {...coach} />

                <Card title={i18nTextOf('available_times')}>
                    <ul>
                        {coach?.available_times?.map(section => (
                            <li>{timeSection(section)}</li>
                        ))}
                    </ul>
                </Card>

                <div className="btn-group d-flex">
                    <Button kind="success" onClick={this.verify}>
                        通过
                    </Button>
                    <Button kind="danger" onClick={this.reject}>
                        拒绝
                    </Button>
                </div>
            </Fragment>
        );
    }
}
