class Feline {
    constructor(name){
        this.name = name
    }
    run(){
        return "Run"
    }

}

class Cat extends Feline {
    miaou(){
        return "miaouuuu"
    }
}

class Lion extends Feline {
    roar(){
        return "Roar"
    }
}

const garfield = new Cat()
const simba = new Lion()

console.log(simba.run());
