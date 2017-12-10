export const langs = [{label: "English", value:"en"},
                {label: "Español", value:"es"},
                {label: "Dansk", value:"da"},
                {label: "Deutsch", value:"de"},
                {label: "Français", value:"fr"},
                {label: "Italiano", value:"it"},
                {label: "Nederlands", value:"nl"},
                {label: "Polski", value:"pl"},
                {label: "Português", value:"pt"},
                {label: "Română", value:"ro"},
                {label: "Svenska", value:"sv"},
                {label: "Türkçe", value:"tr"},
                {label: "Русский", value:"ru"},
                {label: "한국어", value:"ko"},
                {label: "日本語", value:"ja"},
                {label: "Cymraeg", value:"cy"},
                {label: "Íslenska", value:"is"},
                {label: "Norsk Bokmål", value:"nb"}]

export function getLangName(code){
        for(var i=0; i<langs.length; i++)
                if(langs[i].value === code)
                 return langs[i].label;
        return "Not available";
}      