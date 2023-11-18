import { numFrame } from "../../../../../arc/tools/formats";

export default [
    {
        id:"main",
        title:"Můstek"
    },
    {
        id: "core",
        title: "Reaktor",
        info:"Tento systém řídí výrobu energie pro všechny ostatní systémy. Jeho vypnutí je vážný hazard se životy celé posádky.",
        decay: .25,
        health: _ => Number.jet.rnd(.4, .8),
        onTick: ({stats:{energy}}, node, rate) => {
            energy.value = numFrame(node.power*1.5);
        }
    },
    {
        id: "battery",
        title: "Záložní zdroj",
        info:"Záložní zdroj se stará o dobíjení baterie z reaktoru. V případě výpadku reaktoru jsou kvalitní a nabité baterie k nezaplacení.",
        stat:"battery",
        decay: .075,
        energyUse: .1,
        health: _ => Number.jet.rnd(.8, 1),
        onTick: ({stats:{battery}, nodes:{core}}, node, rate) => {
            if (!core.isOn) { return; }
            battery.value = Math.min(1, battery.value + (rate * node.power * .04));
        },
        capacity: 300
    },
    {
        id: "shield",
        title: "Štíty",
        info:"Protiradiační magnetický štít brání loď a posádku nejen proti radiaci, ale i proti drobným částicím, které se obrovskou rychlostí pohybují vesmírem.",
        stat:"smog",
        energyUse: .1,
        decay: .1,
        powerSet: _ => Number.jet.rnd(.6, 1),
        health: _ => Number.jet.rnd(.6, 1),
        onTick: ({stats:{smog}}, node, rate) => {
            smog.value -= rate * node.power * .014;
        }
    },
    {
        id: "oxygen",
        title: "Generátor kyslíku",
        info:"Kyslík je užitečný plyn a proto je jeho generátor ve vesmíru poměrně zásadní záležitost. Mezi hlavní výhody kyslíkového generátoru patří, že bez něj ve vesmíru drtivá většina posádky zemře",
        stat:"oxygen",
        energyUse: .075,
        decay: .12,
        health: _ => Number.jet.rnd(.6, 1),
        onTick: ({stats:{oxygen}}, node, rate) => {
            oxygen.value += rate * node.power * .011;
        }
    },
    {
        id: "ac",
        title: "Klimatizace",
        info:"Klimatizace ovlivňuje teplotu na lodi. Bez provozuschopné klimatizace začne klesat teplota na lodi tak dlouho dokud posádka nevyhlásí generální stávku nebo nezemře.",
        stat:"heat",
        energyUse: .075,
        decay: .08,
        health: _ => Number.jet.rnd(.6, 1),
        onTick: ({stats:{heat}}, node, rate) => {
            heat.value += rate * node.power * .0165;
        }
    },
    {
        id: "navigation",
        title: "Navigace",
        info:"Navigační systém je trochu potvora a vyžaduje neustálý dohled. Pokud tento systém nebude v perfektním stavu může způsobovat víc problémů než užitku.",
        stat:"direction",
        energyUse: .15,
        decay: .25,
        isOn:false,
        health: _ => Number.jet.rnd(0, .2),
        onTick: ({stats:{direction}}, node, rate) => {
            direction.value += rate * (node.powerSet * (node.health * 1.5 - .5)) * .035;
        }
    },
    {
        id: "engine",
        title: "Motory",
        info:"Pozor ať nepřetížíš reaktor! Motory spotřebovávají poměrně velké množství energie. Jo a jestli to zapneš doporučuju neustále sledovat kurz.",
        stat:"distance",
        energyUse: .3,
        decay: .1,
        isOn:false,
        health: _ => Number.jet.rnd(0, .2),
        onTick: ({stats:{distance, direction}}, node, rate) => {
            distance.value -= rate * node.power * .006 * (direction.value * 2 - 1);
        }
    },
    {
        id: "light",
        title: "Světla",
        info:"Světla jsou docela fajn utilitka, ale na druhou stranu když se na to člověk podívá ze správného úhlu pohledu tak kvůli vypnutým světlům přeci ještě nikdy nikdo neumřel ne?",
        energyUse: .1,
        decay: .25,
        isOn:false,
        health: _ => Number.jet.rnd(.2, .4),
        onTick: (current, node, rate) => {

        }
    }
];