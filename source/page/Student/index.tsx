import { createCell, component, mixin } from 'web-cell';

import StudentProfileEdit from './ProfileEdit';

@component({
    tagName: 'page-student',
    renderTarget: 'children'
})
export default class PageStudent extends mixin() {
    render() {
        return (
            <main>
                <StudentProfileEdit />
            </main>
        );
    }
}
