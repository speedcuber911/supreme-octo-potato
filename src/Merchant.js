import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Input} from "@anarock/pebble";

class Merchant extends Component {
    state = {
        merchantStoreName: 'store Name',
        storeId: `store id`
    };

    render() {
        const {merchantStoreName, storeId} = state;
        return (
            <div className="App">
                <div className="Container">
                    <Input
                        onChange={r => this.setState({merchantStoreName: r})}
                        value={merchantStoreName}
                        readOnly
                    />
                    <Input
                        onChange={r => this.setState({storeId: r})}
                        value={storeId}
                    />
                </div>
            </div>
        );
    }
};

export default Merchant;
