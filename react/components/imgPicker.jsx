import React, {Component} from "react";
import Radium from "radium";
import CircularProgress from 'material-ui/CircularProgress';
import Bricks from 'bricks.js';

const style = {
    img:{
        maxWidth: "150px",
        cursor: "pointer"
    }
}

class ImgPicker extends Component{
    constructor(props){
        super(props);
        this.renderImg = this.renderImg.bind(this);
        this.pickImg = this.pickImg.bind(this);
    }

    pickImg(img){
        this.props.onImgPick(img);
    }

    renderImg(img){
        return <img onClick={()=>this.pickImg(img.real)}key={img.preview} style={style.img} src={img.preview}/>     
    }

    componentDidUpdate(){
        const sizes = [
                        { columns: 2, gutter: 10 },
                        { mq: '768px', columns: 3, gutter: 25 },
                        { mq: '1024px', columns: 4, gutter: 50 }
                    ];
        Bricks({
            container: "#gallery",
            packed: 'packed',
            sizes:sizes
        });
    }

    componentDidMount(){
        const sizes = [
                        { columns: 2, gutter: 10 },
                        { mq: '768px', columns: 3, gutter: 25 },
                        { mq: '1024px', columns: 4, gutter: 50 }
                    ];
        Bricks({
            container: "#gallery",
            packed: 'packed',
            sizes:sizes
        });
    }
    
    render(){
        if(this.props.isLoading)
            return  <CircularProgress size={80} thickness={7} />;
        return (
            <div id="gallery">
                {this.props.searchImgs.map(img=>this.renderImg(img))}
            </div>
        );
    }
}


export default Radium(ImgPicker);