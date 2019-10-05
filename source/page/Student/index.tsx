import { createCell, component, mixin } from 'web-cell';

@component({
    tagName: 'page-student',
    renderTarget: 'children'
})
export default class PageStudent extends mixin() {
    render() {
        return <main>Student</main>;
    }
}
