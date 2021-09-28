class Component {
    constructor() {
        this.state = {}
        this.prop = {}
        this.node = null
        this.done = null
    }
    setState() {
        return {}
    }
    setDefaultState() {
        this.state = this.setState()
    }
    addEventListener() {
        return [];
    }
    settingListener(parent) {
        this.addEventListener().map(selector => {
            let nodeList = parent.querySelectorAll('[' + selector + ']')
            for (let index = 0; index < nodeList.length; index++) {
                const node = nodeList[index];
                let method = node.getAttribute(selector)
                node.addEventListener(selector, this[method].bind(this))
            }
        });
    }
    setChildComponent() {
        return [];
    }
    setProperties(node, instanceComponet) {
        for (let index = 0; index < node.attributes.length; index++) {
            if (typeof this[node.attributes[index].value] == 'function') {
                instanceComponet.prop[node.attributes[index].name] = this[node.attributes[index].value]()
            }
        }
    }
    addChild(parent) {
        this.setChildComponent().map(subComponent => {
            let nodeList = parent.querySelectorAll(subComponent.name)
            for (let index = 0; index < nodeList.length; index++) {
                const node = nodeList[index];
                let instanceComponet = new subComponent
                this.setProperties(node, instanceComponet)
                let newNode = instanceComponet.exec()
                node.parentNode.replaceChild(newNode, node)
            }
        })
        return parent
    }
    map(propName, callback) {
        if (Array.isArray(this.prop[propName]))
            return this.prop[propName].map(callback).join('')
        console.error(`Property ${propName} is not Array`);
        throw `Property ${propName} is not Array`
    }
    setNewState(state) {
        this.state = state
        let old = this.node
        this.node.parentNode.replaceChild(this.exec(true), old)//?
        this.afterUpdate(this.node.parentNode)
    }
    beforeAppendChild() {

    }
    afterUpdate() {

    }
    template() {
        throw "No template"
    }
    propMap(callback) {
        Object.keys(this.prop).forEach(keys => {
            if (Array.isArray(this.prop[keys]))
                this.prop[keys].__proto__.toString = function () {
                    return this.join('');
                };
        })
        return this.prop
    }
    exec(update = false) {
        if (!update) this.setDefaultState()
        let node = new DOMParser().parseFromString(this.template(this.propMap()), 'text/html')
        this.settingListener(node.body)
        this.addChild(node.body)
        if (!this.done) {
            this.done = true
            this.beforeAppendChild(node.body)
        }
        let out = node.body.firstChild
        this.node = out
        return out
    }
    querySelector(selector) {
        document.querySelector(selector).appendChild(this.exec())
    }
}

export default Component