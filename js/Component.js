class Component {
    constructor(){
        this.state = {}
        this.prop = {}
        this.node = null
        this.done = null
    }
    setState(){
        return {}
    }
    setDefaultState(){
        this.state = this.setState()
    }
    addEventListener() {
        return [];
    }
    settingListener(parent){
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
    setProperties(node, instanceComponet){
        for (let index = 0; index < node.attributes.length; index++) {
            if(typeof this[node.attributes[index].value] == 'function'){
                instanceComponet.prop[node.attributes[index].name] = this[node.attributes[index].value]()
            }
        }
    }
    addChild(parent){
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
    map(name, callback){
        if(Array.isArray(this.prop[name]))
            return this.prop[name].map(callback).join('')
        throw `Property ${name} is not Array`
    }
    setNewState(state){
        this.state = state
        console.log(this.state);
        let old = this.node
        this.node.parentNode.replaceChild(this.exec(true), old)//?
        this.afterUpdate(this.node.parentNode)
    }
    beforeAppendChild(){

    }
    afterUpdate(){

    }
    exec(update = false) {
        if(!update) this.setDefaultState()
        let node = new DOMParser().parseFromString(this.template(), 'text/html')
        this.settingListener(node.body)
        this.addChild(node.body)
        let out = node.body.firstChild
        this.node = out
        if(!this.done){
            this.done = true
            this.beforeAppendChild(node.body)
        }
        return out
    }
    querySelector(selector){
        document.querySelector(selector).appendChild(this.exec())
    }
}

export default Component