class Chassis {
    constructor(name, health, capacity, speed) {
        this.Name = name;
        this.Health = health;
        this.Capacity = capacity;
        this.Speed = speed;
    }
}

class Armour {
    constructor(name, weight, threshold, durability) {
        this.Name = name;
        this.Weight = weight;
        this.Threshold = threshold;
        this.Durability = durability;
    }
}

class Weapon {
    constructor(name, weight, range, rate, damage) {
        this.Name = name;
        this.Weight = weight;
        this.Range = range;
        this.Cooldown = rate;
        this.Damage = damage;
    }
}

let chassis = [
    new Chassis("Squishy", 5, 13, 10),
    new Chassis("Rounded", 10, 15, 5),
    new Chassis("Chonkers", 20, 20, 1)
];

let armour = [
    new Armour("Brittle", 1, 5, 1),
    new Armour("Rounded", 7, 2, 20),
    new Armour("Strong", 10, 15, 5)
];

let weapon = [
    new Weapon("Long",8,10,5,17),
    new Weapon("Medium",5,5,1,3),
    new Weapon("Short",3,1,3,10)
];

module.exports = {Chassis:chassis,Armours:armour,Weapons:weapon};