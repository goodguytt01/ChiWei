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
    TextInput,
} from 'react-native';

var {height, width} = Dimensions.get('window');
import Button from 'apsl-react-native-button'


class PacePage extends Component {

    constructor(props, context){
        super(props, context);

        this.state = {
            mobile: '',
            validCode:'',
            password:''
        };
    }
    
    render() {
        return (
            <View style={styles.wrap}>
                <View style={styles.default1}>

                <TextInput onChangeText={(thingDesc) => this.setState({'thingDesc':thingDesc})}
                               style={[styles.input]}
                               placeholder='请输入手机号码'
                               ref= "thingDesc"
                    />
                    </View>
               <View style={styles.default}>
                    <TextInput onChangeText={(dosage) => this.setState({'dosage':dosage})}
                               style={[styles.input1]}
                               placeholder='请输入验证码'
                    />
                   <Button style={{borderColor:'white',backgroundColor: 'white',width:80,height:25,marginLeft:40}} textStyle={{fontSize: 12,color:'#342a20'}}>
                       获取验证码
                   </Button>
               </View>
                <Button style={{borderColor:'#ff6600',backgroundColor: '#ff6600',width:width-200,height:20,marginTop:10,marginLeft:100}} textStyle={{fontSize: 12,color:'white'}}>
                    下一步
                </Button>
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
        flexDirection: 'column',
        backgroundColor:'#f5f5f5'
    },
    inner: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
    },
    default: {
        flex:0,
        width:width,
        flexDirection: 'row',
        borderColor:'#f5f5f5',
        borderTopWidth:1,
        borderBottomWidth:1,
        backgroundColor:'#f8f8f8'
    },
    default1: {
        flex:0,
        width:width,
        borderColor:'#f5f5f5',
        borderBottomWidth:1,
        marginTop:80,
    },
    default2: {
        flex:0,
        width:width,
        borderColor:'#f5f5f5',
        borderBottomWidth:1,
    },
    input: {
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
        height:25,
        width:width,
    },
    input1: {
        fontSize: 17,
        height:25,
        width:width/1.5,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
    },
    input2: {
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
        borderTopWidth:1,
        height:25,
        width:width,
    },
});

module.exports = PacePage;