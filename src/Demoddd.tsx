import React from 'react';
import { Link } from 'react-router-dom';
import * as Rx from 'rxjs/operators'
import { Observable, pipe } from 'rxjs';
import { Flow, UI } from '@grammarly/embrace';
import { F } from '@grammarly/focal';
import './Demo.css';

import AttachIcon from './images/Attach.svg';
import mount = UI.mount;
// import EmojiIcon from './images/EmojiSmile.svg';
// import SendIcon from './images/Send.svg';

const Demoddd = () => {
    return (
        <>
            <span className="title">Chat</span>
            <DemoChat />
        </>
    );
};

