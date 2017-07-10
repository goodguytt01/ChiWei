/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var config = require('./config');
import Button from 'apsl-react-native-button'
var {height, width} = Dimensions.get('window');
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
    ScrollView,
    AsyncStorage
} from 'react-native';
var ImagePickerEdit = require('./imagePickerEdit');

var REQUEST_URL = config.baseUrl+'/Dish/Steps?dishId=11&randomKey='+config.randomKey+"&secretKey="+config.secretKey;

class FirstPageComponent extends Component {

    fetchData() {
        AsyncStorage.getItem("imageList")
            .then((value) => {
                if (value !== null){
                    this.setState({
                        list: JSON.parse(value)
                    });
                } else {
                }
            })
            .catch((error) => console.info(error))
            .done();
    }

    onPressHandle(item,index){
        this.props.navigator.push({ id: 'ImagePickerEdit' , passProps: { item}});
    }

    constructor(props, context){
        super(props, context);
        this.state = {
            list : new Array()
        };
        this.fetchData();
        config.page='ThirdPage';
    }

    gotoLink(){
        this.props.navigator.push({ id: 'ImagePicker' });
    }
    render() {
        contents = this.state.list.map(function (item,index) {
            return (
                <TouchableOpacity  onPress={() => this.onPressHandle()} key={item.avatarSource}>
                <View style={styles.messageText} >
                    <Text>步骤{index+1}</Text>
                </View>
                </TouchableOpacity>
            );
        });
        return (
            <View>
                <View style={styles.warp}>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => this.onPressHandle(item)}>
                                    <View style={styles.messageText} >
                                        <Text>步骤{index+1}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={styles.container} >
                    <Button style={styles.button} textStyle={styles.textStyle}   onPress={this.gotoLink.bind(this)}>+添加步骤</Button>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({

    container: {
        top: 620,
        position: 'absolute',
        width:width,
    },
    warp: {
        flex: 1,
        flexDirection: 'row',
        marginTop:80,
        flexWrap:'wrap',

    },
    messageText: {
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
        width:80,
        height:80,
        marginLeft:10,
        marginTop:10
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
        borderColor:'#ff6600',
        backgroundColor: '#ff6600',
    },
    textStyle: {
        color: 'white'
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
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#C0C0C0',
        width:100
    },
    block: {
        backgroundColor:'yellow',
        width:50,
        flex:1,
        flexDirection: 'column',
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

module.exports = FirstPageComponent;
