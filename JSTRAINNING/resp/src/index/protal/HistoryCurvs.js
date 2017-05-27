/**
 * Created by Administrator on 2017-05-16.
 */
import React , { Component } from 'react'
import { View, Text, TouchableHighlight, } from 'react-native'
import Echarts from 'native-echarts';

export default class HistoryCurvs extends Component {


    static navigationOptions = {
            header: ({ navigate ,state, setParams, goBack, dispatch }) => ({
                style : {backgroundColor:'#08527a'},
                title :  state.params.title+'' + ' 历史曲线',
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

    constructor(props) {
        super(props);
        this.state = {
            option : {},
            title : ''
        }
    }

    componentWillMount() {
        const { pump,meterId,dType } = this.props.navigation.state.params;
        fetch(global.webUrl + '/reactNativeApp/DeepSearch!getChartData.action?id='+meterId+'&dType='+dType+'&start='+'20170518'+'&end='+'20170518').then((response) =>{
            if(response.status === 200){
                let datas = JSON.parse(response._bodyInit);
                let filterOption = this.getOption(datas);
                this.setState({option: filterOption, title: datas.title})
            }
        })
    }


    render(){
        return (
            <View style={{flex:1}}>
                <View style={{height:50,justifyContent: 'center',alignItems: 'center',}}>
                    <Text style={{fontSize:16,textAlign:'center',color:'#08527a'}}>{this.state.title}</Text>
                </View>
                <Echarts option={this.state.option} height={300} />
            </View>
        )
    }



    getOption = (dataObj) => {

        var _axisLabel = {};
        if(dataObj.xInterval == "auto"){
            _axisLabel.interval = 'auto';
            _axisLabel.formatter = function(value){
                return value.substring(11,16);
            }
        }else{
            _axisLabel.interval = dataObj.xInterval;
            _axisLabel.formatter = function(value){
                return value.substring(0,11);
            }
        }

        var _markLine = {
            effect:{show :true,color :"#FF0000",scaleSize:2 },
            data: dataObj.limits ? [
                [
                    {name:'上限',value:dataObj.yAxisUp,xAxis:0,yAxis:dataObj.yAxisUp},
                    {name:'上限',value:dataObj.yAxisUp,xAxis:9999999,yAxis:dataObj.yAxisUp}
                ],
                [
                    {name:'下限',value:dataObj.yAxisDown,xAxis:0,yAxis:dataObj.yAxisDown},
                    {name:'下限',value:dataObj.yAxisDown,xAxis:9999999,yAxis:dataObj.yAxisDown}
                ]
            ] : []
        };


        //如果没数据，则清空标注阀值线，不然报错
        var legendData = [];
        var seriesData = [];

        if(dataObj.yAxis){
            if(dataObj.yAxis.length  == 0){
                _markLine = {};
            }
            for(var i=0;i<dataObj.yAxis.length;i++){
                var name = dataObj.yAxis[i].name;
                var _datas = dataObj.yAxis[i].datas;

                legendData.push(name);

                var seriesObj = {
                    symbol:'none',
                    name:name,
                    type:'line',
                    data:_datas,
                    markLine:_markLine
                };
                seriesData.push(seriesObj);
            }
        }

                            // var colors = ['#f9ba00','#0bc70b'];
                            // option = {
                            //     color: colors,
                            //     legend: {
                            //         data:['2015 降水量', '2016 降水量']
                            //     },
                            //     grid: {
                            //         top: 70,
                            //         bottom: 50
                            //     },
                            //     xAxis: [
                            //         {
                            //             type: 'category',
                            //             axisTick: {
                            //                 alignWithLabel: true
                            //             },
                            //             axisLine: {
                            //                 onZero: false,
                            //                 lineStyle: {
                            //                     color: colors[1]
                            //                 }
                            //             },
                            //             axisPointer: {
                            //                 label: {
                            //                     formatter: function (params) {
                            //                         return '降水量  ' + params.value
                            //                             + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            //                     }
                            //                 }
                            //             },
                            //             data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]
                            //         },
                            //         {
                            //             type: 'category',
                            //             axisTick: {
                            //                 alignWithLabel: true
                            //             },
                            //             axisLine: {
                            //                 onZero: false,
                            //                 lineStyle: {
                            //                     color: colors[0]
                            //                 }
                            //             },
                            //             axisPointer: {
                            //                 label: {
                            //                     formatter: function (params) {
                            //                         return '降水量  ' + params.value
                            //                             + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            //                     }
                            //                 }
                            //             },
                            //             data: ["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"]
                            //         }
                            //     ],
                            //     yAxis: [
                            //         {
                            //             type: 'value'
                            //         }
                            //     ],
                            //     series: [
                            //         {
                            //             name:'2015 降水量',
                            //             type:'line',
                            //             xAxisIndex: 1,
                            //             smooth: true,
                            //             data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                            //         },
                            //         {
                            //             name:'2016 降水量',
                            //             type:'line',
                            //             smooth: true,
                            //             data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
                            //         }
                            //     ]
                            // };

        let colors = ['#f9ba00','#0bc70b','#dc143c','#0c17e3'];
        var option  = {
            color:colors,
            legend: {data:legendData},
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis : [
                {
                    type : 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    // boundaryGap : false,
                    // axisLabel:_axisLabel,
                    data : dataObj.xAxis
                }
            ],
            yAxis : [
                {
                    // name:dataObj.unit,
                    // max: dataObj.yMax,
                    type : 'value',
                    // axisLabel : {
                    //     formatter: dataObj.isFormater?'{value}%':'{value}'
                    // }
                }
            ],
            series : seriesData
        };

        return option;
    }

}