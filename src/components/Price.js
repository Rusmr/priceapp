import React from "react";

export default class Price extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        //Регулярка для ввода только цифр
        const regexp = /^\d*[0-9]\d*$/;
        if (regexp.test(e.target.value)) {
            this.props.onPriceChange(e.target.value);
        } else e.preventDefault();
    }
    render () {
        const price = this.props.price;
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Price</span>
                </div>
                <input type='number' min='0' className="form-control"
                       value={price} onChange={this.handleChange}/>
            </div>
        )
    }
}