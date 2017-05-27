import React, { Component } from 'react'
import { StyleSheet, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import colors from 'HSColors'
import fonts from 'HSFonts'

import Protal from './protal/Protal'
import Search from './search/Search'
import Warning from './alarm/Warning'


import { Tabs, Tab } from 'react-native-elements'

let styles = {}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 'protal'
    }
    this.changeTab = this.changeTab.bind(this)
  }
  changeTab (selectedTab) {
    this.setState({
      selectedTab
    })
  }
  render () {
    const { selectedTab } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <Tabs hidesTabTouch>
        <Tab
          titleStyle={[styles.titleStyle,{color:'gray'}]}
          selectedTitleStyle={[styles.titleSelected, {marginTop: -3, marginBottom: 7,color:'#08527a'}]}
          selected={selectedTab === 'protal'}
          title={selectedTab === 'protal' ? '全览' : null}
          renderIcon={() => <Icon color={'gray'} name='public' size={26} />}
          renderSelectedIcon={() => <Icon color={'#08527a'} name='public' size={26} />}
          onPress={() => this.changeTab('protal')}>
          <Protal toggleSideMenu={this.props.toggleSideMenu} navigation={this.props.navigation} />
        </Tab>
        <Tab
          titleStyle={[styles.titleStyle,{color:'gray'}]}
          selectedTitleStyle={[styles.titleSelected, {marginTop: -3, marginBottom: 7,color:'#08527a'}]}
          selected={selectedTab === 'search'}
          title={selectedTab === 'search' ? '查询' : null}
          renderIcon={() => <Icon color={'gray'} name='search' size={26} />}
          renderSelectedIcon={() => <Icon color={'#08527a'} name='search' size={26} />}
          onPress={() => this.changeTab('search')}>
          <Search toggleSideMenu={this.props.toggleSideMenu} navigation={this.props.navigation} />
        </Tab>
        <Tab
          titleStyle={[styles.titleStyle,{color:'gray'}]}
          selectedTitleStyle={[styles.titleSelected, {marginTop: -3, marginBottom: 7,color:'#08527a'}]}
          selected={selectedTab === 'alarm'}
          title={selectedTab === 'alarm' ? '告警信息' : null}
          renderIcon={() => <Icon color={'gray'} name='notifications-active' size={26} />}
          renderSelectedIcon={() => <Icon color={'#08527a'} name='notifications-active' size={26} />}
          onPress={() => this.changeTab('alarm')}>
          <Warning toggleSideMenu={this.props.toggleSideMenu} navigation={this.props.navigation} />
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

export default App
