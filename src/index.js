import Component from "../js/Component.js";

class SomeClass extends Component {
    setState() { return { n: 0 } }
    addEventListener() { return ['click'] }
    add() {
        this.state.n++
        this.setNewState(this.state)
    }
    template() {
        return `<div>
            <div click="add">
                CLICK ME ====> ${this.state.n} <==== CLICK ME
            </div>
        </div>`
    }
}


let content = new SomeClass();

content.querySelector('.app')