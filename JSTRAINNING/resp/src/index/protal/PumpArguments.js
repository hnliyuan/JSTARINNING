/**
 * Created by Administrator on 2017-05-09.
 */

import React , { Component } from 'react'
import {View,StyleSheet,Text, Alert } from 'react-native'
import Util from '../../util/Util'
import { List, ListItem } from 'react-native-elements'
import * as Progress from 'react-native-progress';
import ProcessHolding from './ProcessHolding'


class PumpArguments extends Component{

    constructor(props){
        super(props)
        this.state = {
            pumpArgsData : []
        }
    }

    refreshData = () => {
        pumpId = this.props.pump.title.substring(this.props.pump.title.indexOf('@') + 1,this.props.pump.title.length);
        fetch('http://192.168.48.99:8088/reactNativeApp/Search!getPumpRunningDataById.action?pumpId='+pumpId+'').then((response) =>{
            if(200 === response.status){
            data = JSON.parse(response._bodyInit);

            let pumpArgsData = data.pumpArgsData;

            let formartPumpArgsData = [];


            if(pumpArgsData){
                // for(var i = 0 ; i < pumpArgsData.length; i++){
                //     let args = pumpArgsData[i];
                //     let value = new Number(args.value).toFixed(3);
                //     formartPowerData.push({
                //         title:power.name+ '('+power.unit+')',
                //         icon:power.icon,
                //         rightTitle:value,
                //     })
                // }
            }
            if(formartPumpArgsData.length>0){
                this.setState({pumpArgsData:formartPumpArgsData});
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
        if(this.state.pumpArgs.length == 0 ){
            return (
                <ProcessHolding/>
            )
        }


        return (
            <View style={pumpArgsStyles.container}>
                <Text style={{width:Util.size.width,textAlign:'center',marginTop:15,fontSize:16,color:'#08527a'}}>铭牌参数</Text>
                <List>
                {
                    this.state.pumpArgs.map((item, i) => (
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

const pumpArgsStyles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        marginTop:50,
    }
})

export default PumpArguments