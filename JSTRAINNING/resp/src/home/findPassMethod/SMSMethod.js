import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Button, Grid, Row, Col } from 'react-native-elements'
class SMSMethod extends Component{
	
	render() {
		return (
			<Grid>
			
				<Col>
					<Icon
					  name='done'
					  type='material-community'
					  color='green'
					  size={40}
					/>
				</Col>
				
				<Col>
					
				</Col>
			</Grid>
		)
	}
	
}

styles = StyleSheet.create({
	container :{
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
        alignItems: 'center',
        padding:80,
        borderWidth:1,
	}
})

export default SMSMethod