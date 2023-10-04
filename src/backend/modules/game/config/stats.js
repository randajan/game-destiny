
export const stats = [
    {
        id:"energy",
        title:"energie",
        info:"",
        unit:[0, 249, "MW"],
        entropy:1,
        init:0
    },
    {
        id:"battery",
        title:"baterie",
        info:"",
        unit:[0, 100, "%"],
        entropy:.006,
        init:_=>Number.jet.rnd(.5, .9)
    },
    {
        id:"smog",
        title:"radiace",
        info:"",
        unit:[0, 6, "Sv"],
        entropy:-.005,
        init:_=>Number.jet.rnd(.5, .9)
    },
    {
        id:"oxygen",
        title:"kyslík",
        info:"",
        unit:[0, 21, "%"],
        entropy:.004,
        init:_=>Number.jet.rnd(.5, .9)
    },
    {
        id:"heat",
        title:"teplota",
        info:"",
        unit:[-20, 21, "°C"],
        entropy:.006,
        init:_=>Number.jet.rnd(.5, .9),
    },
    {
        id:"direction",
        title:"kurz",
        info:"",
        unit:[180, 0, "°"],
        entropy:.004,
        init:_=>Number.jet.rnd(.1, .5),
    },
    {
        id:"distance",
        title:"vzdálenost",
        info:"",
        unit:[0, 5.2, "au"],
        entropy:0,
        init:_=>Number.jet.rnd(.8, 1)
    },
    
];