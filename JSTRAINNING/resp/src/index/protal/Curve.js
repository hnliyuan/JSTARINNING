/**
 * Created by Administrator on 2017-05-12.
 */
import React, { Component } from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'
import { StockLine } from 'react-native-pathjs-charts'

const testStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        marginTop:50,
    },
});


export default class Curve extends Component {

    constructor(props) {
        super(props)
    }


    refreshData = () => {

}



render() {
    let data = [
        [{
            "x": 0,
            "y": 47782
        }, {
            "x": 1,
            "y": 48497
        }, {
            "x": 2,
            "y": 77128
        }, {
            "x": 3,
            "y": 73413
        }, {
            "x": 4,
            "y": 58257
        }, {
            "x": 5,
            "y": 40579
        }, {
            "x": 6,
            "y": 72893
        }]
    ]
    let options = {
        width:Dimensions.get('window').width-55,
        height:300,
        color: '#2980B9',
        margin: {
            top: 10,
            left: 35,
            bottom: 30,
            right: 15
        },
        animate: {
            type: 'delayed',
            duration: 200
        },
        axisX: {
            showAxis: true,
            showLines: true,
            showLabels: true,
            showTicks: true,
            zeroAxis: false,
            orient: 'bottom',
            tickValues: [
                {value:'name1'},
                {value:'name2'},
                {value:'name3'},
                {value:'name4'},
                {value:'name5'},
                {value:'name6'},
                {value:'name7'}
            ],
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#34495E'
            }
        },
        axisY: {
            showAxis: true,
            showLines: true,
            showLabels: true,
            showTicks: true,
            zeroAxis: false,
            orient: 'left',
            tickValues: [],
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                fill: '#34495E'
            }
        }
    }

    return (
        <View style={testStyles.container}>
<StockLine data={data} options={options} xKey='x' yKey='y' />
        </View>
)
}


}