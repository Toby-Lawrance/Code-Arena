//const robot = require("./Robot.js");
import { Robot } from "./Robot";
import * as ivm from "isolated-vm";


export class BattleRobot extends Robot {
    movementAction: any;
    weaponAction: any;
    runScript: ivm.Script;
    isolate: ivm.Isolate;
    context: ivm.Context;
    position;
    heading: number;
    weaponCooldown: number;
    weaponHeading: number;
    script: ivm.Script;

    constructor(baseRobot) {
        super(baseRobot.Name, baseRobot.components.Chassis, baseRobot.components.Armour, baseRobot.components.Weapon, baseRobot.program);

        this.movementAction = null;
        this.weaponAction = null;

        this.position = { x: 0, y: 0 };
        this.heading = 0;
        this.weaponHeading = 0;
        this.weaponCooldown = 0;

        this.prepareIsolate();

    }

    prepareIsolate() {
        this.isolate = new ivm.Isolate({ memoryLimit: 128 });
        this.context = this.isolate.createContextSync();
        const jail = this.context.global;
        jail.setSync('global', jail.derefInto());


        const logCallback = (...args) => {
            console.log(...args);
        };
        this.context.evalClosureSync(`global.log = function(...args) {$0.applyIgnored(undefined, args, {arguments: {copy: true}});}`, [logCallback], { arguments: { reference: true } });

        //Copy things in
        var robo = {
            movementAction: null,
            weaponAction: null
        };
        Object.defineProperty(robo, "position", { value: this.position, writable: false, enumerable: true});
        Object.defineProperty(robo, "heading", { value: this.heading, writable: false, enumerable: true});
        Object.defineProperty(robo, "weaponHeading", { value: this.weaponHeading, writable: false, enumerable: true});
        Object.defineProperty(robo, "components", { value: this.components, writable: false, enumerable: true});
        Object.defineProperty(robo, "cooldown", { value: this.weaponCooldown, writable: false, enumerable: true});

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
        var adjustedProgram = prefix + this.program;
        console.log(adjustedProgram);
        this.script = this.isolate.compileScriptSync(adjustedProgram);
        this.script.runSync(this.context, { timeout: 2500 }); //Establish it
    }

    applyActions() {
        //Do proper checks later
        
        if (this.movementAction) {
            if (this.movementAction.type === "Move") {
                const headingRad = this.heading * (Math.PI / 180);
                const xChange = this.movementAction.value * Math.cos(headingRad);
                const yChange = this.movementAction.value * Math.sin(headingRad);
                this.position.x += xChange;
                this.position.y += yChange;
            } else if (this.movementAction.type === "Rotate") {
                this.heading = (this.heading + this.movementAction.value) % 360;
            } else {
                console.log("Someone messed with it: " + JSON.stringify(this.movementAction));
            }
        }
        if (this.weaponAction) {
            if (this.weaponAction.type === "Fire") {
                console.log("Bang");
            } else if (this.weaponAction.type === "Rotate") {
                this.weaponHeading = (this.weaponHeading + this.weaponAction.value) % 360;
            } else {
                console.log("Someone messed with it: " + JSON.stringify(this.weaponAction));
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
        Object.defineProperty(robo, "position", { value: this.position, writable: false, enumerable: true });
        Object.defineProperty(robo, "heading", { value: this.heading, writable: false, enumerable: true });
        Object.defineProperty(robo, "weaponHeading", { value: this.weaponHeading, writable: false, enumerable: true });
        Object.defineProperty(robo, "components", { value: this.components, writable: false, enumerable: true });
        Object.defineProperty(robo, "cooldown", { value: this.weaponCooldown, writable: false, enumerable: true });
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
            this.movementAction = result.movementAction;
            this.weaponAction = result.weaponAction;
            console.log(JSON.stringify(this.movementAction));
            console.log(JSON.stringify(this.weaponAction));
        }

        //Process the actions - move to new function?
        this.applyActions();

        this.setNewValues();
    }
}