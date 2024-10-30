export function buildApiPath( ...parts : string[]){
    return '/api/' + parts.join('/')
}