import React, { Component } from 'react'
import { View, TouchableHighlight} from 'react-native'
import { FormLabel, FormInput, Text, FormValidationMessage, Button} from 'react-native-elements'
import { ReceiveMsg } from './ReceiveMsg'
import { StackNavigator } from 'react-navigation'
import Util from '../../util/Util'

class PhoneMethod extends Component{
	
	constructor(props){
		super(props)
		this.state = {
			phoneNumber : 0,
		}
	}
	
	
	changePhoneNumber = (phone) => {
		this.setState({phoneNumber : phone});
	}
	
	
	
	render () {
		
		return (
			<View>
				<FormLabel>请输入绑定的手机号码</FormLabel>
				<FormInput onChangeText={this.changePhoneNumber}/>
				<FormValidationMessage>请输入正确的手机号码</FormValidationMessage>
					<Button
					onPress={ () => this.props.navigate('ReceiveMsg') }
				    icon={{name: 'navigate-next'}}
				    backgroundColor='#0cb8f6'
				    buttonStyle={{marginTop: 10, height:40 }}
				    textStyle={{fontSize:20, textAlign:'center'}}
				    title='下一步' />

				
			</View>
		)
	}
}



export default PhoneMethod
