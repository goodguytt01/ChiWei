/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
'use strict';


var React = require('react');
var ReactNative = require('react-native');
var global = require('./Global');
var {
    Navigator,
    ScrollView,
    Picker,
    StyleSheet,
    Text,
    View,
    TextInput,
    AppRegistry,
    TouchableHighlight,
    TouchableOpacity,
} = ReactNative;

var FirstPage = require('./FirstPage');
var FirstPageComponent = require('./FirstPageComponent');
var SecondPage = require('./SecondPage');
var ThirdPage = require('./thirdPage');
var MateriaAdd = require('./materia');
var config = require('./config');
var FinalPage = require('./finalPage');
var Login = require('./login');

var SecondPageComponent = require('./SecondPageComponent');
var ImagePicker = require('./imagePicker');
var ImagePickerEdit = require('./imagePickerEdit');



class NavButton extends React.Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#B5B5B5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

var NavigationBarRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
            return null;
        }


        var previousRoute = navState.routeStack[index - 1];
        return (
            <TouchableOpacity
                onPress={() => navigator.pop()}
                style={styles.navBarLeftButton}>
                <Text style={[styles.navBarText, styles.navBarButtonText]}>
                    上传菜谱
                </Text>
            </TouchableOpacity>
        );
    },

    setNextStep: function(param){
        config.nextStep = param;
    },


    RightButton: function(route, navigator, index, navState) {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.jump(navigator,'');
          }}
                style={styles.navBarRightButton}>
                <Text style={[styles.navBarText, styles.navBarButtonText]}>
                    {config.nextStep}
                </Text>
            </TouchableOpacity>
        );
    },

    jump: function(navigator) {
        navigator.push({ id: config.page })
    },



    Title: function(route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                上传菜谱
            </Text>
        );
    },
};

function newRandomRoute() {
    return {
        title: '#' + Math.ceil(Math.random() * 1000),
        id:'Login',
    };
}


function ListView() {
    return {
        title: '#' + Math.ceil(Math.random() * 1000),
        id:'ListView'
    };
}
var NavigationBarSample = React.createClass({



    componentWillUnmount: function() {
        this._listeners && this._listeners.forEach(listener => listener.remove());
    },


    getInitialState: function() {
        return {
            selected1: 'key0',
            selected2: 'key1',
            selected3: 'key2',
            color: 'red',
            mode: Picker.MODE_DIALOG,
        };
    },


    renderScene: function(route, nav) {
        switch (route.id) {
            case 'FirstPageComponent':
                return <FirstPageComponent navigator={nav}  mapper={NavigationBarRouteMapper}/>;
            case 'Login':
                return <Login navigator={nav}  mapper={NavigationBarRouteMapper}/>;
            case 'SecondPageComponent':
                return <SecondPageComponent navigator={nav}  mapper={NavigationBarRouteMapper}/>;
            case 'SecondPage':
                return <SecondPage navigator={nav} mapper={NavigationBarRouteMapper}/>;
            case 'ThirdPage':
                return <ThirdPage navigator={nav} mapper={NavigationBarRouteMapper}/>;
            case 'FinalPage':
                return <FinalPage navigator={nav} mapper={NavigationBarRouteMapper}/>;
            case 'jumping':
                return <JumpingNavSample navigator={nav} mapper={NavigationBarRouteMapper}/>;
            case 'materia':
                return <MateriaAdd navigator={nav} mapper={NavigationBarRouteMapper}/>;
            case 'ImagePicker':
                return <ImagePicker navigator={nav} mapper={NavigationBarRouteMapper}/>;
            case 'ImagePickerEdit':
                return <ImagePickerEdit {...route.passProps} navigator={nav}
                />;
        }
    },
    render: function() {
        return (
            <Navigator style={styles.default}
                       thingDesc=""
                       debugOverlay={false}
                       initialRoute={newRandomRoute()}
                       renderScene={this.renderScene}
                       navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
            />
        );
    },

});

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
        fontSize: 17,
        backgroundColor:'white',
        borderWidth:1,
        marginTop:10,
        borderColor:'white',
        height:25,
        flex:1
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
        flexDirection: 'row',
        backgroundColor: '#f5f5f5'
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
});



AppRegistry.registerComponent('AwesomeProject', () => NavigationBarSample);
