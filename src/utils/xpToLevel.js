const coef = process.env.LEVEL_COEF;

module.exports = (xp) => {
    let index = 0;
    let currCoef = 1;
    while (100 * (currCoef * index) <= xp) {
        index++;
        if(100 * ((currCoef * coef) * index) <= xp){
            currCoef *= coef;
        }
    }
    const next = 100 * (currCoef * index);
    const left = (next - xp);
    index--;
    return {
        level: index,
        levelXp: 100 * (currCoef * index),
        left: Math.round(left * 100) / 100,
        next: Math.round(next * 100) / 100,
    };
}