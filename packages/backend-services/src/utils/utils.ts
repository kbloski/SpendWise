export function isNumber( value: any ) :boolean 
{
    const checkedValue = Number(value)
    return typeof checkedValue === 'number' && !isNaN(checkedValue)
}