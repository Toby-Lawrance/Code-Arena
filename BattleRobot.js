const robot = require("./Robot.js");
const ivm = require('isolated-vm');


class BattleRobot extends robot {
    constructor(baseRobot) {
        super(baseRobot.Name, baseRobot.Components.Chassis, baseRobot.Components.Armour, baseRobot.Components.Weapon, baseRobot.Program);

        this.MovementAction = null;
        this.WeaponAction = null;

        this.Position = { x: 0, y: 0 };
        this.Heading = 0;
        this.WeaponHeading = 0;
        this.WeaponCooldown = 0;

        this.prepareIsolate();

    }

    prepareIsolate() {
        this.isolate = new ivm.Isolate({ memoryLimit: 128 });
        this.context = this.isolate.createContextSync();
        const jail = this.context.global;
        jail.setSync('global', jail.derefInto());


        const logCallback = function (...args) {
            console.log(...args);
        };
        this.context.evalClosureSync(`global.log = function(...args) {$0.applyIgnored(undefined, args, {arguments: {copy: true}});}`, [logCallback], { arguments: { reference: true } });

        //Copy things in
        var robo = {
            movementAction: null,
            weaponAction: null
        };
        Object.defineProperty(robo, "position", { value: this.Position, writable: false, enumerable: true});
        Object.defineProperty(robo, "heading", { value: this.Heading, writable: false, enumerable: true});
        Object.defineProperty(robo, "weaponHeading", { value: this.WeaponHeading, writable: false, enumerable: true});
        Object.defineProperty(robo, "components", { value: this.Components, writable: false, enumerable: true});
        Object.defineProperty(robo, "cooldown", { value: this.WeaponCooldown, writable: false, enumerable: true});

        jail.setSync('Robot', robo, {copy: true});
        this.context.evalClosureSync(`
Robot.move = function(distance) {
            log("Moving: " + distance);
            this.movementAction = { type: "Move", value: distance };
};
Robot.turn = function(degrees) {
            log("Rotating: " + degrees);
            this.movementAction = { type: "Rotate", value: degrees };
        };
Robot.rotateWeapon = function(degrees) {
            log("Rotating Weapon: " + degrees);
            this.weaponAction = { type: "Rotate", value: degrees };
        };
Robot.fire = function() {
            log("Bang");
            this.weaponAction = { type: "Fire", value: degrees };
        };`,
            []);

        //Pull them out with an append - move to runTick
        var prefix = "'use strict';";
        var adjustedProgram = prefix + this.Program;
        console.log(adjustedProgram);
        this.script = this.isolate.compileScriptSync(adjustedProgram);
        this.script.runSync(this.context, { timeout: 2500 }); //Establish it
    }

    applyActions() {
        //Do proper checks later
        
        if (this.MovementAction) {
            if (this.MovementAction.type === "Move") {
                const headingRad = this.Heading * (Math.PI / 180);
                const xChange = this.MovementAction.value * Math.cos(headingRad);
                const yChange = this.MovementAction.value * Math.sin(headingRad);
                this.Position.x += xChange;
                this.Position.y += yChange;
            } else if (this.MovementAction.type === "Rotate") {
                this.Heading = (this.Heading + this.MovementAction.value) % 360;
            } else {
                console.log("Someone messed with it: " + JSON.stringify(this.MovementAction));
            }
        }
        if (this.WeaponAction) {
            if (this.WeaponAction.type === "Fire") {
                console.log("Bang");
            } else if (this.WeaponAction.type === "Rotate") {
                this.WeaponHeading = (this.WeaponHeading + this.WeaponAction.value) % 360;
            } else {
                console.log("Someone messed with it: " + JSON.stringify(this.WeaponAction));
            }
        }
    }

    setNewValues() {
        const jail = this.context.global; 
        jail.setSync('global', jail.derefInto());
        //Copy things in
        var robo = {
            movementAction: null,
            weaponAction: null
        };
        Object.defineProperty(robo, "position", { value: this.Position, writable: false, enumerable: true });
        Object.defineProperty(robo, "heading", { value: this.Heading, writable: false, enumerable: true });
        Object.defineProperty(robo, "weaponHeading", { value: this.WeaponHeading, writable: false, enumerable: true });
        Object.defineProperty(robo, "components", { value: this.Components, writable: false, enumerable: true });
        Object.defineProperty(robo, "cooldown", { value: this.WeaponCooldown, writable: false, enumerable: true });
        jail.setSync('Robot', robo, { copy: true });

        this.context.evalClosureSync(`
Robot.move = function(distance) {
            console.log("Moving: " + distance);
            this.movementAction = { type: "Move", value: distance };
};
Robot.turn = function(degrees) {
            console.log("Rotating: " + degrees);
        };
Robot.rotateWeapon = function(degrees) {
            console.log("Rotating Weapon: " + degrees);
        };
Robot.fire = function() {
            console.log("Bang");
        };`,
            []);
    }

    runTick() {
        if (this.runScript === undefined) {
            this.runScript = this.isolate.compileScriptSync("main(); JSON.stringify(Robot);");
        }

        var strresult = this.runScript.runSync(this.context, { timeout: 500 });
        if (strresult) {
            const result = JSON.parse(strresult);
            this.MovementAction = result.movementAction;
            this.WeaponAction = result.weaponAction;
            console.log(JSON.stringify(this.MovementAction));
            console.log(JSON.stringify(this.WeaponAction));
        }

        //Process the actions - move to new function?
        this.applyActions();

        this.setNewValues();
    }
}

module.exports = BattleRobot;