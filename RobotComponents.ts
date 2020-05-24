export class Chassis {
    name: string;
    health: number;
    capacity: number;
    speed: number;

    constructor(name, health, capacity, speed) {
        this.name = name;
        this.health = health;
        this.capacity = capacity;
        this.speed = speed;
    }
}

export class Armour {
    name: string;
    weight: number;
    threshold: number;
    durability: number;

    constructor(name, weight, threshold, durability) {
        this.name = name;
        this.weight = weight;
        this.threshold = threshold;
        this.durability = durability;
    }
}

export class Weapon {
    name: string;
    weight: number;
    range: number;
    cooldown: number;
    damage: number;

    constructor(name, weight, range, rate, damage) {
        this.name = name;
        this.weight = weight;
        this.range = range;
        this.cooldown = rate;
        this.damage = damage;
    }
}

export const chassis:Chassis[] = [
    new Chassis("Squishy", 5, 13, 10),
    new Chassis("Rounded", 10, 15, 5),
    new Chassis("Chonkers", 20, 20, 1)
];

export const armours:Armour[] = [
    new Armour("Brittle", 1, 5, 1),
    new Armour("Rounded", 7, 2, 20),
    new Armour("Strong", 10, 15, 5)
];

export const weapons:Weapon[] = [
    new Weapon("Long",8,10,5,17),
    new Weapon("Medium",5,5,1,3),
    new Weapon("Short",3,1,3,10)
];