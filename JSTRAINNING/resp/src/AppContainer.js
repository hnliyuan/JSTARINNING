import React, { Component } from 'react'
import Loading from './Loading'
import Home from './home/Home'
import Index from './index/Index'
import Constant from './util/Constant'

export default class AppContainer extends Component{
	
	constructor(props) {
		super(props)
		//设置登录初始值
		this.state = {
			loginState : Constant.Login.WAIT_LOGIN
		}
		
//		this.checkLogin = checkLogin.bind(this);

		
	}
	
	componentDidMount()  {
		//该方法被调用时，已经渲染出真实的 DOM
		//  checkLogin
		//this.checkLogin();
	}
	
	
	checkLogin = () => {
		

		if(this.state.loginState === Constant.Login.LOGININ) {
			this.setState({ loginState : Constant.Login.LOGININ })
		}else{
			this.setState({ loginState : Constant.Login.LOGIN })
		}

	}
	
	render(){
		
		
		const {  loginState } = this.state;

		switch(  loginState  )  {
			case Constant.Login.WAIT_LOGIN:
						return (<Loading checkLogin={this.checkLogin}/>)
			case Constant.Login.LOGININ:
						return (<Index/>)
			case Constant.Login.LOGIN:
						return (<Home/>)
		}
		
	}
	
	
	
	
	
	
}
