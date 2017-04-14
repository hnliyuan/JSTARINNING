import React, { Component } from 'react'
import { View , Text, StyleSheet,Platform }  from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from 'HSColors'
import fonts from 'HSFonts'

import { Tabs, Tab } from 'react-native-elements'
import Protal from './protal/Protal'

let styles = {}

class Index extends Component{
	constructor () {
		super()
	    this.state = {
	      selectedTab: 'home'
	    }
	    this.changeTab = this.changeTab.bind(this)
	}
	changeTab (selectedTab) {
	    this.setState({
	      selectedTab
	    })
  	}
	render(){
		const { selectedTab } = this.state
		return (
			<Tabs hidesTabTouch>
		        <Tab
		          titleStyle={[styles.titleStyle]}
		          selectedTitleStyle={[styles.titleSelected, {marginTop: -3, marginBottom: 7}]}
		          selected={selectedTab === 'protal'}
		          title={selectedTab === 'protal' ? 'Protal' : null}
		          renderIcon={() => <Icon color={colors.grey2} name='whatshot' size={26} />}
		          renderSelectedIcon={() => <Icon color={colors.primary} name='whatshot' size={26} />}
		          onPress={() => this.changeTab('protal')}>
		          <Protal />
		        </Tab>
	      </Tabs>
		)
	}
}

styles = StyleSheet.create({
  titleStyle: {
    ...Platform.select({
      ios: {
        fontFamily: fonts.ios.black
      }
    })
  }
})
 
export default Index


