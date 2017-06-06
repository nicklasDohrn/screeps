var build = {

    buildClosest: function (creep) {
        var target;
        if (creep.memory.target == null) {
            target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (target == null || target == undefined)
                return false;
            creep.memory.target = target.id;
            creep.memory.order = 2;
        } 
        if(creep.memory.order == 2){
            target = Game.getObjectById(creep.memory.target);
        } else {
            return false;
        }
            var result = creep.build(target);
            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            } else if(result == ERR_INVALID_TARGET) {
                creep.memory.target = null;
                creep.memory.order = 0;
                return false;
            }
            return true;
    }
};

module.exports = build;
