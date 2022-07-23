import React from 'react';
import * as Rx from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Flow, UI } from '@grammarly/embrace';
import { F } from '@grammarly/focal';

const counterUI = UI.Node.make<number, 'plus' | 'minus'>(({ state, notify }) => (
    <F.div>
        <F.button onClick={() => notify('plus')}>+</F.button>
        {state}
        <F.button onClick={() => notify('minus')}>-</F.button>
    </F.div>
));

const counterFlow: Flow.For<typeof counterUI> = (actions: Observable<'plus' | 'minus'>) => {
    return actions.pipe(
        Rx.scan((acc, a) => (a === 'plus' ? acc + 1 : acc - 1), 0),
        Rx.startWith(0)
    )
};

export const Demo = () => {
    return (
        <div>
            Emoji menu
        </div>
    );
};
