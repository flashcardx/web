import React from "react";

function renderLang(code){
        switch (code) {
            case "en": return "English";
            case "es": return "Español";
            default:
                return "not available";
        }
}


export default function({code}){
    var lang = renderLang(code);
    return lang;
}