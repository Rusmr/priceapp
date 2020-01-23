import React from "react";

export default class Units extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        //Регулярка для ввода только цифр
        const regexp = /^\d*[0-9]\d*$/;
        if (regexp.test(e.target.value)) {
            this.props.onUnitChange(e.target.value, 'units');
        } else e.preventDefault();
    }
    render () {
        const units = this.props.units;
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Units</span>
                </div>
                <input type='number' min='0' id="units-input" className="form-control"
                       value={units} onChange={this.handleChange}/>
            </div>
        )
    }
}