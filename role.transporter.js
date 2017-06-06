var retrieving = require('worker.retrieve');
var storing = require('worker.store');

var roleTransporter = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy == 0 && creep.memory.order > -1 || creep.memory.harvesting != null) {
            creep.memory.target = null;
            creep.memory.order = 0;
            creep.memory.idle = 0;
            if(storing.pickupEnergy(creep)) return;
            retrieving.getEnergy(creep, true);
        }
        else if (creep.carry.energy == creep.carryCapacity || creep.memory.order >= 0) {
            creep.memory.harvesting = null;
            if (storing.storeEnergy(creep)) return;
            if (storing.rebalanceEnergy(creep)) return;
            creep.memory.idle += (creep.carryCapacity - creep.carry.energy);
            if(creep.memory.idle >= creep.carryCapacity) {
                creep.memory.target = null;
                creep.memory.order = 0;
                retrieving.getEnergy(creep, false);
                creep.memory.idle = 0;
            }
            
        }
    }
};

module.exports = roleTransporter;
