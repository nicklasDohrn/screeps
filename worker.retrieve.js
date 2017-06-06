var deep = 0;
var retrieve = {

    /** @param {Creep} creep **/
    findNearestEnergy: function(pos, amount, mine) {
        var target = pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] >= amount;
            }
        });
        if(target == null){
            target = pos.findClosestByRange(FIND_SOURCES);
        }
        return target;
	},
	getEnergy: function(creep, mine) {
	    var target = (creep.memory.harvesting == null || creep.memory.harvesting == "retarget")? this.findNearestEnergy(creep.pos, 100, mine) : Game.getObjectById(creep.memory.harvesting);
	    if(target != null)
	        creep.memory.harvesting = target.id;
	        if(target instanceof Source && creep.harvest(target) == ERR_NOT_IN_RANGE){
	            creep.moveTo(target);
	            return;
	        } 
	        else if (target instanceof StructureContainer && creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	            creep.moveTo(target);
	        } else {
	            creep.memory.harvesting = "retarget";
	        }
	        if(creep.carry.energy == creep.carryCapacity) {
	            creep.memory.harvesting = null;
	            creep.memory.order = 0;
	        }
	}
};

module.exports = retrieve;