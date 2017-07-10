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
            <Image  source={require('./app/resources/images/login/background.jpg')} style={styles.bg}>

            <View style={styles.wrap}>


            </View>
                </Image>
        );
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
        marginTop:20,
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
        flex:1,
        height:25
    },
    text: {
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
        flex:1,
    },
    button: {
        marginTop:20,
        borderColor:'white',
        backgroundColor: 'white',
        width:width,
        height:40
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
    },
    wrap: {
        flexDirection: 'column',
        marginTop:80
    },
    corton: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'flex-end',
        marginTop:10
    },
    bg: {
        opacity: 0.8,
    },

});

module.exports = MateriaAdd;
