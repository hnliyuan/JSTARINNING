/**
 * Created by Administrator on 2017-05-09.
 */
import React, { Component } from 'react'
import { View ,TouchableHighlight,Text, StyleSheet, ScrollView } from 'react-native'
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import PumpRunning from './PumpRunning'

class Pump extends Component{

    static navigationOptions = {
            header: ({ navigate ,state, setParams, goBack, dispatch }) => ({
                style : {backgroundColor:'#08527a'},
                title : state.params.pump.title.substring(0,state.params.pump.title.indexOf('@')),
                titleStyle : {color:'white',alignSelf:'center',fontWeight:'normal'},
                left : (
                <TouchableHighlight onPress={() => goBack()}  >
                <Text style={{width:40,fontSize:16,color:'white',marginLeft:10}}>{'返回'}</Text>
                </TouchableHighlight>
                ),
                right : (
                <TouchableHighlight onPress={() => console.log('')}  >
                <Text style={{width:40,fontSize:16,color:'white',marginRight:10}}>{''}</Text>
                </TouchableHighlight>
                )
            })
    }


    componentDidMount(){

    }

    render() {
        const { params } = this.props.navigation.state;
        const { pump } = params;
        return (
           <ScrollableTabView
            tabBarTextStyle={{color:'#08527a'}}
            tabBarUnderlineStyle={{backgroundColor:'#08527a'}}
            style={styles.container}
            renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
            tabBarPosition='overlayTop'>
                <ScrollView tabLabel='实时数据'>
                    <PumpRunning pump={pump} />
                </ScrollView>
                <ScrollView tabLabel='性能曲线'>
                    <Icon name='logo-android' color='#A4C639' size={300} style={pumpStyles.icon} />
                    <Icon name='logo-android' color='black' size={300} style={pumpStyles.icon} />
                    <Icon name='logo-android' color='brown' size={300} style={pumpStyles.icon} />
                </ScrollView>
                <ScrollView tabLabel='历史数据'>
                    <Icon name='logo-android' color='#A4C639' size={300} style={pumpStyles.icon} />
                    <Icon name='logo-android' color='black' size={300} style={pumpStyles.icon} />
                    <Icon name='logo-android' color='brown' size={300} style={pumpStyles.icon} />
                </ScrollView>
                <ScrollView tabLabel='报表数据'>
                        <Icon name='logo-android' color='#A4C639' size={300} style={pumpStyles.icon} />
                        <Icon name='logo-android' color='black' size={300} style={pumpStyles.icon} />
                        <Icon name='logo-android' color='brown' size={300} style={pumpStyles.icon} />
                </ScrollView>
                <ScrollView tabLabel='设计参数'>
                        <Icon name='logo-android' color='#A4C639' size={300} style={pumpStyles.icon} />
                        <Icon name='logo-android' color='black' size={300} style={pumpStyles.icon} />
                        <Icon name='logo-android' color='brown' size={300} style={pumpStyles.icon} />
                </ScrollView>
            </ScrollableTabView>
        )
    }


}
const pumpStyles = StyleSheet.create({
    container: {
        marginTop: 30,

    },
    icon: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
});

export default Pump