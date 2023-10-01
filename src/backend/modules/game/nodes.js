


export const nodes = {
    "core": m => {
        m.ship.energy += .1;
    },
    "battery": m => {
        m.ship.energy += .1;
    },
    "shield": m => {
        m.ship.energy -= .1;
    },
    "oxygen": m => {
        m.ship.energy -= .1;
    },
    "ac": m => {
        m.ship.energy -= .1;
    },
    "navigation": m => {
        m.ship.energy -= .1;
    },
    "engine": m => {
        m.ship.energy -= .1;
    },
    "light": m => {
        m.ship.energy -= .1;
    }
  }