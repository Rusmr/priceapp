import React from "react";

export default class Total extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        //Регулярка для ввода только цифр
        const regexp = /^\d*[0-9]\d*$/;
        if (regexp.test(e.target.value)) {
            this.props.onTotalChange(e.target.value, 'total');
        } else e.preventDefault();
    }
    render () {
        const total = this.props.total;
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Total</span>
                </div>
                <input type='number' min='0' id="total-input" className="form-control"
                       value={total} onChange={this.handleChange}/>
            </div>
        )
    }
}