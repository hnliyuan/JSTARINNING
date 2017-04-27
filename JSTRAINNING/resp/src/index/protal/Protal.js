import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableHighlight, Text, StatusBar, WebView,TextInput } from 'react-native'
import Util from '../../util/Util'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
    MapView, 
    MapTypes, 
    Geolocation 
} from 'react-native-baidu-map';
import ModalPicker from 'react-native-modal-picker'

import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';


class Protal extends Component{
	
    constructor () {
	    super()
        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 15, 
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            textInputValue:''
        };
  	}
    
	componentDidMount() { // 获取位置
        Geolocation.getCurrentPosition().then(
            (data) => {
                this.setState({
                    zoom:18,
                    markers:[{
                        latitude:data.latitude,
                        longitude:data.longitude,
                        title:'我的位置'
                    }],
                    center:{
                        latitude:data.latitude,
                        longitude:data.longitude,
                    }
                })
            }
        ).catch(error => {
            console.warn(error,'error')
        })
        
    }
    
	render() {
		let index = 0;
        const data = [
            { key: index++, section: true, label: '湖南' },
            { key: index++, label: '长沙' },
            { key: index++, label: '湘潭' },
            { key: index++, label: '株洲' },
            { key: index++, label: '浏阳' },
            { key: index++, label: '益阳' },
            { key: index++, section: true, label: '广东' },
            { key: index++, label: '广州' },
            { key: index++, label: '佛山' },
            { key: index++, label: '东莞' },
            { key: index++, label: '珠海' },
            { key: index++, label: '韶关' },
            { key: index++, label: '清远' },
            { key: index++, label: '梅州' },
            { key: index++, label: '惠州' }
        ];

		const { navigate } = this.props.navigation
		const { toggleSideMenu } = this.props
		const { mapShow } = this.state
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.leftBackView}>
		        		<Icon
						  name='account-circle'
						  color='white'
						  size={32}
						  onPress={() => toggleSideMenu()} />
					</View>
					<View style={styles.centerTitle}>
		                <ModalPicker
		                    data={data}
		                    initValue="选择地区..."
		                    onChange={(option)=>{ this.setState({textInputValue:option.label})}}
	                    >
		                    <TextInput
		                        style={styles.centerText}
		                        editable={false}
		                        placeholder = "选择地区..."
		                        placeholderTextColor = 'white'
		                        value={this.state.textInputValue} />
		                        
		                </ModalPicker>
						
						
					</View>
					<View style={styles.rightBackView}>
						<Icon
							  name='add-circle'
							  color='white'
							  size={32}
							  onPress={() => console.log('in')} />
					</View>
				</View>
				<View style={styles.center}>
					<MapView
		                trafficEnabled={this.state.trafficEnabled}
		                baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
		                zoom={this.state.zoom}
		                mapType={this.state.mapType}
		                center={this.state.center}
		                marker={this.state.marker}
		                markers={this.state.markers}
		                style={styles.map}
		                onMapClick={(e) => {
		                }}
		                >
	                </MapView>
	 				
				</View>
				<View style={styles.header}>
					<View style={styles.leftBackView}>
					</View>
					<View style={styles.centerTitle}>
					</View>
					<View style={styles.rightBackView}>
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
    	height:50,
        width: Util.size.width/3,
	    alignItems: 'flex-start',
	    paddingTop:9,
	    paddingLeft:9,
    },
    rightBackView:{
    	height:50,
        width: Util.size.width/3,
	    alignItems: 'flex-end',
	    paddingTop:9,
	    paddingRight:9,
    },
    centerTitle:{
	    height: 50,
        width: Util.size.width/3,
    },
    centerText:{
	    fontSize: 20,
	    color: 'white',
	    textAlign:'center',
	    paddingTop:10,
    },
    map: {
    	height:Util.size.height-100-StatusBar.currentHeight,
    	width:Util.size.width,
    }

})

export default Protal