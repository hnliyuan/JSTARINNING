import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableHighlight, Text, StatusBar, WebView,TextInput,Alert } from 'react-native'
import Util from '../../util/Util'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import ModalPicker from 'react-native-modal-picker'

import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import {
    List,
    ListItem,
    SideMenu
} from 'react-native-elements'



class Protal extends Component{

    constructor (props) {
        super(props)
        this.state = {
            mayType: MapTypes.NORMAL,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            textInputValue:'',
            areaData:[],
            markers:[],
            zoom:5,
            center:null,
            initValue:'请求数据..',
            pumpData:[],
            markerClickRecord:{},
        };
    }

    componentDidMount() { // 获取位置

        //发起请求获得当前帐号所有地区的数据

        fetch('http://192.168.48.99:8088/reactNativeApp/Search!getAreas.action').then((response) =>{
            if(200 === response.status){
            data = JSON.parse(response._bodyInit);
            this.setState({data:data.data});
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

    _getPumpsByArea = (option) => {
        fetch('http://192.168.48.99:8088/reactNativeApp/Search!getPumpsByArea.action?areaKey='+option.key+'').then((response) =>{
        if(200 === response.status){
            data = JSON.parse(response._bodyInit).data;
            var markers = [];
            for(var i = 0 ; i<data.length ; i++){
            var value = data[i];
                markers.push({
                     latitude:value.latitude,
                    longitude:value.longitude,
                    title:value.name+'@'+value.id,
                })
            }
            var center = {
                latitude:markers[0].latitude,
                longitude:markers[0].longitude
            }
            this.setState({pumpData:data,markers:markers,center:center,zoom:15})
        }else{
            Alert.alert(
                '请求出错',
                '请求发生未知错误',
            )
        }

        }).catch((error) => {
            console.error(error);
        })
        this.setState({textInputValue:option.label})
    }

    render() {


    const { navigate } = this.props.navigation
    const { toggleSideMenu } = this.props
    const { mapShow } = this.state
    return (
        <MenuContext style={{ flex: 1 }}>
        <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.leftBackView}>
        <Icon
            name='account-circle'
            color='white'
            size={32}
            onPress={() => toggleSideMenu()} />
        </View>
            <View style={styles.centerTitle}>
        <ModalPicker
            data={this.state.data}
            initValue={this.state.initValue}
            onChange={(option)=>{ this._getPumpsByArea(option)}}
        >
        <TextInput
            style={styles.centerText}
            editable={false}
            placeholder = {this.state.initValue}
            placeholderTextColor = 'white'
            value={this.state.textInputValue} />

        </ModalPicker>


        </View>
        <View style={styles.rightBackView}>

<Menu onSelect={(value) => alert(`User selected the number ${value}`)}>
<MenuTrigger>
    <Icon
    name='add-circle'
    color='white'
    size={32}
        />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{ marginTop:45 ,borderRadius: 10,backgroundColor:'#0b77b2',width:120}}>
<MenuOption value={1} style={{borderBottomWidth:0.5,borderBottomColor:'white'}}>
<View style={{flexDirection: 'row'}}>
<Icon
    name='search'
    color='white'
    size={20}
        />
        <Text style={{fontSize:14,color:'white',textAlign:'center',marginLeft:10}}>查询水泵</Text>
    </View>

    </MenuOption>
    <MenuOption value={2} style={{borderBottomWidth:0.5,borderBottomColor:'white'}} >
<View style={{flexDirection: 'row'}}>
<Icon
    name='insert-drive-file'
    color='white'
    size={20}
        />
        <Text style={{fontSize:14,color:'white',textAlign:'center',marginLeft:10}}>查看报表</Text>
    </View>
    </MenuOption>
    <MenuOption value={3} style={{}} >
<View style={{flexDirection: 'row'}}>
<Icon
    name='wallpaper'
    color='white'
    size={20}
        />
        <Text style={{fontSize:14,color:'white',textAlign:'center',marginLeft:10}}>扫一扫</Text>
    </View>
    </MenuOption>
    </MenuOptions>
    </Menu>

    </View>
    </View>
    <View style={styles.center}>
    <MapView
        trafficEnabled={this.state.trafficEnabled}
        baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
        zoom={this.state.zoom}
        mapType={this.state.mapType}
        center={this.state.center}
        marker={this.state.marker}
        markers={this.state.markers}
        style={styles.map}
        onMarkerClick={(e)=>{

            if(this.state.markerClickRecord.title === e.title){
                navigate('Pump',{pump:e});
            }else{
                this.setState({markerClickRecord:e})
            }

        }}
    >
</MapView>
    </View>
    </View>
    </MenuContext>
)
}


}

styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'white',
    },
    header:{
        height: 50,
        width: Util.size.width,
        flexDirection: 'row',
        backgroundColor: '#08527a'
    },
    center:{
        height: Util.size.height-100-StatusBar.currentHeight,
        width: Util.size.width,
        flexDirection: 'row',
    },
    leftBackView:{
        height:50,
        width: Util.size.width/3,
        alignItems: 'flex-start',
        paddingTop:9,
        paddingLeft:9,
    },
    rightBackView:{
        height:50,
        width: Util.size.width/3,
        alignItems: 'flex-end',
        paddingTop:9,
        paddingRight:9,
    },
    centerTitle:{
        height: 50,
        width: Util.size.width/3,
    },
    centerText:{
        fontSize: 20,
        color: 'white',
        textAlign:'center',
        paddingTop:10,
    },
    map: {
        height:Util.size.height-100-StatusBar.currentHeight,
        width:Util.size.width,
    }

})

export default Protal