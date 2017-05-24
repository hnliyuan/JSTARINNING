/**
 * Created by Administrator on 2017-05-09.
 */

import React , { Component } from 'react'
import {View,StyleSheet,Text, Alert } from 'react-native'
import Util from '../../util/Util'
import { List, ListItem } from 'react-native-elements'
import * as Progress from 'react-native-progress';


const progressStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop:50,
        paddingVertical: 20,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    circles: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progress: {
        margin: 10,
    },
});


class PumpRunning extends Component{

    constructor(props){
        super(props)
        this.state = {
            powerData:[],
            voltageData:[],
            transDatas:[],
            progress: 0,
            indeterminate: true,
        }
    }

    getEmptyString = (number) =>{
        let emptyStr = "";
        if(number){
            for(var k = 0 ; k < number ; k++){
                emptyStr = emptyStr + ' ';
            }
        }
        return emptyStr;
    }




    refreshData = () => {
            pumpId = this.props.pump.title.substring(this.props.pump.title.indexOf('@') + 1,this.props.pump.title.length);
            fetch('http://192.168.48.99:8088/reactNativeApp/Search!getPumpRunningDataById.action?pumpId='+pumpId+'').then((response) =>{
                if(200 === response.status){
                data = JSON.parse(response._bodyInit);

                let powerData = data.powerData;
                let voltageData = data.voltageData;
                let transDatas = data.transDatas[0];

                let formartPowerData = [];
                let formartVoltageData = [];
                let formartTransDatas = [];

                if(powerData){
                    for(var i = 0 ; i < powerData.length; i++){
                        let power = powerData[i];
                        let value = '--';
                        if(power.value && power.value!=value){
                            value = new Number(power.value).toFixed(3);
                        }
                        let unit = '';
                        if(power.unit){
                            unit = '('+power.unit+')';
                        }
                        formartPowerData.push({
                            id:power.id,
                            dType:power.dType,
                            title:power.name+ unit,
                            icon:power.icon,
                            rightTitle:value,
                        })
                    }
                }



                if(voltageData){
                    for(var i = 0 ; i < voltageData.length; i++){
                        let voltage = voltageData[i];
                        let value = '--';
                        if(voltage.value){
                            value = new Number(voltage.value).toFixed(3);
                        }
                        let unit = '';
                        if(voltage.unit){
                            unit = '('+voltage.unit+')';
                        }
                        formartVoltageData.push({
                            id:voltage.id,
                            dType:voltage.dType,
                            title:voltage.name+ unit,
                            icon:voltage.icon,
                            rightTitle:value,
                        })
                    }
                }
                if(transDatas){
                    for(var i = 0 ; i < transDatas.length; i++){
                        let trans = transDatas[i];
                        let value = '--';
                        if(trans.value){
                            value = new Number(trans.value).toFixed(3);
                        }

                        let unit = '';
                        if(trans.transName == '流量' || trans.transName=='出口流量'){
                            unit = '(立方米/h)';
                        }
                        else if (trans.transUnit){
                            unit = '('+trans.transUnit+')';
                        }

                        formartTransDatas.push({
                            transId:trans.transId,
                            transName:trans.transName,
                            dtype:trans.dtype,
                            title:trans.transName + unit,
                            icon:'av-timer',
                            rightTitle:value,
                        })
                    }
                }

                if(formartPowerData.length>0){
                    this.setState({powerData:formartPowerData,voltageData:formartVoltageData,transDatas:formartTransDatas});
                    this.props.changeIsRefreshing(false);

                }
            }else{
                Alert.alert(
                    '请求出错',
                    '请求发生未知错误',
                )
            }

        }).catch((error) => {
                Alert.alert(
                    '请求出错',
                    '请求发生未知错误',
                )
                this.props.changeIsRefreshing(false);
        })
    }

    componentDidMount(){
        this.refreshData();
    }


    render(){

        const { pump } = this.props
        const { navigate } = this.props


        if(this.state.powerData.length == 0 ){
            return (
                <View style={progressStyles.container}>
                    <View style={progressStyles.circles}>
                        <Progress.CircleSnail
                            style={progressStyles.progress}
                            color={[
                                '#F44336',
                                '#2196F3',
                                '#009688',
                            ]}
                        />
                    </View>
                </View>
            )
        }


        return (
            <View style={pumpRunningStyles.container}>
                <Text style={{width:Util.size.width,textAlign:'center',marginTop:15,fontSize:16,color:'#08527a'}}>电力数据</Text>
            <List>
                {
                    this.state.powerData.map((item, i) => (
                        <ListItem
                        key={i}
                        title={item.title}
                        leftIcon={{name: item.icon,style:{width:24}}}
                        rightTitle={item.rightTitle ? item.rightTitle + ' ' : ' '}
                        rightTitleStyle={{color:'white'}}
                        rightTitleContainerStyle={{backgroundColor:'#08527a',borderRadius: 5}}
                        // rightIcon={{style:{display:'none'}}}
                        // hideChevron={true}
                        onPress={()=>{
                            navigate('HistoryCurvs',{pump:pump,title:item.title, meterId:item.id, dType:item.dType})
                        }}
                            />
                    ))
                 }
            </List>
            <Text style={{width:Util.size.width,textAlign:'center',marginTop:15,fontSize:16,color:'#08527a'}}>计算数据</Text>
            <List>
            {
                this.state.voltageData.map((item, i) => (
                    <ListItem
                    key={i}
                    title={item.title}
                    leftIcon={{name: item.icon,style:{width:24}}}
                    rightTitle={item.rightTitle ? item.rightTitle + ' ' : ' '}
                    rightTitleStyle={{color:'white'}}
                    rightTitleContainerStyle={{backgroundColor:'#08527a',borderRadius: 5}}
                    // rightIcon={{style:{display:'none'}}}
                    // hideChevron={true}
                    onPress={()=>{
                        navigate('HistoryCurvs',{pump:pump,title:item.title, meterId:item.id, dType:item.dType})
                    }}
                        />
                ))
            }
            </List>
            <Text style={{width:Util.size.width,textAlign:'center',marginTop:15,fontSize:16,color:'#08527a'}}>传感器数据</Text>
            <List>
            {
                this.state.transDatas.map((item, i) => (
                    <ListItem
                    key={i}
                    title={item.title}
                    leftIcon={{name: item.icon,style:{width:24}}}
                    rightTitle={item.rightTitle ? item.rightTitle + ' ' : ' '}
                    rightTitleStyle={{color:'white'}}
                    rightTitleContainerStyle={{backgroundColor:'#08527a',borderRadius: 5}}
                    // rightIcon={{style:{display:'none'}}}
                    // hideChevron={true}
                    onPress={()=>{
                        navigate('HistoryCurvs',{pump:pump,title:item.transName, meterId:item.transId, dType:item.dtype})
                    }}
                    />
                ))
            }
        </List>
            </View>
        )
    }

}

const pumpRunningStyles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        marginTop:50,

    }
})

export default PumpRunning