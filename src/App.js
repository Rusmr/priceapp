import React from 'react';
import Units from "../../priceapp/src/components/Units";
import Price from "../../priceapp/src/components/Price";
import Total from "../../priceapp/src/components/Total";
import RateSelect from "../../priceapp/src/components/RateSelect";

/**
 * @return {string}
 */
function Rounded2 (output) {
    /* округление до двух знаков */
    const rounded = Math.round(output * 100) / 100;
    return rounded.toString();
}

/**
 * @return {number}
 */
function RatePrice (rateValue, priceValue) {
    //Меняем Price вариантами
    // 0 : rate = price
    // 1 : rate = 1 / price
    // 2 : rate = 2 * price
    switch (rateValue) {
        case '2':
            return 2 * priceValue;
        case '1' :
            return 1 / priceValue;
        default:
            return priceValue
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            units: 1,
            rate: '0',
            price: 10,
            total: 10,
            changed: 'total',
            error: 'Error: no errors'
        };

        this.handleUnitsChange = this.handleUnitsChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleTotalChange = this.handleTotalChange.bind(this);
        this.handleRateSelect = this.handleRateSelect.bind(this);
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    handleRateSelect (rate) {
        //Выбранный вариант расчета Rate
        const rt = RatePrice(rate, this.state.price);
        const tot = Rounded2 (this.state.units * rt);

        this.setState({
            rate: rate,
            total: tot
        });

    }

    handleUnitsChange(un, ch) {
        //При изменении Units пересчитываем значение Total
        this.setState({ units: un });

        const pr = this.state.price;
        if (Number(pr) > 0) {
            const rt = RatePrice(this.state.rate, this.state.price);
            const tot = Rounded2 (un * rt);
            this.setState({
                units: un,
                total: tot,
                changed: ch,
                error: 'Error: no errors'
            });
        } else {
            this.setState({
                units: un,
                error: 'Error: division by zero'
            });
        }

    }
    handlePriceChange(pr) {
        //При изменении Price пересчитываем исходя из логики, что менялось последним (units/total).
        //По умолчанию - total
        this.setState({ price: pr });

        if (this.state.changed === 'total') {
            if (Number(pr) > 0) {
                const un = Rounded2 (this.state.total / pr);
                this.setState({
                    price: pr,
                    units: un,
                    error: 'Error: no errors'
                });
            } else {
                this.setState({
                    price: pr,
                    error: 'Error: division by zero'})
            }
        }
        if (this.state.changed === 'units') {
            if (Number(pr) > 0) {
                const rt = RatePrice(this.state.rate, pr);
                const tot = this.state.units * rt;
                this.setState({
                    price: pr,
                    total: tot,
                    error: 'Error: no errors'
                });
            } else {
                this.setState({
                    price: pr,
                    error: 'Error: division by zero'})
            }
        }
    }
    handleTotalChange(tot, ch) {
        //При изменении Total пересчитываем Units

        const pr = this.state.price;
        if (pr !== '' && pr.length > 0 && Number(pr) > 0) {
            const un = Rounded2(tot / this.state.price);
            this.setState({
                units: un,
                total: tot,
                changed: ch,
                error: 'Error: no errors'
            });
        } else {
            this.setState({
                total: tot,
                error: 'Error: division by zero'})
        }
    }

    render() {
        return (
            <div style={{width: '400px', margin: 'auto'}}>
                <h2>Units Price Total</h2>
                <hr />
                    <div className="container">
                        <Units
                            units={this.state.units}
                            onUnitChange={this.handleUnitsChange}/>
                        <Price
                            price={this.state.price}
                            onPriceChange={this.handlePriceChange}/>
                        <RateSelect
                            onRateSelect={this.handleRateSelect}/>
                        <Total
                            total={this.state.total}
                            onTotalChange={this.handleTotalChange}/>
                        <p/>
                    </div>
                    <div className="alert alert-info" role="alert">
                        Last edit: {this.state.changed}
                    </div>
                    <div className="alert alert-danger" role="alert">
                        {this.state.error}
                    </div>
            </div>
        );
    }
}