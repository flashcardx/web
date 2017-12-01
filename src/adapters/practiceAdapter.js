const LEVEL_CONSTANT = 0.1;

export function getLevel(points){
    return Math.floor(LEVEL_CONSTANT * Math.sqrt(points));
}