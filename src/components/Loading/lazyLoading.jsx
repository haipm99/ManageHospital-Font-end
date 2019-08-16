import React, { Component } from 'react';
import { Progress } from 'antd';
class lazyLoading extends Component {
    state = {
        percent: 0,
    };
    increase = () => {
        let percent = this.state.percent + 10;
        if (percent > 100) {
            percent = 100;
        }
        this.setState({ percent });
    };
    increaseAuto = () => {
        while (this.state.percent <= 100) {
            this.increase();
        }
    }

    render() {
        return (
            <div>
                <h1>Loading ....</h1>
                <Progress type="dashboard" percent={this.state.percent} />
            </div>
        );
    }
}

export default lazyLoading;