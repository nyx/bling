import * as React from 'react';
import { render } from 'react-dom';

import Counter from './Counter';
import Chainer from './Chainer';

render(<Counter />, document.getElementById('main'));
render(<Chainer />, document.getElementById('chainer'));
