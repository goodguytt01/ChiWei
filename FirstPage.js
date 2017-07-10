/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Picker from 'react-native-picker';
var baseUrl = require('./config');
var FirstPageComponent = require('./FirstPageComponent');
var MateriaAdd = require('./materia');

import {
    AppRegistry,
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    Navigator,
} from 'react-native';



class TabBarExample extends Component {

    constructor (props) {
        super(props);
        this.state = {
            myText: '',
            mapper:props.mapper
        }
        props.mapper.setNextStep('啊啊啊');
    }
    newRandomRoute() {
        return {
            title: '#' + Math.ceil(Math.random() * 1000),
            id:'FirstPageComponent',
        };
    }

    renderScene(route, nav) {
        console.info(this.state);
        switch (route.id) {
            case 'materia':
                return <MateriaAdd navigator={nav} />;
            case 'breadcrumbs':
                return <BreadcrumbNavSample navigator={nav} />;
            case 'jumping':
                return <JumpingNavSample navigator={nav} />;
            case 'firstPage':
                return <FirstPageComponent navigator={nav}/>;
            default:
                return (
                    <FirstPageComponent
                        navigator={nav} mapper={this.state.mapper}
                    />
                );
        }
    }

    render(){
        return (
            <View style={{flex:1,marginTop:0}}>

                <Navigator
                    ref={this._setNavigatorRef}
                    style={styles.container}
                    initialRoute={this.newRandomRoute()}
                    renderScene={this.renderScene}
                    configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
                />
            </View>
        );
    }


    componentWillUnmount(){
        this._listeners && this._listeners.forEach(listener => listener.remove());
    }

    _setNavigatorRef(navigator) {
        if (navigator !== this._navigator) {
            this._navigator = navigator;

            if (navigator) {
                var callback = (event) => {
                    console.log(
                        `TabBarExample: event ${event.type}`,
                        {
                            route: JSON.stringify(event.data.route),
                            target: event.target,
                            type: event.type,
                        }
                    );
                };
                // Observe focus change events from the owner.
                this._listeners = [
                    navigator.navigationContext.addListener('willfocus', callback),
                    navigator.navigationContext.addListener('didfocus', callback),
                ];
            }
        }
    }
}

var styles = StyleSheet.create({
    messageText: {
        fontSize: 17,
        marginTop: 80,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
        height:25,
        flex:1
    },
    input: {
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        marginTop:15,
        borderColor:'white',
        flex:1,
    },
    text: {
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        marginTop:15,
        borderColor:'white',
        flex:1,
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CDCDCD',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
    },
    navBar: {
        backgroundColor: 'white',
    },
    scroll: {
        backgroundColor: 'yellow',
        height:25,
        flex:1
    },
    navBarText: {
        fontSize: 16,
        marginVertical: 10,
    },
    navBarTitleText: {
        color: '#373E4D',
        fontWeight: '500',
        marginVertical: 9,
    },
    default: {
        flexDirection: 'row',
        backgroundColor: '#C0C0C0'
    },
    navBarLeftButton: {
        paddingLeft: 10,
    },
    navBarRightButton: {
        paddingRight: 10,
    },
    navBarButtonText: {
        color: '#5890FF',
    },
    scene: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#EAEAEA',
    },
    picker: {
        width: 100,
    },
});

module.exports = TabBarExample;
