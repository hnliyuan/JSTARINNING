import React, { Component } from 'react'
import { View, StyleSheet} from 'react-native'
import { FormLabel, FormInput, Button} from 'react-native-elements'

class EmailMethod extends Component{
	
	render() {
		return (<View>
				<FormLabel>请输入绑定的邮件地址</FormLabel>
				<FormInput />
					<Button
					onPress={ () => console.log('success') }
				    icon={{name: 'navigate-next'}}
				    backgroundColor='#0cb8f6'
				    buttonStyle={{marginTop: 10, height:40 }}
				    textStyle={{fontSize:20, textAlign:'center'}}
				    title='发送验证邮件' />
				</View>)
	}
	
}

styles = StyleSheet.create({
	container :{
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
        alignItems: 'center',
	}
})

export default EmailMethod