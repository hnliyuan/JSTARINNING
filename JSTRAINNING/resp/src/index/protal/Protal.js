import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
class Protal extends Component{
	
    constructor () {
	    super()
  	}
    componentDidMount(){
    	
    }
    
	render() {
		
		return (
			<View style={styles.container}>
				
			</View>
		)
	}
	
	
}

styles = StyleSheet.create({
	container :{
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
	},
	contentContainer: {
      paddingVertical: 20
    }
})

export default Protal