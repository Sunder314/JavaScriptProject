const charter = function (){
    this.name
    this.age = 0

    this.hello = function () {
        return `Hello ${this.name}`
    }

    this.getAge = function (){
        return this.age
    }
    this.getName = function () {
        return this.name
    }

    this.setName = function(name) {
        this.name = name
        
    }

    this.setAge = function (age){
        this.age = age
    }

}

const company = {
    name: "Gaspar",

    get fullname(){
        return this.name
    },
    set fullname(name) {
        this.name = name
    },
}

cc = company
console.log(cc)


