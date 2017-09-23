import React, {Component} from "react";
import Radium from "radium";
import CircularProgress from 'material-ui/CircularProgress';
import Bricks from 'bricks.js';

class ImgPicker extends Component{
    constructor(props){
        super(props);
        this.renderImg = this.renderImg.bind(this);
    }

    renderImg(img){
        return <img key={img.preview} src={img.preview}/>
    }

    componentDidUpdate(){
        console.log("component update");
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
        console.log("did mount");
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
              {this.props.imgs.map(img=>this.renderImg(img))}
            </div>
        );
    }
}


export default Radium(ImgPicker);