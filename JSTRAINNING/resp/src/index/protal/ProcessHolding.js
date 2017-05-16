/**
 * Created by Administrator on 2017-05-16.
 */

import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import * as Progress from 'react-native-progress';

const progressPumpArgsStyles = StyleSheet.create({
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

export default class ProcessHolding extends Component{

    render(){
        return (
                <Progress.CircleSnail
                    style={progressPumpArgsStyles.progress}
                    color={[
                        '#F44336',
                        '#2196F3',
                        '#009688',
                ]}
                />

        )
    }
}