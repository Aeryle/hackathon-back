const prismaClient = require("./prismaClient")

exports.boss = async (request) => {
    const { params: { bossId } } = request;

    let boss;
    let phases;
    let videos;

    if (bossId) {
        boss = await prismaClient.boss.findUnique({ where: { id: bossId } });

        phases = await prismaClient.phase.findMany({ where: { bossId } }) || [];

        videos = await prismaClient.video.findMany({ where: { bossId } }) || [];
    } else {
        boss = await prismaClient.boss.findMany();
    }

    return bossId ? { ...boss, phases, videos } : boss;
};


exports.phases = async (request) => {
    const { params: { bossId, phaseId } } = request;

    const strategies = await prismaClient.strategy.findMany({ where: { phaseId } });
    const roles = await prismaClient.role.findMany();

    return strategies.map((strategy, index) => ({
        ...strategy, role: roles.find((role) => role.id === strategy.roleId)
    }));
};
