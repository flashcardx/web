import React, {Component} from "react";
import Radium from "radium";
import Modal from "./util/modal.jsx";


const style = {
    imgWrap:{
        position: "relative",
        maxWidth: "150px",
        display: "inline-block",
        ":hover":{       
        }
    },
    imgBtns:{
        position: "absolute",
        bottom: "5px",
        right: "5px",
        backgroundColor: "rgba(0,0,0,.5)"
    },
    imgBtn:{
        margin:"5px",
        fontSize: "x-large",
        color: "red",
        cursor: "pointer"
    },
    img:{
        maxWidth: "150px"
    },
    modal: {
        width: '100%',
        maxWidth: 'none',
    }

}


class PreviewImage extends Component{

    constructor(props){
        super(props);
        this.onCrop = this.onCrop.bind(this);
        this.state = {
            image: null,
            previewImage: null
        };
    }

    onCrop(){
        // image in dataUrl
       console.log("on crop");
        // console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }

    cropImg(imgUrl){
        this.props.cropImg(imgUrl);
    }

    render(){
        const {img} = this.props;
        return (
            <div>
                <div style={style.imgWrap} key={img.url}>
                    <img style={style.img} src={img.url}/>
                    {Radium.getState(this.state, img.url, ':hover') && (
                            <span style={style.imgBtns}>
                                <i style={style.imgBtn} className="fa fa-repeat" aria-hidden="true"></i>
                                <i onClick={()=>this.cropImg(img.url)} style={style.imgBtn} className="fa fa-crop" aria-hidden="true"></i>
                                <i onClick={this.props.onDelete} style={style.imgBtn} className="fa fa-trash" aria-hidden="true"></i>
                            </span>
                    )}
                </div>
            </div>
        );

    }
}

export default Radium(PreviewImage);