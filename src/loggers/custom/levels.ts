import _ from 'lodash';

const levels = {
    error: 'error',
    warn: 'warn',
    info: 'info',
    debug: 'debug',
};

const levelsNumbers = {
    [levels.error]: 1,
    [levels.warn]: 2,
    [levels.info]: 3,
    [levels.debug]: 4,
};

type Level = keyof typeof levels;

const getLevelNumber = (lvl: Level) => {
    const result = levelsNumbers[lvl];

    return _.isNil(result) ? 10 : result;
};

const isAllowed = (expectedLevel: Level, level: Level) => {
    return getLevelNumber(level) <= getLevelNumber(expectedLevel);
};

export { getLevelNumber, isAllowed, Level };
