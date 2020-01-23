import React from "react";

export default class RateSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultValue: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onRateSelect(e.target.value);
    }
    render () {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="rate-select">Rate</label>
                </div>
                <select className="custom-select" id="rate-select"
                        defaultValue={this.state.defaultValue} onChange={this.handleChange}>
                    <option value="0">Rate = Price</option>
                    <option value="1">Rate = 1 / Price</option>
                    <option value="2">Rate = 2 * Price</option>
                </select>
            </div>
        )
    }
}