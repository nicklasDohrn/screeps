var retrieving = require('worker.retrieve');
var update = require('worker.update');

var roleGeneric = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy == 0 || creep.memory.harvesting != null) {
            creep.memory.target = null;
            retrieving.getEnergy(creep, true);
        }
        else if (creep.carry.energy > 0|| !creep.memory.harvesting) {
            creep.memory.harvesting = null;
            if (update.update(creep)) return;
            console.log("idle");
        }
    }
};

module.exports = roleGeneric;
