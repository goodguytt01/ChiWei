/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';

var {height, width} = Dimensions.get('window');


class IndexMenu extends Component {
    render() {
        return (
            <View style={styles.wrap}>
                <Image source={require('./img/line.png')} style={{width:width}}/>
                <View style={styles.default}>
                    <View style={styles.inner}>
                        <Image source={require('./img/sy.png')} style={{marginLeft:30}}/>
                        <Text style={{marginTop:5,marginLeft:28,color:'#666666'}}>首页</Text>
                    </View>
                    <View style={styles.inner}>
                        <Image source={require('./img/fx.png')} style={{marginLeft:20}}/>
                        <Text style={{marginTop:6,marginLeft:18,color:'#666666'}}>发现</Text>
                    </View>

                    <View style={styles.inner}>
                        <Image source={require('./img/j.png')} style={{marginLeft:20}}/>
                    </View>
                    <View style={styles.inner}>
                        <Image source={require('./img/xx.png')} style={{marginLeft:20}}/>
                        <Text style={{marginTop:5,marginLeft:18,color:'#666666'}}>消息</Text>
                    </View>
                    <View style={styles.inner}>
                        <Image source={require('./img/wd.png')} style={{marginLeft:15}}/>
                        <Text style={{marginTop:5,marginLeft:13,color:'#666666'}}>我的</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row'
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
        flex: 1,
        width: width,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        top: height - 70,
        position: 'absolute',
        width: width,
    },
    inner: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    default: {
        flex: 1,
        width: width,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginTop: 20
    },
});

module.exports = IndexMenu;
