var roleGeneric = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var source = Game.getObjectById(creep.memory.source);
        if(creep.memory.container == null){
            creep.memory.container = source.pos.findClosestByRange(FIND_STRUCTURES, {filter: (obj) => {return obj.structureType == STRUCTURE_CONTAINER}}).id;
        }
        var dump = Game.getObjectById(creep.memory.container);
        if(!dump.pos.isEqualTo(creep.pos)){
            creep.moveTo(dump);
        } else if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.memory.container = null;
                console.log("too far away");
            }
	}
};

module.exports = roleGeneric;