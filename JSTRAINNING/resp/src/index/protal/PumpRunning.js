/**
 * Created by Administrator on 2017-05-09.
 */

import React , { Component } from 'react'
import {View,StyleSheet,Text } from 'react-native'
import Util from '../../util/Util'
import { List, ListItem } from 'react-native-elements'

class PumpRunning extends Component{

    constructor(props){
        super(props)
        this.state = {
            powerData:[],
            voltageData:[],
            transDatas:[]
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

    componentDidMount(){



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
                        let value = new Number(power.value).toFixed(3);
                        formartPowerData.push({
                            title:power.name+ '('+power.unit+')',
                            icon:power.icon,
                            rightTitle:value,
                        })
                    }
                }



                if(voltageData){
                    for(var i = 0 ; i < voltageData.length; i++){
                        let voltage = voltageData[i];
                        let value = new Number(voltage.value).toFixed(3);
                        formartVoltageData.push({
                            title:voltage.name+ '('+voltage.unit+')',
                            icon:voltage.icon,
                            rightTitle:value,
                        })
                    }
                }
                if(transDatas){
                    for(var i = 0 ; i < transDatas.length; i++){
                        let trans = transDatas[i];
                        let value = new Number(trans.transVal).toFixed(3);
                        if(trans.transName === '流量'){
                            trans.transUnit= '立方米';
                        }
                        formartTransDatas.push({
                            title:trans.transName+ '('+trans.transUnit+')',
                            icon:'av-timer',
                            rightTitle:value,
                        })
                    }
                }

                if(formartPowerData.length>0){
                    this.setState({powerData:formartPowerData,voltageData:formartVoltageData,transDatas:formartTransDatas});
                }




            }else{
                Alert.alert(
                    '请求出错',
                    '请求发生未知错误',
                )
            }

        }).catch((error) => {
            console.error(error);
        })
    }


    render(){
        const list = [
            {
                title: '电流',
                icon: 'av-timer'
            },
            {
                title: '线电压',
                icon: 'flight-takeoff'
            },
            {
                title: '电机输入功率',
                icon: 'flight-takeoff'
            },
            {
                title: '功率因素',
                icon: 'flight-takeoff'
            },
        ]

        const { pump } = this.props

        return (
            <View style={pumpRunningStyles.container}>
                <Text style={{width:Util.size.width,textAlign:'center',marginTop:15,fontSize:16,color:'#08527a'}}>电力数据</Text>
                <List>
                    {
                        this.state.powerData.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={{name: item.icon}}
                                rightTitle={item.rightTitle}
                                rightTitleStyle={{color:'white'}}
                                rightTitleContainerStyle={{backgroundColor:'#08527a',borderRadius: 5}}
                                rightIcon={{style:{display:'none'}}}
                                hideChevron={true}

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
                            leftIcon={{name: item.icon}}
                            rightTitle={item.rightTitle}
                            rightTitleStyle={{color:'white'}}
                            rightTitleContainerStyle={{backgroundColor:'#08527a',borderRadius: 5}}
                            rightIcon={{style:{display:'none'}}}
                            hideChevron={true}
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
                                leftIcon={{name: item.icon}}
                                rightTitle={item.rightTitle}
                                rightTitleStyle={{color:'white'}}
                                rightTitleContainerStyle={{backgroundColor:'#08527a',borderRadius: 5}}
                                rightIcon={{style:{display:'none'}}}
                                hideChevron={true}
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