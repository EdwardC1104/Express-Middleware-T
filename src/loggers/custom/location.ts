const getLocation = (stepInStack: number = 1) => {
    try {
        throw new Error('Log stack');
    } catch (e: any) {
        try {
            const err: Error = e;

            if (!err.stack) throw new Error('No stack');

            const stackLocations = err.stack
                .split('\n')
                .map((m) => m.trim())
                .filter((m) => m.startsWith('at'));

            return String(stackLocations[stepInStack]).slice(3);
        } catch (e) {
            return '';
        }
    }
};

export { getLocation };
