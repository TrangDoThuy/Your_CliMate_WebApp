function Person(props){
    return (
        <div className="person">
            <h1>{props.name}</h1>
            <p>Your age: {props.age}</p>
        </div>
    );
}

ReactDOM.render(<Person name = "Emma" age = "22"/>, document.querySelector('#p1'));
ReactDOM.render(<Person name = "Peter" age = "22"/>, document.querySelector('#p2'));

class Person{
    constructor(){
        this.name = "Peter";
    }
    printName(){
        console.log(this.name);
    }
}

myMethod = () =>{...}