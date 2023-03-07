export default class Cel {
    constructor(tag, className, parent,) {
        this.takenStatus = false
        this.TakenBy = ''

        this.element = document.createElement(tag)
        this.element.className = className
        parent.appendChild(this.element)

        return this.element;
    }

    getTakenStatus() {
        return this.takenStatus
    }

    setTakenStatus(status) {
        if (status !== Boolean) return 
        this.takenStatus = status
    } 

    getTakenBy() {
        return this.TakenBy
    }

    setTakenBy(player) {
        if (player !== String) return
        this.TakenBy = player
    }

}