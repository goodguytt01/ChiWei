/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Button from 'apsl-react-native-button'
var config = require('./config');

import {
    AppRegistry,
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    navigator,
    AlertIOS,
    AsyncStorage,
    Alert,
    Image
} from 'react-native';
var config = require('./config');
var {height, width} = Dimensions.get('window');


class MateriaAdd extends Component {
    constructor(props, context){
        super(props, context);

        this.state = {
            thingDesc: '',
            dosage:''
        };
        config.nextStep = '';

    }

    render() {
        return (
            <Image  source={require('./app/resource/images/start/background.jpg')} style={styles.bg}>

                <View style={styles.wrap}>
                    <Image  source={require('./app/resource/images/start/font.png')} style={styles.bg}>
                        </Image>
                </View>
            </Image>
        );
    }
}
var styles = StyleSheet.create({
    wrap: {
        flexDirection: 'column',
        marginTop:120,
    },
    text:{
        color:'#9e005c',
        fontWeight:'bold',
        backgroundColor:'transparent'
    }

});

AppRegistry.registerComponent('AwesomeProject', () => MateriaAdd);