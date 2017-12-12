import React, { Component }                 from 'react';
import autoBind                             from 'react-autobind';
import Header                               from './Header';
import { MENU_OPTIONS, MENU_SECTIONS }      from '../config/constants';
import _                                    from 'lodash';

const JUICE = 'juice';


class Menu extends Component{

    constructor(){
        super();
        autoBind(this);
        this.state = {
            error: null,
            mainDish: null,
            beverage: null,
            juice: null
        }
    }

    _handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        let serializedForm = this._serialize(this.refs.menuForm);
        let validForm = this._validateForm(serializedForm);

        if (validForm === null) {
            this.setState({
                error: "Mandatory fields are missing"
            });
        } else {
            this.props.actions.updateSelection(validForm.mainDish, validForm.beverage);
        }
    }

    _validateForm(form) {
        if (_.isEmpty(form)) {
            return null;
        } else {
            let missingMandatory = false;

            MENU_SECTIONS
                .filter(section => section.isMandatory)
                .forEach(section => {
                    if (form[section.name] === undefined) {
                        missingMandatory = true;
                    }
                })

            if (missingMandatory) {
                return null;
            } else {
                if (form['beverage'] === JUICE && form[JUICE] !== undefined) {
                    return {mainDish: form.mainDish, beverage: form.juice}
                } else if (form['beverage'] === JUICE && form[JUICE] === undefined) {
                    return null;
                }
                return form
            }
        }
    }


    _serialize(form) {
        let results = {};

        [...form.getElementsByTagName(['input'])]
            .forEach(element => {
                if (element.type === 'radio') {
                    if (element.checked === true) {
                        results[element.name] = element.value;
                    }
                }
            })
        return results;
    }


    _handleChange(e, category){
        this.setState({
            [category]: e.target.value
        })
    }


    _handleClear(){
        this.setState({
            error: null,
            mainDish: null,
            beverage: null,
            juice: null
        });

        this.props.actions.updateSelection(null, null);
    }

    getClassName(categoryName){
        if(categoryName !== JUICE){
            return 'show';
        } else if(categoryName === JUICE && this.state.beverage === JUICE){
            return 'show';
        }else {
            return 'hide';
        }
    }


    _renderMenuSection(category) {
        let shouldDisplay = this.getClassName(category.name);

        return (
            <div key={category.id} className={shouldDisplay + " section"} name={category.name} >
                <div className="title">{category.caption}:</div>
                <hr/>
                <div className="section-options">
                    {
                        MENU_OPTIONS
                            .filter(option => option.category === category.name)
                            .map(option => {
                                return (
                                    <div key={option.id}>
                                        <input type="radio" ref={category.name} name={category.name}
                                               value={option.name}
                                               checked={this.state[category.name] === option.name}
                                               onChange={(e) => this._handleChange(e, category.name)}/>
                                        <span className="label">{option.caption}</span>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        )
    }


    render() {
        return (
            <div className="menu-container">
                <Header text="Menu"/>
                <form className="menu-form" onSubmit={this._handleSubmit} ref="menuForm">
                    { MENU_SECTIONS.map(section => {
                        return this._renderMenuSection(section)
                    }) }
                    <button className="btn" type="submit">Submit</button>
                    <button className="btn" type="reset" onClick={this._handleClear}>Clear</button>
                </form>
                <div className="error">{this.state.error}</div>
            </div>
        )
    }
}



export default Menu;