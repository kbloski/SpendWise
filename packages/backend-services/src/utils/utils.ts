export function isNumber( value: any ) :boolean 
{
    const checkedValue = Number(value)
    return typeof checkedValue === 'number' && !isNaN(checkedValue)
}

export function isValidDate( dateString: string){
    const date = new Date( dateString )
    return !isNaN(date.getTime())
}
