/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Picker from 'react-native-picker';
var baseUrl = require('./config');
var SecondPageComponent = require('./SecondPageComponent');
var ImagePicker = require('./imagePicker');
var ImagePickerEdit = require('./imagePickerEdit');

import {
    AppRegistry,
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    Navigator
} from 'react-native';



var TabBarExample = React.createClass({

    statics: {
        title: '<Navigator>',
        description: 'JS-implemented navigation',
    },


    renderScene: function(route, nav) {
        switch (route.id) {


            case 'ImagePicker':
                return <ImagePicker navigator={nav} />;
            case 'ImagePickerEdit':
                return <ImagePickerEdit {...route.passProps} navigator={nav}
                />;
            default:
                return (
                    <SecondPageComponent
                        navigator={nav}
                        message={route.message}
                    />
                );
        }
    },

    render: function() {
        return (
            <View style={{flex:1,marginTop:0}}>

                <Navigator
                    ref={this._setNavigatorRef}
                    style={styles.container}
                    initialRoute={{ message: 'First Scene', }}
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
    },


    componentWillUnmount: function() {
        this._listeners && this._listeners.forEach(listener => listener.remove());
    },

    _setNavigatorRef: function(navigator) {
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
    },
});

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
