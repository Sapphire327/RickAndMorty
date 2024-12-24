export const enum Status{
    Any='Any',
    Alive='Alive',
    Unknown='unknown',
    Dead='Dead',
}

export interface ICharacter{
    id: number
    name:string
    status:Status
    species:string
    image:string
}
export interface IInfo{
    count: number,
    pages: number,
}
export interface IData{
    info: IInfo,
    results: ICharacter[],
}