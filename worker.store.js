var storing = {

    storeEnergy: function (creep) {
        var target;
        if (creep.memory.target == null) {
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (target == null || target == undefined){
                return false;
            }
            creep.memory.order =1;
            creep.memory.target = target.id;
        }
        if(creep.memory.order == 1) {
            target = Game.getObjectById(creep.memory.target);
        } else {
            return false;
        }
        var res = creep.transfer(target, RESOURCE_ENERGY);
        if (res== ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                visualizePathStyle: {
                    stroke: '#ffffff'
                }
            });
        } else if(res == ERR_INVALID_TARGET){
            creep.memory.target = null;
            creep.memory.order = 0;
        }
           else {
            creep.memory.target = null;
        }
        return true;
    },
    pickupEnergy: function (creep) {
        var energy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
        if(energy != null) {
            if(creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energy);
            }
            return true;
        }
        return false;
    },
    rebalanceEnergy: function (creep) {
        var target;
        if (creep.memory.target == null) {
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < CONTAINER_CAPACITY/2);
                }
            });
            console.log(target);
            if (target == null || target == undefined){
                return false;
            }
            creep.memory.order =1;
            creep.memory.target = target.id;
        }
        return storing.storeEnergy(creep);
    }
    
};

module.exports = storing;
