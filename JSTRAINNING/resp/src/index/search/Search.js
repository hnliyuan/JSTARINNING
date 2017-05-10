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
import {
  List,
  ListItem,
  SideMenu
} from 'react-native-elements'



class Search extends Component{
	
    constructor (props) {
	    super(props)
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
			<MenuContext style={{ flex: 1 }}>
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
							
								<Menu onSelect={(value) => alert(`User selected the number ${value}`)}>
									<MenuTrigger>
										<Icon
										  name='add-circle'
										  color='white'
										  size={32}
										  />
								    </MenuTrigger>
								    <MenuOptions optionsContainerStyle={{ marginTop:45 ,borderRadius: 10,backgroundColor:'#0b77b2',width:120}}>
								        <MenuOption value={1} style={{borderBottomWidth:0.5,borderBottomColor:'white'}}>
								        	<View style={{flexDirection: 'row'}}>
								        		 <Icon
												  name='search'
												  color='white'
												  size={20}
												  />
								          		<Text style={{fontSize:14,color:'white',textAlign:'center',marginLeft:10}}>查询水泵</Text>
								        	</View>
								         
								        </MenuOption>
								        <MenuOption value={2} style={{borderBottomWidth:0.5,borderBottomColor:'white'}} >
												<View style={{flexDirection: 'row'}}>
								        		 <Icon
												  name='insert-drive-file'
												  color='white'
												  size={20}
												  />
								          		<Text style={{fontSize:14,color:'white',textAlign:'center',marginLeft:10}}>查看报表</Text>
								        	</View>
								        </MenuOption>
								        <MenuOption value={3} style={{}} >
												<View style={{flexDirection: 'row'}}>
								        		 <Icon
												  name='wallpaper'
												  color='white'
												  size={20}
												  />
								          		<Text style={{fontSize:14,color:'white',textAlign:'center',marginLeft:10}}>扫一扫</Text>
								        	</View>
								        </MenuOption>
							      	</MenuOptions>
								</Menu>
							
						</View>
					</View>
						<View style={styles.center}>
							
						</View>
				</View>
			</MenuContext>
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

export default Search