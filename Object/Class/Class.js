class Car {
    constructor(brand,model){
        this.brand = brand;
        this.model = model
    }

    klaxon() {
        return "tut tut"
    }

    get fullname(){
        return `${this.brand} ${this.model}`
    }

}

const roma = new Car("ferrari", "roma");
const c15 = new Car("Citroen", "c15 (de seigneur)");
console.log(c15.fullname);