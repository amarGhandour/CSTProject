class Htmlele {
    #eleName;
    constructor(_eleName) {
        this.#eleName = _eleName
    }


    addAttr(attrs, ele) {
        for (const index in attrs) {
            ele.setAttribute(index, attrs[index])
        }
        return ele
    }


    create() {
        let ele = document.createElement(this.#eleName)
        return ele
    }

    create(attrs) {
        let ele = document.createElement(this.#eleName)
        return this.addAttr(attrs, ele)
    }

    static appendChilds(ele,...childs){
        for(const index in childs){
            ele.appendChild(childs[index])
        }
    }


}

export { Htmlele }