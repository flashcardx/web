import axios from "axios";
import config from "../../config";
const TEXT_TO_SPEECH_URL = config.apiTextToSpeech;

export function fetchTextToSpeech(lang, text, callback){
    const url = TEXT_TO_SPEECH_URL + lang + "/" + encodeURIComponent(text);
    const request = axios.get(url,
                    {headers: {'x-access-token': localStorage.getItem("jwt")}});
    request.then(r=>{
        callback(r.data.msg);
    });
    return { type: "",
             originAPI: true,
             bigLoading: true,
             payload: request
         }
}