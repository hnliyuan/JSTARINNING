import React, { Component } from 'react'
import { View , Text, StyleSheet, Image }  from 'react-native'
import {
  List,
  ListItem,
  SideMenu
} from 'react-native-elements'
import Protal from './protal/Protal'
import App from './App'

let styles = {}

class Index extends Component{
	
	static navigationOptions = {
	    header: ({ state, setParams }) => ({
	      visible:false //隐藏header
	    }),
  	};
  
	constructor () {
		super()
		this.state = {
			isOpen:false
		}
	}

	toggleSideMenu = () => {
	    this.setState({
	      isOpen: !this.state.isOpen
	    })
  	}
	
	onSideMenuChange = (isOpen: boolean) => {
	    this.state = {
	      isOpen: isOpen
	    }
  	}
	
	_navigator = (navigate,linkType) => {
		if(linkType) {
			switch(linkType) {
				case 'R'  :
					navigate('RuntimeData');
					break;
				case 'W'  :
				  navigate('WarnningData');
					break;
				case 'P'  :
				  navigate('PrivateData');
					break;
				case 'H' :
				  navigate('History');
					break;
				case 'S' :
				  navigate('Setting');
					break;
				case 'SA' :
				  navigate('UserSetting');
					break;
			}
		}
	}

	render(){
			const { navigate } = this.props.navigation
		 	const src = require('../../src/images/LeftLogo.png')
	    const list = [
	      {
	        name: '我的运行报告',
	        icon: 'assignment',
	        type: 'R'
	      },
	      {
	        name: '查看告警信息',
	        icon: 'warning',
	        type: 'W',
	      },
	      {
	        name: '我的收藏',
	        icon: 'collections',
	        type: 'P',
	      },
	      {
	        name: '历史查看记录',
	        icon: 'history',
	        type: 'H',
	      },
	      {
	        name: '系统设置',
	        icon: 'settings',
	        type: 'S',
	      },
	      {
	        name: '帐号设置',
	        icon: 'supervisor-account',
	        type: 'SA',
	      },
	      {
	        name: '退出当前登录',
	        icon: 'settings-power'
	        
	      }
	    ]
	
	    const MenuComponent = (
	      <View style={{flex: 1, backgroundColor: '#08527a', paddingTop: 30,borderWidth:1,borderColor:'#08527a'}}>
	        <View style={{backgroundColor: '#08527a', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', padding: 10,}}>
	        	<Image
	            source={src}
	            style={styles.logo} />
	        </View>
	        <List containerStyle={{marginBottom: 20,}}>
	        {
	          list.map((l, i) => (
	            <ListItem
	            
	              onPress={() => this._navigator(navigate,l.type)}
	              key={i}
	              title={l.name}
	              leftIcon={{name: l.icon}}
	              
	            />
	          ))
	        }
	        </List>
	      </View>
	    )
	    
		return (
		      <SideMenu
		        isOpen={this.state.isOpen}
		        onChange={this.onSideMenuChange}
		        menu={MenuComponent}>
		        <App toggleSideMenu={this.toggleSideMenu} navigation={this.props.navigation} />
		      </SideMenu>
		)
	}
}

styles = StyleSheet.create({
  logo: {
    width: 160,
    height: 34
  },
})


 
export default Index


