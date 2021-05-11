const prismaClient = require("./prismaClient")



exports.boss = async (request) => {
    const { params: { bossId } } = request;

    let boss;

    if (bossId) {
        boss = await prismaClient.boss.findUnique({
            where: {
                id
            }
        })
    } else {
        boss = await prismaClient.boss.findMany()
    }

    return boss
};


exports.phase = (request) => {
    const { params } = request;

    return [+params.raidId, +params.bossId, +params.phaseId];
};

exports.roles = (request) => {
    const { params } = request;

    return [+params.raidId, +params.bossId, +params.phaseId, 'roles'];
};
