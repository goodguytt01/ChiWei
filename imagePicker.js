import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Image,
    Platform,
    TextInput,
    AlertIOS,
    AsyncStorage,
    Alert
} from 'react-native';
var config = require('./config');
var secretKey = config.secretKey;
var randomKey = config.randomKey;
import ImagePicker from 'react-native-image-picker';
import Button from 'apsl-react-native-button'
REQUEST_URL = config.baseUrl+'/Dish/Step'
export default class App extends React.Component {
    postData () {

    }

    postData () {
        console.info(this.state.thingDesc);
        if(this.state.avatarSource==null){
            Alert.alert(
                '请选择图片',
            )
            return;
        }
        if(this.state.thingDesc==null){
            Alert.alert(
                '请填写制作步骤',
            )
            return;
        }
        let  API_URL = "http://222.73.17.5:8080/upload"
        let data = new FormData()
        data.append('image', {uri: this.state.avatarSource, name: 'image.jpg', type: 'image/jpg'})
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
            },
            body: data,
        }
        return fetch(API_URL,config)
            .then((response) => response.json())
            .then((responseData) => {
                img = responseData.returnValue;
                var items = null;
                AsyncStorage.getItem("imageList")
                    .then((value) => {
                        items = value;
                        if(items==null||items==undefined){
                            items = new Array();
                            var item = new Object();
                            item.avatarSource = img;
                            item.thingDesc = this.state.thingDesc;
                            items.push(item);
                        }else{
                            var item = new Object();
                            item.avatarSource = img;
                            item.thingDesc = this.state.thingDesc;
                            items =  JSON.parse(items);
                            items.push(item);
                        }
                        AsyncStorage.setItem("imageList",JSON.stringify(items));
                        this.props.navigator.push({ id: 'SecondPage' });
                    })
                    .catch((error) => console.info(error))
                    .done();
            })
            .done();
    }
    state = {
        avatarSource: null,
        thingDesc:null,
    };

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;

                // You can display the image using either:
                source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                // Or:
                // if (Platform.OS === 'android') {
                //   source = {uri: response.uri, isStatic: true};
                // } else {
                //   source = {uri: response.uri.replace('file://', ''), isStatic: true};
                // }

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    selectVideoTapped() {
        const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            mediaType: 'video',
            videoQuality: 'medium'
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled video picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    videoSource: response.uri
                });
            }
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                        { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                            <Image style={styles.avatar} source={this.state.avatarSource} />
                        }
                    </View>
                    </TouchableOpacity>
                <TextInput onChangeText={(thingDesc) => this.setState({'thingDesc':thingDesc})}
                           style={[styles.input]}
                           placeholder='请填写你的制作步骤'
                />
            
                <Button style={styles.button} textStyle={styles.textStyle}   onPress={this.postData.bind(this)}>上传图片</Button>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
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
        marginLeft:40,
    },
    button: {
        width: 300,
        height:20,
        marginTop:40,
        marginLeft:40,
    }
});

module.exports = App;
