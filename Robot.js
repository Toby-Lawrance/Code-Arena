"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
const components = require("./RobotComponents.js");
const _ = require("lodash");
class Robot {
    constructor(name, chassis, armour, weapon, program) {
        this.name = name;
        this.components = { Chassis: chassis, Armour: armour, Weapon: weapon };
        this.program = program;
    }
    validate() {
        //Component Checking
        var baseChassis = components.chassis.find((c) => c.name === this.components.Chassis.Name);
        if (baseChassis === undefined) {
            console.log("Chassis not found: " + this.components.Chassis.Name);
            return false;
        }
        if (!_.isEqual(baseChassis, this.components.Chassis)) {
            console.log("Chassis don't match: Base " +
                JSON.stringify(baseChassis) +
                " Loaded " +
                JSON.stringify(this.components.Chassis));
            return false;
        }
        var baseArmour = components.armours.find((a) => a.name === this.components.Armour.Name);
        if (baseArmour === undefined) {
            console.log("Armour not found: " + this.components.Armour.Name);
            return false;
        }
        if (!_.isEqual(baseArmour, this.components.Armour)) {
            console.log("Chassis don't match: Base " +
                JSON.stringify(baseArmour) +
                " Loaded " +
                JSON.stringify(this.components.Armour));
            return false;
        }
        var baseWeapon = components.weapons.find((c) => c.name === this.components.Weapon.Name);
        if (baseWeapon === undefined) {
            console.log("Weapon not found: " + this.components.Weapon.Name);
            return false;
        }
        if (!_.isEqual(baseWeapon, this.components.Weapon)) {
            console.log("Weapon don't match: Base " +
                JSON.stringify(baseWeapon) +
                " Loaded " +
                JSON.stringify(this.components.Weapon));
            return false;
        }
        return true;
    }
}
exports.Robot = Robot;
//# sourceMappingURL=Robot.js.map