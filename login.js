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
    componentDidMount() {
        AsyncStorage.getItem("mobile")
            .then((value) => {
                if (value !== null){

                    this.setState({thingDesc: value});
                    AsyncStorage.getItem("password")
                        .then((value) => {
                            if (value !== null){
                                this.setState({dosage: value});
                                fetch(config.baseUrl+'/User/User?randomKey='+config.randomKey+'&secretKey='+config.secretKey+'&mobile='+this.state.thingDesc+"&password="+this.state.dosage, {
                                    method: 'Get',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                }).then((response) => response.text())
                                    .then((responseText) => {
                                        var status = JSON.parse(responseText);
                                        if(status.errorCode=='2000'){
                                            this.props.navigator.push({ id: 'FirstPageComponent' });
                                        }else{

                                        }
                                    })
                                    .catch((error) => {
                                        console.warn(error);
                                    });
                            } else {
                            }
                        })
                        .catch((error) => console.info(error))
                        .done();

                } else {
                }
            })
            .catch((error) => console.info(error))
            .done();


    }
    addMateria() {
        if(this.state.thingDesc==''){
            Alert.alert(
                '请填写用户名',
            )
            return;
        }
        if(this.state.dosage==''){
            Alert.alert(
                '请填写用户密码',
            )
            return;
        }
        AsyncStorage.setItem("mobile",this.state.thingDesc);
        AsyncStorage.setItem("password",this.state.dosage);
        fetch(config.baseUrl+'/User/User?randomKey='+config.randomKey+'&secretKey='+config.secretKey+'&mobile='+this.state.thingDesc+"&password="+this.state.dosage, {
            method: 'Get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.text())
            .then((responseText) => {
                var status = JSON.parse(responseText);
                if(status.errorCode=='2000'){
                    this.props.navigator.push({ id: 'FirstPageComponent' });
                }else{
                    Alert.alert(
                        '用户名或者密码错误',
                    )
                }
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    render() {
        return (
            <Image  source={require('./app/resources/images/login/background.jpg')} style={styles.bg}>

            <View style={styles.wrap}>
                    <TextInput onChangeText={(thingDesc) => this.setState({'thingDesc':thingDesc})}
                               style={[styles.input]}
                               placeholder='用户名'
                               ref= "thingDesc"
                    />

                    <TextInput onChangeText={(dosage) => this.setState({'dosage':dosage})}
                               style={[styles.input]}
                               placeholder='密码'
                               secureTextEntry={true}
                    />

                    <Button style={styles.button} textStyle={{fontSize: 12}}      onPress={this.addMateria.bind(this)}>
                        登录
                    </Button>
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
