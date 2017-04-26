import React, { Component } from 'react'
import { ScrollView, TouchableHighlight, View, StyleSheet, Platform, Image, Dimensions, StatusBar, BackAndroid} from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation';
import Register from './Register'
import ForgetPassWord from './ForgetPassWord'
import ReceiveMsg from './findPassMethod/ReceiveMsg'
import UpdatePassword from './findPassMethod/UpdatePassword'
import RegisterSuccess from './findPassMethod/RegisterSuccess'
import RuntimeData from '../../src/drawer/RuntimeData'
import WarnningData from '../../src/drawer/WarnningData'
import PrivateData from '../../src/drawer/PrivateData'
import History from '../../src/drawer/History'
import Index from '../../src/index/Index'
import Setting from '../../src/drawer/Setting'
import UserSetting from '../../src/drawer/UserSetting'
import {
  Text,
  Button,
  Grid,
  Col,
  Row,
  FormLabel, 
  FormInput,
  CheckBox 
} from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'




let styles = {}

const { width, height } = Dimensions.get('window');
let logoImg = require('../../src/images/logo.png');

class Home extends Component {
	
	static navigationOptions = {
    header: ({ state, setParams }) => ({
      visible:false //隐藏header
    }),
  };
  
	constructor(props) {
	    super(props);
	    this.state = {
	      size: { width, height },
	      imgSize: { width, height:height*0.3 },
	      checked:false
	    };
  }
	
	
  render () {
  	const { navigate } = this.props.navigation;
  	const { params } = this.props.navigation.state;
  	//剔除引导页
  	
    return (
    <Grid>
		  <Row size={30}>
		  	<View style={[this.state.imgSize,{backgroundColor:'#0cb8f6'}]}>
		  		<Image source={logoImg} style={this.state.imgSize} resizeMode={Image.resizeMode.center} />
		  	</View>
		  </Row>
		  <Row size={60}>
		  	<View style={[{ backgroundColor:'white',width:this.state.size.width }]}>
		  		<FormLabel><Text>登录帐号</Text></FormLabel>
					<FormInput placeholder='请输入手机号码/邮箱地址/帐号名...'  placeholderTextColor='#dcdcdc' />
					<FormLabel><Text>密码</Text></FormLabel>
					<FormInput placeholder='请输入密码...'  secureTextEntry={true} placeholderTextColor='#dcdcdc' />
					<Button
			    backgroundColor='#0cb8f6'
			    buttonStyle={{marginTop: 10, height:40 }}
			    textStyle={{fontSize:20, textAlign:'center'}}
			    onPress={ ()=> this.props.navigation.dispatch(resetAction) }
			    title='登录' />
					<Grid containerStyle={{width:this.state.size.width, marginTop:20}}>
						<Col>
							<TouchableHighlight onPress={() => navigate('ForgetPassWord')} >
								<View>
									<Text style={{fontSize:14, textAlign:'center', color:'#0cb8f6'}}>忘记密码?</Text>
								</View>
							</TouchableHighlight>
						</Col>
						<Col>
							<TouchableHighlight onPress={() => navigate('Register')} >
								<View>
									<Text style={{fontSize:14, textAlign:'center', color:'#0cb8f6'}}>新用户注册</Text>
								</View>
								
							</TouchableHighlight>
						</Col>
					</Grid>
		  	</View>
		  </Row>
		  <Row size={10}>
		  	<View style={[{backgroundColor:'#0cb8f6',width:this.state.size.width}]}>
		  		<Text style={[{color: 'white', textAlign:'center' }]} >湖南睿胜能效管理技术有限公司</Text>
		  		<Text style={[{color: 'white', textAlign:'center',fontSize:8 }]} >Copyright ◎ 2010 HUNAN RESP ENERGY EFFICIENCY MANAGEMENT TECHNOLOGY CO.,LTD.ALL RIGHTS RESERVED.</Text>
		  	</View>
		  </Row>
		</Grid>
    )
  }
}


styles = StyleSheet.create({
  swiperContainer: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
})

//进行导航的注册
const SimpleApp = StackNavigator({
  Home : { screen: Home },
  ForgetPassWord : { screen: ForgetPassWord },
  Register : { screen: Register },
  ReceiveMsg : { screen: ReceiveMsg },
  UpdatePassword : {  screen: UpdatePassword  },
  RegisterSuccess  : { screen:  RegisterSuccess },
  Index  : { screen:  Index },
  RuntimeData: {screen:RuntimeData},
	WarnningData: {screen:WarnningData},
	PrivateData: {screen:PrivateData},
	History: {screen:History},
	UserSetting: {screen:UserSetting},
	Setting: {screen:Setting},
	
});


const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Index'})
  ]
})



export default SimpleApp
