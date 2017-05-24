import React, { Component } from 'react'
import {View, ScrollView, StyleSheet,TextInput,Text,Alert, TouchableOpacity  } from 'react-native'
import Util from '../../util/Util'
import Icon from 'react-native-vector-icons/MaterialIcons'


class Search extends Component{
    constructor (props) {
	    super(props)
		this.state = {
			memoryList :[],
	    	pumpList :[],
			text:'',
		}
  	}
	componentWillMount(){
		this.searchPumpByName();
	}

  	searchPumpByName = (text) => {

		if(text){
			let filterList = [];
            for(var i = 0 ; i < this.state.memoryList.length; i++){
            	item = this.state.memoryList[i];
                if(item.sbms.includes(text.text)|| item.dqms.includes(text.text)|| item.dwms.includes(text.text)|| item.htms.includes(text.text)){
                    filterList.push(item);
                }
			}
            this.setState({text:text.text,pumpList:filterList});
		}else{
			if(this.state.memoryList.length>1){
				this.setState({pumpList:this.state.memoryList})
			}
            fetch('http://192.168.48.99:8088/reactNativeApp/Search!getAllPumps.action').then((response) =>{
                if(200 === response.status){
                	//地区、客户、项目、水泵名称
                	data = JSON.parse(response._bodyInit);
					if(data){
						this.setState({pumpList:data.data,memoryList:data.data});
					}
            	}
			}).catch((error) => {
					Alert.alert(
					'请求出错',
					error,
				)
			})
		}
	}


	render() {
    	const { toggleSideMenu } = this.props;
		const { navigate } = this.props.navigation;
		if(this.state.pumpList.length <= 0){
			return (<View style={searchStyles.searchResult}><Text style={{width:Util.size.width,textAlign:'center',marginTop:15,fontSize:16,color:'#08527a'}}>正在查询请稍后</Text></View>)
		}else{


		return (
			<View style={searchStyles.container}>
				<View style={searchStyles.searchContent}>
					<Icon
						name='account-circle'
						color='white'
						size={32}
						style={{marginLeft:10,width:40}}
						onPress={() => toggleSideMenu()} />
					<TextInput
						style={{width:Util.size.width - 100,color:'white'}}
						onChangeText={(text) => this.searchPumpByName({text})}
						placeholder = '请输入...'
						placeholderTextColor = 'white'
    					underlineColorAndroid="white"
    					selectionColor="white"
            			value={this.state.text}
						/>
					<Icon
						name='close'
						color='white'
						size={32}
						onPress={() => {
							if(this.state.memoryList.length>0){
                                this.setState({text:'',pumpList:this.state.memoryList})
							}else{
                                this.setState({text:''})
							}

					}} />
				</View>
				<View style={searchStyles.container}>
						<ScrollView
							contentContainerStyle={{flexDirection: 'column',marginLeft:10}}
							/* 不显示垂直方向的滚动条 */
							showsVerticalScrollIndicator={false}
							>
						{
							this.state.pumpList.map((item, i) => (
                                <TouchableOpacity  style={searchStyles.pumpView} key={i} onPress={()=>{
                                	let pump = {title:item.sbms+'@'+item.id};
									navigate('Pump',{pump:pump});
								}}>
										<View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
											<Icon
												name='av-timer'
												color='gray'
												size={60}
													/>
										</View>
										<View style={{flex:8,flexDirection:'column',justifyContent:'center',marginLeft:10}}>
											<View style={{flexDirection:'row'}}>
												<Text style={{fontSize:16,color:'black'}}>{item.sbms}</Text>
											</View>
											<View style={{flexDirection:'row'}}>
												<Text style={{fontSize:12}}>地区 : {item.dqms}</Text>
											</View>
											<View style={{flexDirection:'row'}}>
												<Text style={{fontSize:12}}>客户 : {item.dwms}</Text>
											</View>
											<View style={{flexDirection:'row'}}>
												<Text style={{fontSize:12}}>项目 : {item.htms}</Text>
											</View>
										</View>
										<View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
											<Icon
												name='last-page'
												color='gray'
												size={36}
												onPress={()=>{
													let pump = {title:item.sbms+'@'+item.id};
													navigate('Pump',{pump:pump});
												}}
												/>
										</View>
            					</TouchableOpacity>
							))
						}
						</ScrollView>
				</View>

			</View>
		)
	}
	}
}

const searchStyles = StyleSheet.create({
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
		margin:5
    }
})

export default Search