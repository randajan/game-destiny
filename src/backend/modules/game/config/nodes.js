
export const nodes = [
    {
        id: "core",
        title: "Reaktor",
        decay: .25,
        health: _ => Number.jet.rnd(.4, .8),
        onTick: ({stats:{energy}}, node, rate) => {
            energy.value = Number.jet.frame(node.power*1.5, 0, 1);
        }
    },
    {
        id: "battery",
        title: "Záložní zdroj",
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
        energyUse: .1,
        decay: .1,
        powerSet: _ => Number.jet.rnd(.6, 1),
        health: _ => Number.jet.rnd(.6, 1),
        onTick: ({stats:{smog}}, node, rate) => {
            smog.value -= rate * node.power * .012;
        }
    },
    {
        id: "oxygen",
        title: "Generátor kyslíku",
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
        energyUse: .15,
        decay: .25,
        isOn:false,
        health: _ => Number.jet.rnd(0, .2),
        onTick: ({stats:{direction}}, node, rate) => {
            direction.value += rate * (node.powerSet * (node.health * 1.5 - .5)) * .0145;
        }
    },
    {
        id: "engine",
        title: "Motory",
        energyUse: .3,
        decay: .1,
        isOn:false,
        health: _ => Number.jet.rnd(0, .2),
        onTick: ({stats:{distance, direction}}, node, rate) => {
            distance.value -= rate * node.power * .002 * (direction.value * 2 - 1);
        }
    },
    {
        id: "light",
        title: "Světla",
        energyUse: .1,
        decay: .25,
        isOn:false,
        health: _ => Number.jet.rnd(.2, .4),
        onTick: (ship, node, rate) => {

        }
    }
];