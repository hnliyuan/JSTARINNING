import React, { Component } from 'react'
import { View, StyleSheet,TouchableHighlight,Text ,TextInput}  from 'react-native'
import { FormLabel, FormInput, Button, Grid, Row, Col } from 'react-native-elements'


class UpdatePassword extends Component{
	constructor(props) {
		super(props)
	}
	
	static navigationOptions = {
	  header: ({ state, setParams, goBack }) => ({
	  		style : {backgroundColor:'#0cb8f6'},
	  		title : '修改密码',
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
		const { navigate } = this.props.navigation
		
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
							<FormLabel labelStyle={{textAlign:'right'}}>新的密码:</FormLabel>
						</Col>
						<Col >
							<TextInput ></TextInput>
						</Col>
						<Col >
							
						    
						</Col>
				</Row>
				
				<Row containerStyle={{height:40,marginTop:10}}>
						<Col >
							<FormLabel labelStyle={{textAlign:'right'}}>确认密码:</FormLabel>
						</Col>
						<Col >
							<TextInput ></TextInput>
						</Col>
						<Col >
						</Col>
				</Row>
				<Button
							onPress={ () => this.props.navigation.navigate('RegisterSuccess') }
						    icon={{name: 'done'}}
						    backgroundColor='#0cb8f6'
						    buttonStyle={{height:40,marginTop:10}}
						    textStyle={{fontSize:20, textAlign:'center'}}
						    title='提交' />
			</Grid>
		)
	}
}

styles = StyleSheet.create({
	container:{
		flex:1,
		margin:10,
		flexDirection: 'row',
	}
})

export default UpdatePassword