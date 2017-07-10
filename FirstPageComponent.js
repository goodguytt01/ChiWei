/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Picker from 'react-native-picker';
var config = require('./config');
var global = require('./Global');
var MateriaList = require('./listView-demo');

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

var {height, width} = Dimensions.get('window');

class FirstPageComponent extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            level: ['初级','中级', '高级'],
            levelSelectedValue : '初级',
            levelValue:'',
            timeValue:'',
            thingDesc:'',
            story:'',
            tips:''
        };
        config.nextStep='下一步';
    }
    componentDidMount() {
        AsyncStorage.getItem("thingDesc")
            .then((value) => {
                if (value !== null){
                    console.info(value);
                    this.setState({thingDesc: value});
                } else {
                }
            })
            .catch((error) => console.info(error))
            .done();
        AsyncStorage.getItem("timeValue")
            .then((value) => {
                if (value !== null){
                    this.setState({timeValue: value});
                } else {
                }
            })
            .catch((error) => console.info(error))
            .done();
        AsyncStorage.getItem("levelValue")
            .then((value) => {
                if (value !== null){
                    this.setState({levelValue: value});
                } else {
                }
            })
            .catch((error) => console.info(error))
            .done();
        AsyncStorage.getItem("story")
            .then((value) => {
                if (value !== null){
                    console.info(value);
                    this.setState({story: value});
                } else {
                }
            })
            .catch((error) => console.info(error))
            .done();
        AsyncStorage.getItem("tips")
            .then((value) => {
                if (value !== null){
                    console.info(value);
                    this.setState({tips: value});
                } else {
                }
            })
            .catch((error) => console.info(error))
            .done();
    }
    addMateria(){
        this.props.navigator.push({ id: 'materia' });
    }

    storageData(){
        console.info('stored');
        AsyncStorage.setItem("thingDesc",this.state.thingDesc).done();
        AsyncStorage.setItem("story",this.state.story).done();
        AsyncStorage.setItem("tips",this.state.tips).done();
    }
    _onPressHandle(){
        this.setState({ level: ['初级','中级', '高级'],levelSelectedValue:'初级'});
        this.picker.toggle();
    }
    _onPressHandleTime(){
        this.setState({ level: ['10分钟左右','10-30分钟','30-60分钟','一个小时以上'],levelSelectedValue:'10分钟左右'});
        this.picker.toggle();
    }
    render() {
        return (
            <View style={styles.default}
            >
                <TextInput
                    onChangeText={(thingDesc) => this.setState({"thingDesc":thingDesc})}
                           style={[styles.messageText]}
                    onChange={this.storageData.bind(this)}
                           placeholder='菜谱名称'
                    value={this.state.thingDesc}
                />
                <View style={styles.defaultColumn}>
                <TouchableOpacity  onPress={this._onPressHandle.bind(this)}>
                        <Text  style={[styles.inputRow]} >难度</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.inputRow]}
                        value={this.state.levelValue}
                    />

                    <TouchableOpacity  onPress={this._onPressHandleTime.bind(this)}>
                        <Text  style={[styles.inputRow]} >时间</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.inputRow]}
                        value={this.state.timeValue}
                    />
                </View>
                <MateriaList style={styles.default}/>
                <TouchableOpacity  onPress={this.addMateria.bind(this)}>
                    <Text  style={[styles.input]} >+再加一种用料</Text>
                </TouchableOpacity>

                <TextInput
                    onChangeText={(story) => this.setState({"story":story})}
                    style={[styles.messageText1]}
                    onChange={this.storageData.bind(this)}
                    placeholder='关于这道菜背后的故事'
                    value={this.state.story}
                />
                <TextInput
                    onChangeText={(tips) => this.setState({"tips":tips})}
                    style={[styles.messageText1]}
                    onChange={this.storageData.bind(this)}
                    placeholder='小贴士'
                    value={this.state.tips}
                />

                <View style={{height: 400}}>

                    <Picker
                        ref={picker => this.picker = picker}
                        style={{height: height/2}}
                        showDuration={300}
                        pickerData={this.state.level}
                        selectedValue={this.state.levelSelectedValue}
                        onPickerDone={(pickedValue) => {
                        if(pickedValue[0].indexOf('级')!=-1){
                            this.setState({ levelValue: pickedValue[0] });
                            AsyncStorage.setItem("levelValue",pickedValue[0]);
                        }else if(pickedValue[0].indexOf('分')!=-1){
                           this.setState({ timeValue: pickedValue[0] });
                           AsyncStorage.setItem("timeValue",pickedValue[0]);
                        }
					}}
                    />
                </View>

            </View>
        );
    }
}

var styles = StyleSheet.create({
    defaultColumn: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        marginTop:20
    },
    messageText: {
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
        width:width,
        height:20,
    },
    messageText1: {
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
        width:width,
        height:20,
        marginTop:20,
    },
    input: {
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        marginTop:15,
        borderColor:'white',
        width:width,
        height:20,
    },

    inputRow: {
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        marginTop:15,
        borderColor:'white',
        width:width/4,
        height:20,
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
        flex:1,
        backgroundColor: '#f5f5f5',
        marginTop:80,
        flexDirection:'column'
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
    box: {
        flexDirection:'column',
        flex:1,
        width:width,
        height:20,
    },
});

module.exports = FirstPageComponent;
