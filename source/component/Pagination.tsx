import { createCell, component, mixin, watch, on } from 'web-cell';
import classNames from 'classnames';

@component({
    tagName: 'page-box',
    renderTarget: 'children'
})
export class Pagination extends mixin() {
    @watch
    current = 1;

    @watch
    total = 1;

    @on('click', '.page-link')
    onClick(event: MouseEvent) {
        event.preventDefault();

        const current = (event.target as HTMLElement).textContent.trim();

        switch (current) {
            case '<':
                this.current--;
                break;
            case '>':
                this.current++;
                break;
            default:
                this.current = parseInt(current);
        }

        this.emit('change', this.current, { bubbles: true, composed: true });
    }

    render() {
        const { current, total } = this;

        return (
            <ul class="pagination justify-content-center">
                <li
                    class={classNames('page-item', current === 1 && 'disabled')}
                >
                    <a class="page-link" aria-disabled={current === 1}>
                        &lt;
                    </a>
                </li>
                {total < 2 ? null : (
                    <li class="page-item">
                        <a class="page-link">1</a>
                    </li>
                )}
                <li class="page-item active" aria-current="page">
                    <a class="page-link">
                        {current} <span class="sr-only">(current)</span>
                    </a>
                </li>
                {total < 3 ? null : (
                    <li class="page-item">
                        <a class="page-link">{total}</a>
                    </li>
                )}
                <li
                    class={classNames(
                        'page-item',
                        current === total && 'disabled'
                    )}
                >
                    <a class="page-link" aria-disabled={current === total}>
                        >
                    </a>
                </li>
            </ul>
        );
    }
}
