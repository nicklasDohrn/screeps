var parts = [
    {type: WORK,
    cost: 100},
    {type: MOVE,
    cost: 50},
    {type: CARRY,
    cost: 50}
];
var addBalanced = function (budget) {
        var creep = [WORK, MOVE, CARRY];
        var total = 200 + parts[0].cost;
        var counter = 0;
        do {
            creep.push(parts[counter++%3].type);
            total += parts[counter%3].cost;
        }while(total <= budget);
        return creep;
    }
    
    var addCargo = function (budget) {
        var creep = [MOVE, CARRY,CARRY];
        var total = 250 + parts[2].cost;
        var counter = 0;
        do {
            creep.push(parts[counter++%2 + 1].type);
            total += parts[counter%2 + 1].cost;
        }while(total <= budget);
        return creep;
    }

var spawner = {

    /** @param {Creep} creep **/
    spawn: function () {
        Memory.generics = _.filter(Game.creeps, (creep) => creep.memory.role == 'generic').length;
        Memory.transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter').length;
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        Memory.miners = miners.length;
        Memory.upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;
        //if all die
        if(Memory.generics < 4) {
            var newName = Game.spawns['Legion'].createCreep(addBalanced(200), undefined, {
                role: 'generic',
                harvesting: null,
                target: null,
                order: 0
            });
        }
        //spawn correct generics
        if (Memory.generics < 7) {
            var newName = Game.spawns['Legion'].createCreep(addBalanced(Math.min(Memory.budget, 800)), undefined, {
                role: 'generic',
                harvesting: null,
                target: null,
                order: 0
            });
            console.log('Spawning new generic: ' + newName);
        } else if(Memory.upgrader < 0) {
            var newName = Game.spawns['Legion'].createCreep([WORK, CARRY, CARRY, MOVE], undefined, {
                role: 'upgrader',
                harvesting: null,
                target: null
            });
            console.log('Spawning new upgrader: ' + newName);
        //spawn miners for room
        } else if (Memory.budget >= 550 && miners.length < 2) {
            var sources = Game.spawns['Legion'].room.find(FIND_SOURCES);
            if(miners.length < sources.length){ 
                var exists = false;
                for (var name in sources) {
                    for (var creep in miners) {
                        if (miners[creep].memory.source == sources[name].id) {
                            exists = true;
                        }
                    }
                    if (!exists) {
                        Game.spawns['Legion'].createCreep([WORK, WORK, WORK, WORK, WORK, MOVE], undefined, {
                            role: 'miner',
                            source: sources[name].id
                        });
                    }
                }
            }
        } else if (Memory.budget >= 550 && Memory.transporters < 2) {
            var newName = Game.spawns['Legion'].createCreep(addCargo(Math.min(Memory.budget, 800)), undefined, {
                role: 'transporter',
                harvesting: null,
                target: null,
                order: 0
            });
            console.log('Spawning new generic: ' + newName);
        }
    },
    update: function () {
        var extensions = Game.spawns['Legion'].room.find(FIND_STRUCTURES, {filter: (obj) => {return obj.structureType == STRUCTURE_EXTENSION}});
        if(extensions == null) {
            Memory.budget = 300;
        }
        Memory.budget = 300 + extensions.length * 50;
    }
};

module.exports = spawner;
