import React, {Component} from "react";
import {connect} from "react-redux";
import LinearProgress from 'material-ui/LinearProgress';

const style = {
    position: "fixed",
    top: 0,
    width:"100%",
    zIndex: 3000
};

class LoadingWrapper extends Component{

    render (){
        if(this.props.bigLoading)
            return  <LinearProgress style={style} color="red" mode="indeterminate" />
        return null;
    }

}

function mapStateToProps(state){
    return {bigLoading: state.bigLoading};
}

export default connect(mapStateToProps)(LoadingWrapper);