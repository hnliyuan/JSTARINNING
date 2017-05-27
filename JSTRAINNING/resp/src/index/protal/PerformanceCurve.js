/**
 * Created by Administrator on 2017-05-12.
 */
import React, { Component } from 'react'
import {View, StyleSheet, Dimensions , Alert, Text} from 'react-native'
import Echarts from 'native-echarts';
import ProcessHolding from './ProcessHolding'
import Util from '../../util/Util'

export default class PerformanceCurve extends Component {

    constructor(props) {
        super(props)
        this.state = {
            option1:{},
            option2:{},
            option3:{},
            option4:{}
        }
    }

    getOption1 = (data) => {
        flowLiftSubText = new String('[当月最大：'+data.maxLift +'m]' + '[当月最小：'+data.minLift +'m]'+ '[当前值：'+data.lift +'m]');
        legendFlowLiftData = data.qxFlowLift ? data.qxFlowLift.xdatas : [];
        seriesFlowLiftData = data.qxFlowLift ? data.qxFlowLift.ydatas : [];
        let currentItemStyle = {
            normal:{
                color:'#1b7ef8'
            }
        };
        let pointsFlowLift = [];
        let lift = data.lift ;
        let flow = data.flow ;
        let data1 = [];
        if(data.leftLiftVal){
            data1.push([{
                name: '最佳区间线',
                value: data.leftLiftVal,
                           yAxis: 0,
                           xAxis: data.leftFlowIndex,
                           },{

                    yAxis: data.leftLiftVal,
                           xAxis: data.leftFlowIndex,
                           }
                       ]
            )
            data1.push([{
                name: '最佳区间线1',
                value: data.rightLiftVal,
                           yAxis: 0,
                           xAxis: data.rightFlowIndex,
                           },{
                    yAxis: data.rightLiftVal,
                           xAxis: data.rightFlowIndex,
                           }
                       ])
        }
        let _markLine1 = {
            lineStyle:{
                normal:{
                    width:1,
                    tyle:'solid',
                }
            },
            data:data1
        };

        option1 = {
            animation:false,
            title:{
                x:'center',
                textStyle:{
                    fontSize:10
                },
                text:flowLiftSubText
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: legendFlowLiftData.sort((a, b) => Number(a) > Number(b) ? 1 : -1),
                nameLocation:'middle',
                name:'Q(m³/h)'
            },
            yAxis: {
                type: 'value',
                    axisLabel: {
                    //formatter: '{value} °C'
                },
                name:'H(m)',

            },
            series: [
                {
                    name:'扬程',
                    type:'line',
                    data:seriesFlowLiftData.sort((a, b) => Number(a) < Number(b) ? 1 : -1),
                    markLine:_markLine1,
                 }
            ]
        };
        return option1;
    }

    getOption2 = (data) => {
        let currentValue = '--';
        if(data.flowEfficiencyType && data.flowEfficiencyType===1) {
            currentValue = data.pumpEfficiency;
        }else {
            currentValue = data.motorEfficiency;
        }
        flowEfficiencyText = new String('[当月最大：'+data.maxEfficiency +'%]' + '[当月最小：'+data.minEfficiency +'%]'+ '[当前值：'+ currentValue +'%]');
        legendFlowEfficiencyData = data.qxFlowEfficiency ? data.qxFlowEfficiency.xdatas : [];
        seriesFlowEfficiencyData = data.qxFlowEfficiency ? data.qxFlowEfficiency.ydatas : [];
        let data2 = [];
        if(data.leftEfficiencyVal){
            data2.push([{
                    name: '最佳区间线',
                    value: data.leftEfficiencyVal,
                    yAxis: 0,
                    xAxis: data.leftFlowIndex2,
                },{

                    yAxis: data.leftEfficiencyVal,
                    xAxis: data.leftFlowIndex2,
                }
                ]
            )
            data2.push([{
                name: '最佳区间线1',
                value: data.rightEfficiencyVal,
                yAxis: 0,
                xAxis: data.rightFlowIndex2,
            },{
                yAxis: data.rightEfficiencyVal,
                xAxis: data.rightFlowIndex2,
            }
            ])
        }
        let _markLine2 = {
            lineStyle:{
                normal:{
                    width:1,
                    tyle:'solid',
                }
            },
            data:data2
        };
        option2 = {
            animation:false,
            title:{
                x:'center',
                textStyle:{
                    fontSize:10
                },
                text:flowEfficiencyText
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: legendFlowEfficiencyData.sort((a, b) => Number(a) > Number(b) ? 1 : -1),
                nameLocation:'middle',
                name:'Q(m³/h)'
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show:true,
                    interval:'auto',
                    formatter:'{value}%'
                },
                name:'η'
            },
            series: [
                {
                    name:'效率',
                    type:'line',
                    data:seriesFlowEfficiencyData.sort((a, b) => Number(a) > Number(b) ? 1 : -1),
                    markLine:_markLine2
                }
            ]
        };

        return option2;
    }

    getOption3 = (data) =>{
        flowPowerText = new String('[当月最大：'+data.maxPower +'kW]' + '[当月最小：'+data.minPower +'kW]'+ '[当前值：'+ data.flowPower +'kW]');
        seriesFlowPowerData = data.qxFlowPower ? data.qxFlowPower.ydatas : [];
        legendFlowPowerData = data.qxFlowPower ? data.qxFlowPower.xdatas : [];
        let data3 = [];
        if(data.leftPowerVal){
            data3.push([{
                    name: '最佳区间线',
                    value: data.leftPowerVal,
                    yAxis: 0,
                    xAxis: data.leftFlowIndex3,
                },{
                    yAxis: data.leftPowerVal,
                    xAxis: data.leftFlowIndex3,
                }
                ]
            )
            data3.push([{
                name: '最佳区间线1',
                value: data.rightPowerVal,
                yAxis: 0,
                xAxis: data.rightFlowIndex3,
            },{
                yAxis: data.rightPowerVal,
                xAxis: data.rightFlowIndex3,
            }
            ])
        }
        let _markLine3 = {
            lineStyle:{
                normal:{
                    width:1,
                    tyle:'solid',
                }
            },
            data:data3
        };
        option3 = {
            animation:false,
            title:{
                x:'center',
                textStyle:{
                    fontSize:10
                },
                text:flowPowerText
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: legendFlowPowerData.sort((a, b) => Number(a) > Number(b) ? 1 : -1),
                nameLocation:'middle',
                name:'Q(m³/h)'
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    //formatter: '{value} °C'
                },
                name:'P(kW)'
            },
            series: [
                {
                    name:'功率',
                    type:'line',
                    data:seriesFlowPowerData.sort((a, b) => Number(a) > Number(b) ? 1 : -1),
                    markLine:_markLine3
                }
            ]
        };
        return option3;
    }

    getOption4 = (data) => {
        legendPowerEfficData = data.qxPowerEfficiency ? data.qxPowerEfficiency.xdatas : [];
        seriesPowerEfficData = data.qxPowerEfficiency ? data.qxPowerEfficiency.ydatas : [];
        flowPowerText = new String('[当前值：'+ data.activeEfficiency +'%]');

        option4 = {
                animation:false,
                title:{
                    x:'center',
                    textStyle:{
                        fontSize:10
                    },
                    text:flowPowerText
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: legendPowerEfficData.sort((a, b) => Number(a) > Number(b) ? 1 : -1),
                    nameLocation:'middle',
                    name:'P(kW)'
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        show:true,
                        interval:'auto',
                        formatter:'{value}%'
                    },
                    name:'效率(%)'
                },
                series: [
                    {
                        name:'效率',
                        type:'line',
                        data:seriesPowerEfficData.sort((a, b) => Number(a) > Number(b) ? 1 : -1),
                    }
                ]
            };
            return option4;
    }


    componentDidMount() {

        pumpId = this.props.pump.title.substring(this.props.pump.title.indexOf('@') + 1,this.props.pump.title.length);
        fetch(global.webUrl + '/reactNativeApp/Search!getPumpRunningDataById.action?pumpId='+pumpId+'').then((response) =>{
            if(200 === response.status){
                data = JSON.parse(response._bodyInit);
                this.setState( {
                    option1: this.getOption1(data),
                    option2: this.getOption2(data),
                } )
                setTimeout(()=>{
                    this.setState( {
                        option3: this.getOption3(data),
                        option4: this.getOption4(data),
                    } )
                },5000)
            }
        }).catch((error) => {
            Alert.alert(
            '请求出错',
            error,
            )
            this.props.changeIsRefreshing(false);
        })
    }
    render() {
        return (
                <View style={{flex:1,marginTop:50}}>
                    <View style={{flex:1,height:30,justifyContent:'center',margin:10}}>
                        <Text style={{fontSize:16,textAlign:'center',color:'#08527a'}}>流量-扬程性能曲线</Text>
                    </View>
                    <Echarts option={this.state.option1} height={300} />
                    <View style={{flex:1,height:30,justifyContent:'center',margin:10}}>
                        <Text style={{fontSize:16,textAlign:'center',color:'#08527a'}}>流量-效率性能曲线</Text>
                    </View>
                    <Echarts option={this.state.option2} height={300} />
                    <View style={{flex:1,height:30,justifyContent:'center',margin:10}}>
                        <Text style={{fontSize:16,textAlign:'center',color:'#08527a'}}>流量-功率性能曲线</Text>
                    </View>
                    <Echarts option={this.state.option3} height={300} />
                    <View style={{flex:1,height:30,justifyContent:'center',margin:10}}>
                        <Text style={{fontSize:16,textAlign:'center',color:'#08527a'}}>电机功率-效率性能曲线</Text>
                    </View>
                    <Echarts option={this.state.option4} height={300} />
                </View>
            )
    }


}