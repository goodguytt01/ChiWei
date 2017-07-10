/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    WebView
} from 'react-native';

var {height, width} = Dimensions.get('window');

var IndexMenu = require('./indexMenu');

class indexPage extends Component {


    constructor(props, context){
        super(props, context);

        this.state = {
            url: 'http://www.iyidun.com/index/index.html',
            scalesPageToFit:true
        };
    }

    render() {
        return (
            <View style={styles.wrap}>
                <WebView
                    automaticallyAdjustContentInsets={true}
                    style={styles.webView}
                    source={{uri: this.state.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                />
                <IndexMenu/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection:'row'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    wrap: {
        flex:1,
        width:width,
        backgroundColor: '#FFFFFF',
        width:width,
    },
    inner: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    default: {
        flex:1,
        width:width,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginTop:20
    },

    webView: {
        height: 350,
    },
});

module.exports = indexPage;