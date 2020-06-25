"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weapons = exports.armours = exports.chassis = exports.Weapon = exports.Armour = exports.Chassis = void 0;
class Chassis {
    constructor(name, health, capacity, speed) {
        this.name = name;
        this.health = health;
        this.capacity = capacity;
        this.speed = speed;
    }
}
exports.Chassis = Chassis;
class Armour {
    constructor(name, weight, threshold, durability) {
        this.name = name;
        this.weight = weight;
        this.threshold = threshold;
        this.durability = durability;
    }
}
exports.Armour = Armour;
class Weapon {
    constructor(name, weight, range, rate, damage) {
        this.name = name;
        this.weight = weight;
        this.range = range;
        this.cooldown = rate;
        this.damage = damage;
    }
}
exports.Weapon = Weapon;
exports.chassis = [
    new Chassis("Squishy", 5, 13, 10),
    new Chassis("Rounded", 10, 15, 5),
    new Chassis("Chonkers", 20, 20, 1)
];
exports.armours = [
    new Armour("Brittle", 1, 5, 1),
    new Armour("Rounded", 7, 2, 20),
    new Armour("Strong", 10, 15, 5)
];
exports.weapons = [
    new Weapon("Long", 8, 10, 5, 17),
    new Weapon("Medium", 5, 5, 1, 3),
    new Weapon("Short", 3, 1, 3, 10)
];
//# sourceMappingURL=RobotComponents.js.map