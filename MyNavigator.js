/**
 * Created by tiantian on 16/7/4.
 */

var ReactNative = require('react-native');
var {
    NavigationBar
} = ReactNative;

class MyNavigator extends NavigationBar {

    constructor(props, context){
        super(props, context);
        this.state = {
            name: '',
        };
    }

}

module.exports = MyNavigator;
