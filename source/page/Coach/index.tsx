import { createCell, component, mixin } from 'web-cell';

import CoachProfileEdit from './ProfileEdit';

@component({
    tagName: 'page-coach',
    renderTarget: 'children'
})
export default class PageCoach extends mixin() {
    render() {
        return (
            <main>
                <CoachProfileEdit />
            </main>
        );
    }
}
