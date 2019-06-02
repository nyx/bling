import * as React from 'react';
import { BlingChain } from "./main";

export default class Chainer extends React.Component {
    state = {
        count: 0,
        bling: BlingChain
    };

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            bling: BlingChain
        };
    };

    append = () => {
        let b = this.state.bling;
        b.addData(this.state.count);
        b.printChain();
        this.setState({
            count: (this.state.count + 1),
            bling: this.state.bling
        });
    };

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <h2>Chain</h2>
                <button onClick={this.append}>Append</button>
            </div>
        );
    }
}