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
	  			<TouchableHighlight onPress={() => goBack()}  >
	  				<Text style={{width:40,fontSize:16,color:'white',marginRight:10}}>{'完成'}</Text>
	  			</TouchableHighlight>
	  		)
	  		
	  })
	  
	}
	

	render (){
		
		return (
			<Grid containerStyle={{marginTop:20}}>

				<Row containerStyle={{height:40,marginTop:40}}>
					<Col >
						<FormLabel labelStyle={{textAlign:'right',fontSize:20}}>当前手机号码是:</FormLabel>
					</Col>
					<Col >
						<TextInput inputStyle={{readonly:true}}>15581670603</TextInput>
					</Col>
					<Col>
					</Col>
				</Row>
				
				
				<Row containerStyle={{height:40,marginTop:40}}>
					<Col >
						<FormLabel labelStyle={{textAlign:'right',fontSize:20}}>请输入收到的短信验证码:</FormLabel>
					</Col>
					<Col >
						<TextInput ></TextInput>
					</Col>
					<Col>
						<Button
						onPress={ () => this.props.navigate('ReceiveMsg') }
					    icon={{name: 'done'}}
					    backgroundColor='#0cb8f6'
					    textStyle={{fontSize:20, textAlign:'center'}}
					    title='重新发送验证码' />
					</Col>
				</Row>

				<Row containerStyle={{height:40,marginTop:40}}>
					<Col>
					</Col>
					<Col>
						<Button
						onPress={ () => this.props.navigate('ReceiveMsg') }
					    icon={{name: 'done'}}
					    backgroundColor='#0cb8f6'
					    textStyle={{fontSize:20, textAlign:'center'}}
					    title='确认' />
					</Col>
					<Col>
					</Col>
				</Row>
			</Grid>
		)
	}
	
}



export default ReceiveMsg
