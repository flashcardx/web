const LEVEL_CONSTANT = 0.2;

export function getLevel(points){
    return Math.floor(LEVEL_CONSTANT * Math.sqrt(points));
}


export function getUpperLimit(points){
    const nextLevel = getLevel(points) + 1;
    return Math.pow(nextLevel/LEVEL_CONSTANT, 2);
}