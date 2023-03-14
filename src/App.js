import Die from "./Die.js";
import React from "react";

function App() {
    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
            });
        }
        return newDice;
    }
    //console.log(allNewDice());

    const [dice, setDice] = React.useState(allNewDice());

    // console.log(dice);
    // console.log(setDice);

    const diceElements = dice.map((die) => <Die number={die.value} />);

    function rollDice() {
        setDice(() => allNewDice());
    }

    return (
        <main>
            <div className="dice-container">{diceElements}</div>
            <button className="roll-dice" onClick={rollDice}>
                Roll
            </button>
        </main>
    );
}

export default App;
