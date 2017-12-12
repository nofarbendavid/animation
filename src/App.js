import React, {Component}       from 'react';
import Menu                     from './components/Menu';
import Summary                  from './components/Summary';
import {connect}                from 'react-redux';
import * as MenuActions         from './actions/menuActions';
import {bindActionCreators}     from 'redux'


import './App.css';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Menu
                    actions={this.props.MenuActions}
                />
                <Summary
                    data={this.props.menuData}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const menuData = state.menuReducer;
    return {
        menuData
    }
}


const mapDispatchToProps = (dispatch) => ({
    MenuActions: bindActionCreators(MenuActions, dispatch)
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
