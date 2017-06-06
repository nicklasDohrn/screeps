var roleGeneric = require('role.generic');
var roleMiner = require('role.miner');
var roleUpgrader = require('role.upgrader');
var roleTransporter = require('role.transporter');
var spawner = require('util.spawner');

for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
    }
}

module.exports.loop = function () {
    if(Game.time%100 == 0) {
        spawner.update();
    }

    spawner.spawn();

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'generic') {
            roleGeneric.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }
    }

    var tower = Game.getObjectById("591cfcd866b1d2302349183b");
    if(tower != null) {
    var target = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: (obj) => {
                return (obj.structureType == STRUCTURE_CONTAINER || obj.structureType == STRUCTURE_ROAD || obj.structureType == STRUCTURE_TOWER) && obj.hits < obj.hitsMax/2}
            });
            tower.repair(target);
    }
}
