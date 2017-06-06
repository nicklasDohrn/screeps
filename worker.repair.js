var repair = {

    repairClosest: function (creep) {
        var target;
        if (creep.memory.target == null) {
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (obj) => {
                return (obj.structureType == STRUCTURE_CONTAINER || obj.structureType == STRUCTURE_ROAD || obj.structureType == STRUCTURE_TOWER) && obj.hits < obj.hitsMax/2;}
            });
            if (target == null || target == undefined)
                target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (obj) => {
                    return (obj.structureType == STRUCTURE_RAMPART|| obj.structureType == STRUCTURE_WALL) && obj.hits < Memory.budget * 10;}
                });
                if (target == null || target == undefined)
                return false;
            creep.memory.target = target.id;
            creep.memory.order = 3;
        }
        if(creep.memory.order == 3) {
            target = Game.getObjectById(creep.memory.target);
        } else {
            return false;
        }
        if (creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {
                visualizePathStyle: {
                    stroke: '#ffffff'
                }
            });
        }
        return true;
    }
};

module.exports = repair;
