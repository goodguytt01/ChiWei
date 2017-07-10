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
    Image,
    PixelRatio,
} from 'react-native';


class MateriaAdd extends Component {


    fetchData() {
        AsyncStorage.getItem("imageList")
            .then((value) => {
                if(value!=null){
                items = value;
                items =  JSON.parse(items);
                item = items[items.length-1];
                this.setState({"source":item.avatarSource});
                }
            })

    .catch((error) => console.info(error))
            .done();
    }


    constructor(props, context){
        super(props, context);

        this.state = {
            thingDesc: '',
            dosage:'',
            source:'111'
        };
        this.fetchData();
        
    }

    view(){
        this.props.navigator.push({ id: 'FinalPage'});
    }
    render() {
        console.info(this.state.source);
        return (
            <View style={styles.container}>
                        <Image style={styles.avatar} source={{uri:this.state.source}} />
                <View style={styles.default}>
                    <Button style={styles.button}    >上传成品图+</Button>
                    <Button style={styles.button1}    onPress={this.view.bind(this)} >预览菜单</Button>
                </View>
            </View>

        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 300,
        height: 300
    },
    input: {
        width: 300,
        height:20,
    },
    button: {
        width: 100,
        height:20,
        backgroundColor:'white'
    },
    button1: {
        width: 100,
        height:20,
        marginLeft:40,
        backgroundColor:'white'
    },
    default: {
        flexDirection: 'row',
        marginTop:20
    },
});

module.exports = MateriaAdd;
