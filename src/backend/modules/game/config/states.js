export const states = [
    {
        id:"radiated",
        title:"Ozáření",
        info:"Teď už světla potřebovat nebudeme",
        isEnd:true,
        isWin:false,
        when:({stats:{smog:{value}}})=>value >= 1
    },
    {
        id:"suffocated",
        title:"Udušení",
        info:"...nedostává se mi slov",
        isEnd:true,
        isWin:false,
        when:({stats:{oxygen:{value}}})=>value <= 0
    },
    {
        id:"freezed",
        title:"Umrznutí",
        info:"Santovi se v zatáčce zlomil sob",
        isEnd:true,
        isWin:false,
        when:({stats:{heat:{value}}})=>value <= 0
    },
    {
        id:"home",
        title:"Jsme doma!",
        info:"Sláva ALIANCI!",
        isEnd:true,
        isWin:true,
        when:({stats:{distance:{value}}})=>value <= 0
    },
    {
        id:"power",
        title:"Hlavní napájení",
        info:"Všechny systémy čerpají energii z reaktoru",
        when:({nodes:{core:{isOn}}})=>isOn
    },
    {
        id:"battery",
        title:"Záložní napájení",
        info:"Všechny systémy čerpají energii z baterie",
        when:({nodes:{battery:{isOn}}})=>isOn
    },
    {
        id:"blackout",
        title:"Výpadek napájení",
        info:"Máme tu totální výpadek energie do všech systémů",
        when:_=>true
    },

]