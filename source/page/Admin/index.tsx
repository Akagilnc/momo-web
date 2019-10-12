import { createCell, component, mixin } from 'web-cell';

@component({
    tagName: 'page-admin',
    renderTarget: 'children'
})
export default class PageAdmin extends mixin() {
    render() {
        return <main>Admin</main>;
    }
}
