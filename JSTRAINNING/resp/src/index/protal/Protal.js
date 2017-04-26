import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableHighlight, Text, StatusBar } from 'react-native'
import Util from '../../util/Util'
import Icon from 'react-native-vector-icons/MaterialIcons'
class Protal extends Component{
	
    constructor () {
	    super()
  	}
    componentDidMount(){
    	
    }
    
	render() {
		
		const { navigate } = this.props.navigation
		const { toggleSideMenu } = this.props
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.leftBackView}>
		        		<Icon
						  name='account-circle'
						  color='white'
						  size={40}
						  onPress={() => toggleSideMenu()} />
					</View>
					<View style={styles.centerTitle}>
						<Text style={styles.centerText}>水泵全览</Text>
					</View>
					<View style={styles.rightBackView}>
						<Icon
						  name='add-circle'
						  color='white'
						  size={40}
						  onPress={() => alert('展开下拉框')} />
					</View>
				</View>
				<View style={styles.center}>
					
				</View>
				<View style={styles.header}>
					<View style={styles.leftBackView}>
		        		<Text style={styles.centerText}>预留空间</Text>
					</View>
					<View style={styles.centerTitle}>
						<Text style={styles.centerText}>预留空间</Text>
					</View>
					<View style={styles.rightBackView}>
						<Text style={styles.centerText}>预留空间</Text>
					</View>
				</View>
				
			</View>
		)
	}
	
	
}

styles = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: 'column',
        backgroundColor:'white',
	},
	contentContainer:{
        paddingVertical: 20
    },
    header:{
        height: 50,
        width: Util.size.width,
        flexDirection: 'row',
        backgroundColor: '#08527a'
    },
    center:{
        height: Util.size.height-100-StatusBar.currentHeight,
        width: Util.size.width,
        flexDirection: 'row',
    },
    leftBackView:{
        height: 50,
        width: Util.size.width/3,
	    justifyContent: 'flex-start',

	    padding:5,
    },
    rightBackView:{
    	flex: 1,
        height: 40,
        width: Util.size.width/3,
	    alignItems: 'flex-end',
	    margin: 5,
	    
    },
    centerTitle:{
	    height: 40,
        width: Util.size.width/3,
        margin:5,
    },
    centerText:{
	    fontSize: 24,
	    color: 'white',
	    padding: 5,
	    textAlign:'center'
    }
})

export default Protal