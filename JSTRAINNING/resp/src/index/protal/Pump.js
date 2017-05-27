/**
 * Created by Administrator on 2017-05-09.
 */
import React, { Component } from 'react'
import { View ,TouchableHighlight,Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import PumpRunning from './PumpRunning'
import PerformanceCurve from './PerformanceCurve'
import PumpArguments from './PumpArguments'
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

    constructor(props){
        super(props)
        this.state = {
            isRefreshing:false,
        }
    }

    changeIsRefreshing = (value) =>{
        this.setState({isRefreshing:value});
    }


    _onRefresh = () => {
        this.setState({isRefreshing: true});
        this.refs.pumpRefs.refreshData();
    }

    render() {
        const { params } = this.props.navigation.state;
        const { pump } = params;
        return (
           <ScrollableTabView
            tabBarTextStyle={{color:'#08527a'}}
            tabBarUnderlineStyle={{backgroundColor:'#08527a'}}
            tabBarBackgroundColor='white'
            style={styles.container}
            renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
            tabBarPosition='overlayTop'>
                <ScrollView
                    tabLabel='实时数据'
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor="#ff0000"
                            title="刷新..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#ff0000', '#ff0000']}
                            progressViewOffset={50}
                            />
                     }
                >
                    <PumpRunning ref="pumpRefs" pump={pump} navigate={this.props.navigation.navigate} changeIsRefreshing={this.changeIsRefreshing}/>
                </ScrollView>
                <ScrollView tabLabel='性能曲线'
                >
                    <PerformanceCurve ref="pumpRefs"  pump={pump} changeIsRefreshing={this.changeIsRefreshing}/>
                </ScrollView>
                <ScrollView tabLabel='设计参数' >
                    <PumpArguments ref="pumpRefs" pump={pump}/>
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