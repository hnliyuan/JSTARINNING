import React, { Component } from 'react'
import { View, Text, TouchableHighlight, TextInput, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { FormLabel, FormInput, Button, Grid, Row, Col} from 'react-native-elements'
import Util from '../../util/Util'



class ReceiveMsg extends Component{
	
	constructor(props){
		super(props)
	}
	
	static navigationOptions = {
	  header: ({ state, setParams, goBack }) => ({
	  		style : {backgroundColor:'#0cb8f6'},
	  		title : '获取短信验证码',
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
	

	render (){

		
		return (
			<Grid containerStyle={{marginTop:20}}>

				<Row containerStyle={{height:40,marginTop:10}}>
					<Col >
						<FormLabel labelStyle={{textAlign:'right'}}>当前手机号码是:</FormLabel>
					</Col>
					<Col >
						<TextInput inputStyle={{readonly:true}}>15581670603</TextInput>
					</Col>
					<Col>
					</Col>
				</Row>
				
				
				<Row containerStyle={{height:40,marginTop:10}}>
					<Col >
						<FormLabel labelStyle={{textAlign:'right'}}>短信验证码:</FormLabel>
					</Col>
					<Col >
						<TextInput ></TextInput>
					</Col>
					<Col >
						<Button
						onPress={ () => console.log('验证码') }
					    icon={{name: 'cached'}}
					    backgroundColor='#0cb8f6'
					    buttonStyle={{marginTop:0,marginBottom:10,height:30}}
					    textStyle={{fontSize:20, textAlign:'center'}}
					    title='验证码' />
					    
					</Col>
				</Row>
				
				<Button
						onPress={ () => this.props.navigation.navigate('UpdatePassword') }
					    icon={{name: 'done'}}
					    backgroundColor='#0cb8f6'
					    buttonStyle={{height:40,marginTop:10}}
					    textStyle={{fontSize:20, textAlign:'center'}}
					    title='下一步' />
			</Grid>
		)
	}
	
}



export default ReceiveMsg
