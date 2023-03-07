import Cel from './Cel.js'

export default class Board{
    constructor(parent) {
        for(let i = 0; i < 42; i++){
            let cel = new Cel('div', 'cel', parent)
        }
    }
}
