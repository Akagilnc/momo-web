// @ts-ignore
import { auto } from 'browser-unhandled-rejection';

import { createCell, render } from 'web-cell';

import { session } from '../model';

import PageRouter from './PageRouter';

auto();

window.addEventListener(
    'unhandledrejection',
    ({ reason: { message, response } }) => {
        const { status } = response || '';

        if ([401, 403].includes(status)) session.destroy();
        else if (status > 299) window.alert(message);
    }
);

render(<PageRouter />);
