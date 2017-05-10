/**
 * Created by Administrator on 2017-05-09.
 */
import React,{ Component } from 'react'
import { Badge } from 'react-native-elements'

class CustomBadge extends Component{

    constructor(props){
        super(props)
    }

    render(){
        // alert(this.props.value);

        return (
            <Badge
                value={4}
                textStyle={{ color: 'orange' }}
            />
        )
    }
}

export default CustomBadge