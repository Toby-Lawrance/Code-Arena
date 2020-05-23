const components = require("./RobotComponents.js");

class Robot {
    constructor(name, chassis, armour, weapon, program) {
        this.Name = name;
        this.Components = { Chassis: chassis, Armour: armour, Weapon: weapon };
        this.Program = program;
    }

    validate() {
        if (typeof (this.Name) !== "string") return false;

        //Additional program checking worthwhile
        if (typeof (this.Program) != "string") {
            if (typeof (this.Program) === "object" && (this.Program.Files === undefined || this.Program.Files.constructor !== Array)) {
                return false;
            }
        }

        //Component Checking
        var chassisObject = this.Components.Chassis.constructor === Chassis;
        var armourObject = this.Components.Armour.constructor === Armour;
        var weaponObject = this.Components.Weapon.constructor === Weapon;

        if (!chassisObject || !armourObject || !weaponObject) {
            return false;
        }

        var baseChassis = components.Chassis.find((c) => c.Name === this.Components.Chassis.Name);
        if (baseChassis === undefined) {
            console.log("Chassis not found: " + this.Components.Chassis.Name);
            return false;
        }
        if (!_.isEqual(baseChassis, this.Components.Chassis)) {
            console.log("Chassis don't match: Base " +
                JSON.stringify(baseChassis) +
                " Loaded " +
                JSON.stringify(this.Components.Chassis));
            return false;
        }

        var baseArmour = components.Armours.find((a) => a.Name === this.Components.Armour.Name);
        if (baseArmour === undefined) {
            console.log("Armour not found: " + this.Components.Armour.Name);
            return false;
        }
        if (!_.isEqual(baseArmour, this.Components.Armour)) {
            console.log("Chassis don't match: Base " +
                JSON.stringify(baseArmour) +
                " Loaded " +
                JSON.stringify(this.Components.Armour));
            return false;
        }

        var baseWeapon = components.Weapon.find((c) => c.Name === this.Components.Weapon.Name);
        if (baseWeapon === undefined) {
            console.log("Weapon not found: " + this.Components.Weapon.Name);
            return false;
        }
        if (!_.isEqual(baseWeapon, this.Components.Weapon)) {
            console.log("Weapon don't match: Base " +
                JSON.stringify(baseWeapon) +
                " Loaded " +
                JSON.stringify(this.Components.Weapon));
            return false;
        }

        return true;
    }


}


module.exports = Robot;