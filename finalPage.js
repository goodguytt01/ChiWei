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
    ScrollView,
    Alert
} from 'react-native';

var {height, width} = Dimensions.get('window');
var MateriaList = require('./listView-demo');

class MateriaAdd extends Component {


    fetchData() {
        AsyncStorage.getItem("imageList")
            .then((value) => {
                items = value;
                items =  JSON.parse(items);
                item = items[items.length-1];
                this.setState({"source":item.avatarSource});
            })
            .catch((error) => console.info(error))
            .done();
    }


    constructor(props, context){
        super(props, context);
        this.state = {
            level: ['初级','中级', '高级'],
            levelSelectedValue : '初级',
            levelValue:'',
            timeValue:'',
            thingDesc:'',
            story:'',
            tips:'',
            steps:new Array(),
            list:new Array(),
            thingDescList: '',
            dosageList:'',
            picList:'',
            picDescList:''
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("materiaList")
            .then((value) => {
                if (value !== null){
                    console.info(JSON.parse(value));
                    this.setState({
                        steps: value,
                    });
                    console.info(this.state.steps);
                    var thingDescList = '';
                    var dosageList = '';
                    JSON.parse(value).map((item, index) => {
                        if(thingDescList!=''){
                            thingDescList =  thingDescList +","+ item.thingDesc;
                            dosageList = dosageList +","+ item.dosage;
                        }else{
                            thingDescList =  thingDescList + item.thingDesc;
                            dosageList = dosageList + item.dosage;
                        }
                    })
                    this.setState({
                        thingDescList:thingDescList,
                        dosageList:dosageList
                    });
                }
            })
            .catch((error) => console.info(error))
            .done();

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

        AsyncStorage.getItem("imageList")
            .then((value) => {
                if (value !== null){
                    this.setState({
                        list: JSON.parse(value)
                    });
                    var picList = '';
                    var picDescList= '';
                    JSON.parse(value).map((item, index) => {
                        if(picList!=null){
                            picList =  picList + ","+item.avatarSource;
                            picDescList = picDescList+ ","+ item.thingDesc;
                        }else{
                            picList =  picList + item.avatarSource;
                            picDescList = picDescList+  item.thingDesc;
                        }
                    })
                    console.info(picList);
                    console.info(picDescList);
                } else {
                }
            })
            .catch((error) => console.info(error))
            .done();
    }

    addMateria() {
        console.info();
        if(this.state.thingDesc==''){
            Alert.alert(
                '警告',
                '请填写菜谱名称',
            )
            return;
        }
        if(this.state.levelValue==''){
            Alert.alert(
                '警告',
                '请选择菜谱难度',
            )
            return;
        }
        if(this.state.timeValue==''){
            Alert.alert(
                '警告',
                '请选择菜谱完成时间',
            )
            return;
        }
        if(this.state.story==''){
            Alert.alert(
                '警告',
                '请填写背后的故事',
            )
            return;
        }
        if(this.state.tips==''){
            Alert.alert(
                '警告',
                '请填写菜谱小贴士',
            )
            return;
        }
        if(this.state.steps.length==0){
            Alert.alert(
                '警告',
                '请填写菜谱用料',
            )
            return;
        }
        if(this.state.list.length==0){
            Alert.alert(
                '警告',
                '请填写菜谱制作步骤',
            )
            return;
        }
        var level = '';
        if(this.state.levelValue=='初级'){
            level = 1;
        }if(this.state.levelValue=='中级'){
            level = 2;
        }
        if(this.state.levelValue=='高级'){
            level = 3;
        }
        var time = '';
        if(this.state.timeValue=='10分钟左右'){
            time = 1;
        }
        if(this.state.timeValue=='10-30分钟'){
            time = 2;
        }
        if(this.state.timeValue=='30-60分钟'){
            time = 3;
        }
        if(this.state.timeValue=='一个小时以上'){
            time = 4;
        }
        fetch(config.baseUrl+'/Dish/Dish', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                randomKey: config.randomKey,
                secretKey: config.secretKey,
                name:this.state.thingDesc,
                story:this.state.story,
                level:level,
                time:time,
                tips:this.state.tips,
                thingDescList:this.state.thingDescList,
                dosageList:this.state.dosageList,
                picList:this.state.picList,
                picDescList:this.state.picDescList
            })
        }).then((response) => response.text())
            .then((responseText) => {
                Alert.alert(
                    '添加成功',
                    responseText
                )
                AsyncStorage.clear();
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TextInput  editable={false}
                    style={[styles.messageText1]}
                    value={this.state.thingDesc}
                />

                <TextInput         editable={false}

                                   style={[styles.messageText]}
                    value={this.state.story}
                />
                <View style={styles.default}>
                    <Text style={[styles.messageText2]}>时间:</Text>

                    <TextInput
                               style={[styles.messageText2]}
                               value={this.state.timeValue}

                    />
                    <Text style={[styles.messageText2]}>难度:</Text>
                    <TextInput
                               style={[styles.messageText2]}
                               value={this.state.levelValue}

                    />

                </View>
                <Text style={[styles.messageText2]}>食材清单:</Text>

                <MateriaList style={styles.container}/>

                <Text style={[styles.messageText2]}>做法:共{this.state.steps}步</Text>


                {
                    this.state.list.map((item, index) => {
                        return (
                                <View style={styles.container} key={index}>
                                    <Image style={styles.avatar} source={{uri: item.avatarSource}} />
                                    <View style={styles.default}>

                                    <Text>{index+1}</Text>
                                    <Text>{item.thingDesc}</Text>
                                        </View>
                                </View>
                        )
                    })
                }
                <Text style={[styles.messageText2]}>小贴士:</Text>
                <TextInput
                    style={[styles.messageText2]}
                    value={this.state.tips}

                />
                <Button style={{}} textStyle={{fontSize: 12}} style={styles.button1} onPress={this.addMateria.bind(this)}>
                    发布
                </Button>
            </ScrollView>

        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    messageText1: {
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
        width:width,
        height:20,
        marginTop:80,
    },
    messageText: {
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
        borderBottomColor:'black',
        width:width,
        height:20,
        marginTop:20,
    },
    messageText2: {
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'white',
        borderBottomColor:'black',
        width:100,
        height:20,
        marginTop:20,
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100
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
        marginTop:20,
        width: width,
        height:20,
        backgroundColor:'white'
    },
    default: {
        flexDirection: 'row',
    },
});

module.exports = MateriaAdd;
