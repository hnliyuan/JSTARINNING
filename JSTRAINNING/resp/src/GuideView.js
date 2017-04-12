import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import Util from './util/Util';
import { StackNavigator } from 'react-navigation';
import Home from './home/Home';
import ForgetPassWord from './home/ForgetPassWord'
import Register from './home/Register'
import { NavigationActions } from 'react-navigation'



let image1 = require('../src/images/nav1.png');
let image2 = require('../src/images/nav2.png');
let image3 = require('../src/images/nav3.png');




class GuideView extends Component {
	
	constructor(props){
		super(props);
		this.state ={
			page:(dispatch)=>(<ScrollView
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        pagingEnabled={true}
        horizontal={true}>
        <Image source={image1} style={styles.backgroundImage} />
        <Image source={image2} style={styles.backgroundImage} />
        <TouchableHighlight  
				  onPress={() => dispatch(resetAction)}
				>
        	<Image source={image3} style={styles.backgroundImage}/>
        </TouchableHighlight>
      </ScrollView>)
		}
		
		
		// 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
	  // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
	  storage.save({
	    key: 'openState',  // 注意:请不要在key中使用_下划线符号!
	    rawData: { 
	      isOpen: 1
	    },
	    // 如果不指定过期时间，则会使用defaultExpires参数
	    // 如果设为null，则永不过期
	    expires: 1000 * 3600
	  });
		
	}
	
	static navigationOptions = {
    header: ({ state, setParams }) => ({
      // Render a button on the right side of the header
      // When pressed switches the screen to edit mode.
      visible:false
    }),
  };
  
  render() {
  	// 读取
  	const { navigate, dispatch } = this.props.navigation;
	  storage.load({
	    key: 'loginState',
	    autoSync: true,
	    syncInBackground: true,
			syncParams: {
			  extraFetchOptions: {
			  },
			  someFlag: true,
			},
		 }).then(ret => {
		   	this.props.navigation.dispatch(resetAction);
		})
			
    return this.state.page(dispatch);
  }
};


const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
})


//进行导航的注册
const SimpleApp = StackNavigator({
  Guide : { screen: GuideView },
  Home : { screen: Home },
  ForgetPassWord : { screen: ForgetPassWord },
  Register : { screen: Register }
});


var styles = StyleSheet.create({
    contentContainer: {
      width: Util.size.width*3,
      height: Util.size.height,
    },
    backgroundImage: {
      width: Util.size.width,
      height: Util.size.height,
    },
});

export default SimpleApp