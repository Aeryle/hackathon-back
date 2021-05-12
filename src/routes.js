const prismaClient = require("./prismaClient")

exports.boss = async (request) => {
    const { params: { bossId } } = request;

    let boss;
    let phases;

    if (bossId) {
        boss = await prismaClient.boss.findUnique({
            where: {
                id: bossId
            }
        });
        phases = await prismaClient.phase.findMany({
            where: {
                bossId
            }
        });
    } else {
        boss = await prismaClient.boss.findMany();
    }

    return bossId ? { ...boss, phases } : boss;
};


exports.phase = async (request) => {
    const { params: { bossId, phaseId } } = request;

    const roles = await prismaClient.role.findMany();
    console.log({ roles });

    return await prismaClient.strategy.findMany({
        where: {
            bossId,
            phaseId
        }
    });
};

exports.strategies = async (request) => {
    const { params: { bossId, phaseId } } = request;

    return await prismaClient.strategy.findUnique({
        where: {
            bossId,
            phaseId
        }
    });
};
