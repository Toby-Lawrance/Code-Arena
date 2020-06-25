import { BattleRobot } from "./BattleRobot";
import { Robot } from "./Robot";
import * as _ from "lodash";

export class Bout {
    teams: [BattleRobot[]]; //Array of BattleRobot Arrays. Any number including 
    allRobots: BattleRobot[];

    constructor(robotsAndTeams: [Robot[]]) {
        var nextId: number = 0;
        var nextTeamId: number = 0;
        for (let team of robotsAndTeams) {
            var battleReadyTeam: BattleRobot[] = [];
            for (let robot of team) {
                const brobo = new BattleRobot(robot, nextId++, nextTeamId);
                battleReadyTeam.push(brobo);
                this.allRobots.push(brobo);
            }
            this.teams.push(battleReadyTeam);
            nextTeamId += 1;
        }
    }

    updateInfo() {
        for (let robo of this.allRobots) {
            const withoutMe = _.filter(this.allRobots, (r) => r.id !== robo.id);
            robo.setNewValues(withoutMe);
        }
    }

    runTick() {
        for (let robo of this.allRobots) {
            let result = robo.runTick();
            //Resolve conflicts, run order should not affect outcome.

        }
        this.updateInfo();
    }

    toString():string {
        return JSON.stringify(this.allRobots);
    }

}