import { createCell, component, mixin } from 'web-cell';

@component({
    tagName: 'page-coach',
    renderTarget: 'children'
})
export default class PageCoach extends mixin() {
    render() {
        return <main>Coach</main>;
    }
}
