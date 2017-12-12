import React, { Component }         from 'react';
import Header                       from './Header';


class Summary extends Component {

    _renderSummary() {
        if (this.props.data.mainDish === null || this.props.data.beverage === null ) {
            return <div className="property">empty order</div>
        } else {
            return (
                <div>
                    <div className="property">
                        <span className="property-key">Main Dish:</span>
                        <span className="property-value">{this.props.data.mainDish}</span>
                    </div>

                    <div className="property">
                        <span className="property-key">Beverage:</span>
                        <span className="property-value">{this.props.data.beverage}</span>
                    </div>
                </div>
            )
        }
    }


    render() {
        return (
            <div className="summary-container">
                <Header text="Summary"/>
                <hr/>
                {this._renderSummary()}
            </div>
        )
    }
}


export default Summary;


