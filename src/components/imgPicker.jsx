import React, {Component} from "react";
import CircularProgress from 'material-ui/CircularProgress';
import Brick from 'bricks.js';
import _ from "lodash";

const style = {
    img:{
        maxWidth: "150px",
        cursor: "pointer"
    }
}

class ImgPicker extends Component{
    constructor(props){
        super(props);
        this.state = {wasRendered: false};
        this.renderImg = this.renderImg.bind(this);
        this.pickImg = this.pickImg.bind(this);
    }

    pickImg(img){
        this.props.onImgPick(img);
    }

    renderImg(img){
        return <img alt="" onClick={()=>this.pickImg(img.real)}key={img.preview} style={style.img} src={img.preview}/>     
    }

    componentDidUpdate(){
        const sizes = [
                        { columns: 2, gutter: 10 },
                        { mq: '768px', columns: 3, gutter: 25 },
                        { mq: '1024px', columns: 4, gutter: 50 }
                    ];
        Brick({
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
        Brick({
            container: "#gallery",
            packed: 'packed',
            sizes:sizes
        });
        this.setState({wasRendered: true});
    }
    
    shouldComponentUpdate(nextProps, nextState){
        if(_.isEqual(this.props, nextProps))
            return false;
        return true;
    }

    render(){
        if(this.props.isLoading)
            return  <CircularProgress size={80} thickness={7} />;
        if(this.state.wasRendered && _.isEmpty(this.props.searchImages))
            return <p>OMG!, WE COULDN'T FIND IMAGES FOR THAT TERM, TRY WITH SOMETHING DIFFERENT!</p>
        return (
            <div id="gallery">
                {this.props.searchImages.map(img=>this.renderImg(img))}
            </div>
        );
    }
}


export default ImgPicker;