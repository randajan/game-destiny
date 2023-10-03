
export const stats = [
    {
        id:"energy",
        title:"energie",
        entropy:1,
        init:0
    },
    {
        id:"battery",
        title:"baterie",
        entropy:.006,
        init:_=>Number.jet.rnd(.5, .9)
    },
    {
        id:"smog",
        title:"radiace",
        entropy:-.003,
        init:_=>Number.jet.rnd(.5, .9)
    },
    {
        id:"oxygen",
        title:"kyslík",
        entropy:.003,
        init:_=>Number.jet.rnd(.5, .9)
    },
    {
        id:"heat",
        title:"teplota",
        entropy:.003,
        init:_=>Number.jet.rnd(.5, .9)
    },
    {
        id:"direction",
        title:"kurz",
        entropy:.003,
        init:_=>Number.jet.rnd(.1, .5)
    },
    {
        id:"distance",
        title:"vzdálenost",
        entropy:0,
        init:_=>Number.jet.rnd(.8, 1)
    },
    
];