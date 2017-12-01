import React, {Component} from "react";
import Page from "../../components/page.jsx";
import {Redirect } from 'react-router';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import WhiteBar from "../../components/util/whiteBar.jsx";

class MethodChooser extends Component{
    constructor(props){
        super(props);
        this.state = {redirect:null};
    }

    render(){
        if(this.state.redirect)
            return  <Redirect push to={"/practice/"+this.state.redirect} />;
        return (
             <Page noWrap name="practice">
                <WhiteBar>
                        <h4>Elige un metodo de practica</h4>
                </WhiteBar>
                <div className="container">
                        <div className="row">
                            <div className="col col-sm col-md-6	col-lg-6 col-xl-4">
                                 <Card>
                                        <CardMedia
                                        style={{cursor:"pointer"}}
                                        onClick={()=>this.setState({redirect:'spaced-repetition'})} 
                                        overlay={<CardTitle style={{height:"100%"}} title="Repeticion espaceada"/>}
                                        >
                                        <img style={{height:"200px", width:"200px"}}src={process.env.PUBLIC_URL+"/img/spaced-repetition.gif"} alt="" />
                                        </CardMedia>
                                        <CardText>
                                             Descubri que tanto conoces tus fichas, el sistema calcula el momento mas optimo para volver a mostrarte la ficha segun tu historial
                                        </CardText>
                                        <CardActions>
                                            <FlatButton onClick={()=>this.setState({redirect:'spaced-repetition'})} className="col" label="Jugar" />
                                        </CardActions>
                                  </Card>
                            </div>
                        </div>
                </div>
            </Page>)
        }
}

export default MethodChooser;