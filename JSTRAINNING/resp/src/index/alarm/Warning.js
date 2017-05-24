import React,{ Component } from 'react'
import {View, ListView, Text, StyleSheet, FlatList,Alert,ToastAndroid} from 'react-native'
import Util from '../../util/Util'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Warning extends React.PureComponent {

	constructor(props){
		super(props);
		this.state = {
			memoryList:[],
			warningList:[],
			start:1,
			limit:10,
            refreshing:false,
			updating:false,
		}
	}

	filterWarning = (data) => {

		return data;
	}

	componentDidUpdate(){
		if(this.state.updating){
			this.setState({refreshing:false,updating:false});
		}
	}


	searchWarning=(startIndex)=>{
		this.setState({refreshing:true});
		fetch('http://192.168.48.99:8088/reactNativeApp/DeepSearch!getAlarmJsonDatas.action?alarmLimit='+this.state.limit+'&'+'alarmStart='+startIndex).then((response) =>{
			if(200 === response.status){
				data = JSON.parse(response._bodyInit);
				if(data && data.datas.length>0){
					let tempData = data.datas;
					if(startIndex > this.state.start){
						if(this.state.warningList.length > 0){
							tempData = this.state.warningList.concat(data.datas);
						}
					}
					this.setState({
                        warningList:tempData,
                        start:startIndex,
                        updating:true,
					});
				}else{
                    ToastAndroid.show('没有更多的数据', ToastAndroid.SHORT, ToastAndroid.CENTER);
				}
		}
		}).catch((error) => {
			Alert.alert(
			'请求出错',
			error,
		)
		})
	}

	componentDidMount(){
		this.searchWarning(1);
	}
	render(){
        const { toggleSideMenu } = this.props;
        const { navigate } = this.props.navigation;
		return (
            <View style={warningStyles.container}>
				<View style={warningStyles.searchContent}>
					<Icon
						name='account-circle'
						color='white'
						size={32}
						style={{marginLeft:10,width:40}}
						onPress={() => toggleSideMenu()} />
					<Text style={{width:Util.size.width - 100,color:'white',textAlign:'center'}} >实时告警信息中心</Text>
					<Icon
						name='filter-list'
						color='white'
						size={32}
						onPress={() => {
						}} />
				</View>
				{this.state.warningList.length<=0 ? <View style={warningStyles.searchResult}><Text style={{width:Util.size.width,textAlign:'center',marginTop:15,fontSize:16,color:'#08527a'}}>正在查询请稍后</Text></View> :
					<View style={warningStyles.container}>
							<FlatList
								data={this.state.warningList}
								keyExtractor={this._keyExtractor}
								renderItem={this._renderItem}
								onRefresh={this._onRefresh}
    							refreshing={this.state.refreshing}
    							getItemLayout={(data, index) => ( {length: 110, offset: 110 * index, index} )}
    							onEndReached={this._onEndReached}
								initialNumToRender={6}
    							onEndReachedThreshold={110}
							/>
					</View>
				}



			</View>
		)
	}

	_onEndReached = () =>{
		if(!this.state.refreshing){
            this.searchWarning(this.state.start + 1);
		}
	}

	_onRefresh = () => {
    	if(!this.state.refreshing) {
            this.searchWarning(1);
        }
	}

	_keyExtractor = (item, index) => {
		return index;
	}

	_renderItem = ({item,index}) => {
		return (
            <View style={warningStyles.pumpView}>
				<View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
					<Icon
						name='warning'
						color='#08527a'
						size={60}
							/>
				</View>
				<View style={{flex:4,flexDirection:'column',justifyContent:'center',marginLeft:10}}>
					<View style={{flexDirection:'row'}}>
						<Text style={{fontSize:16,color:'black'}}>{item.pumpName}</Text>
					</View>
					<View style={{flexDirection:'row'}}>
						<Text style={{fontSize:12}}>单位 : {item.enterpriseName}</Text>
					</View>
					<View style={{flexDirection:'row'}}>
						<Text style={{fontSize:12}}>监测仪器 : {item.deviceName}</Text>
					</View>
					<View style={{flexDirection:'row'}}>
						<Text style={{fontSize:12}}>告警描述 : <Text style={{color:'#08527a'}}>{item.alarmDesc}</Text></Text>
					</View>
				</View>
				<View style={{flex:4,flexDirection:'column',justifyContent:'center',marginLeft:10}}>
						<View style={{flexDirection:'row'}}>
							<Text style={{fontSize:12}}>上限 : {item.thresholdUp}</Text>
						</View>
						<View style={{flexDirection:'row'}}>
							<Text style={{fontSize:12}}>下限 : {item.thresholdDown}</Text>
						</View>
						<View style={{flexDirection:'row'}}>
					<Text style={{fontSize:12}}>告警值 : <Text style={{color:'#08527a'}}>{item.alarmValue}</Text></Text>
						</View>
						<View style={{flexDirection:'row'}}>
					<Text style={{fontSize:12}}>发生时间 : {item.alarmTime}</Text>
						</View>
				</View>
				<View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
					<Icon
						name='last-page'
						color='gray'
						size={36}
						onPress={()=>{
							let pump = {title:item.pumpName+'@'+item.pumpId};
        					this.props.navigation.navigate('Pump',{pump:pump});
						}}
					/>
				</View>
		</View>
		)
	}
}

const warningStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        flexDirection: 'column',
    },
    searchContent:{
        height:50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#08527a'
    },
    scrollContainer:{
        backgroundColor:'black'
    },
    searchResult:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
    },
    pumpView:{
        flexDirection: 'row',
        borderTopColor: 'gray',
        borderTopWidth: 1,
        margin:5,
    }
})