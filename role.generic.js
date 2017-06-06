var retrieving = require('worker.retrieve');
var building = require('worker.build');
var update = require('worker.update');
var storing = require('worker.store');
var repairing = require('worker.repair');

var roleGeneric = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy == 0 && creep.memory.order > -1 || creep.memory.harvesting != null) {
            creep.memory.target = null;
            creep.memory.order = -1;
            retrieving.getEnergy(creep, true);
        }
        else if (creep.carry.energy == creep.carryCapacity || creep.memory.order >= 0) {
            creep.memory.harvesting = null;
            if(Memory.budget < 800 || Memory.transporters < 2 || Memory.miners < 2) {
                if (storing.storeEnergy(creep)) return;
            }
            if (building.buildClosest(creep)) return;
            if (repairing.repairClosest(creep)) return;
            if (update.update(creep)) return;
            console.log("idle");
        }
    }
};

module.exports = roleGeneric;
