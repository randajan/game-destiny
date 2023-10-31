
const planetsAu = [
    "Pluto: 39 au",
    "Neptun: 30 au",
    "Uran 18,2 au",
    "Saturn 8,6 au",
    "Jupiter 4,2 au",
    "Pás planetek 1,8 au",
    "Mars 0,5 au",
]


export const stats = [
    {
        id:"energy",
        title:"energie",
        info:"Úroveň nadprodukce energie z reaktoru. Hladinu ovlivňuje výkon a stav reaktoru. Tento ukazatel ovlivňuje množství spuštěných systémů a jejich výkon.\n\nPokud se reaktor přetíží vypne se! ",
        unit:[0, 249, "MW"],
        entropy:1,
        init:0
    },
    {
        id:"battery",
        title:"baterie",
        info:"Aktuální stav baterie. Rychlost dobíjení je možné ovlivnit výkonem Záložního zdroje.\n\nPokud se vypne reaktor všechny spuštěné systémy začnou odčerpávat energii z baterie.\nRychlost vybíjení a nabíjení baterie je silně ovlivněna stavem Záložního zdroje",
        unit:[0, 100, "%"],
        entropy:.006,
        init:_=>Number.jet.rnd(.5, .9)
    },
    {
        id:"smog",
        title:"radiace",
        info:"Úroveň radiace snižuje Štít, jeho výkon a stav.\n\nPříliš mnoho radiace způsobí nepěknou zkázu lodi i posádce.",
        unit:[0, 6, "Sv"],
        entropy:-.005,
        init:_=>Number.jet.rnd(.2, .7)
    },
    {
        id:"oxygen",
        title:"kyslík",
        info:"Hladina kyslíku zvyšuje Generátor kyslíku, jeho výkon a stav.\n\nPokud hladina kyslíku klesne posádka ti nejprve udělá z uší rumba-koule, na krku zatančí fandango a následně se udusí",
        unit:[0, 21, "%"],
        entropy:.004,
        init:_=>Number.jet.rnd(.3, .8)
    },
    {
        id:"heat",
        title:"teplota",
        info:"Teplotu udržuje Klimatizace, její výkon a stav.\n\nV příliš nízké teplotě se nedá pracovat. Eventuálně by posádka mohla trpět na omrzliny. Případně i umrznout a probudit se v roce 3000.",
        unit:[-40, 21, "°C"],
        entropy:.006,
        init:_=>Number.jet.rnd(.3, .8),
    },
    {
        id:"direction",
        title:"kurz",
        info:"Kurz je řízen prostřednictvím Navigace a je vyjádřen odchylkou od našeho cíle.\n\nŠpatný kurz znamená, že loď může letět úplně špatným směrem!",
        unit:[180, 0, "°"],
        entropy:.008,
        init:_=>Number.jet.rnd(0, .3),
    },
    {
        id:"distance",
        title:"vzdálenost",
        info:"Naše vzdálenost od Země v astronomických jednotkách. \n\n"+planetsAu.join("\n"),
        unit:[0, 39, "au"],
        entropy:0,
        init:_=>Number.jet.rnd(.9, 1)
    },
    
];