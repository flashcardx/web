import React, {Component} from "react"
import config from "../../api_config";
const GOOGLE_CLIENTID = config.googleClientId;
class GoogleSignButton extends Component{

    constructor(props){
        super(props);
        this.run = this.run();
    }

    run(){
        if(window.googleyolo){
            window.googleyolo.hint({
                supportedAuthMethods: [
                    "https://accounts.google.com",
                    "googleyolo://id-and-password"
                ],
                supportedIdTokenProviders: [
                    {
                        uri: "https://accounts.google.com",
                        clientId: GOOGLE_CLIENTID
                    }
                ]
            })
     }
     else
        setTimeout(() => {
            this.run();
            console.log("googleyolo wasn't ready, trying again in: 100ms");
        }, 100);
    }

    render(){
        return <button style={{ marginBottom:"10px",
                      marginTop:"10px",
                      color:"white",
                      fontWeight:"400",
                      fontSize: "15px",
                      border:"1px solid gray"}}
                className="btn btn-light" onClick={this.run}>
                <i style={{marginRight:"5px"}} aria-hidden="true">
                <img src={process.env.PUBLIC_URL+"/img/icon_google16.png"} alt="Google icon"/>
                </i>
                <span style={{color:"black"}}>
                    Continuar con Google
                </span>
        </button>
    }

}

export default GoogleSignButton;