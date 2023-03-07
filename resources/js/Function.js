export default class Function {
    /**
     * creates an html element
     * 
     * @param {string} tag 
     * @param {string} className 
     * @param {*} parent 
     * @param {string} inner 
     * 
     * @returns
     */

    constructor(){
        
    }
    
    createHTMLElement(tag, className, parent, inner = '') {
        let element = document.createElement(tag)
        element.className = className
        parent.appendChild(element)

        if (inner !== null){
            element.innerHTML = inner;
        }
        return element;
    }
}