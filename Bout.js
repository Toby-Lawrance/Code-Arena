"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bout = void 0;
const BattleRobot_1 = require("./BattleRobot");
class Bout {
    constructor(robotsAndTeams) {
        var nextId = 0;
        var nextTeamId = 0;
        for (let team of robotsAndTeams) {
            var battleReadyTeam = [];
            for (let robot of team) {
                battleReadyTeam.push(new BattleRobot_1.BattleRobot(robot, nextId++, nextTeamId));
            }
            this.teams.push(battleReadyTeam);
            nextTeamId += 1;
        }
    }
    updateInfo() {
        const allRobots = this.teams.flat(1);
    }
}
exports.Bout = Bout;
//# sourceMappingURL=Bout.js.map