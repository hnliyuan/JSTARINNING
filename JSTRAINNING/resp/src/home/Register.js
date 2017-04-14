import React, { Component } from 'react'
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'


class Register extends Component{
	
	static navigationOptions = {
	  header: ({ state, setParams, goBack }) => ({
	  		style : {backgroundColor:'#0cb8f6'},
	  		title : '验证手机号码',
	  		titleStyle : {color:'white',alignSelf:'center',fontWeight:'normal'},
	  		left : (
	  			<TouchableHighlight onPress={() => goBack()}  >
	  				<Text style={{width:40,fontSize:16,color:'white',marginLeft:10}}>{'<返回'}</Text>
	  			</TouchableHighlight>
	  		),
	  		right : (
  				<Text style={{width:40,fontSize:16,color:'white',marginRight:10}}>{' '}</Text>
	  		)
	  		
	  })
	  
	}
		
	render() {
		return (
			<View>
				<FormLabel>请输入您的手机号码</FormLabel>
				<FormInput />
					<Button
					onPress={ () => this.props.navigation.navigate('ReceiveMsg') }
				    icon={{name: 'navigate-next'}}
				    backgroundColor='#0cb8f6'
				    buttonStyle={{marginTop: 10, height:40 }}
				    textStyle={{fontSize:20, textAlign:'center'}}
				    title='下一步' />
			</View>
		)
	}
	
}

export default Register
 