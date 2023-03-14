import Die from "./Die.js";
import React from "react";
import { nanoid } from "nanoid";

function App() {
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstValue);
        if (allHeld && allSameValue) {
            setTenzies(true);
            console.log("You won!");
        }
    }, [dice]);

    // cerate the board of dices
    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie());
        }
        return newDice;
    }

    //Generate a new die
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        };
    }

    //console.log(allNewDice());
    //console.log(dice);
    // console.log(setDice);

    // keep the Dice that was clicked with the color green
    function holdDice(id) {
        setDice((prevDice) => {
            return prevDice.map((die) => {
                return die.id === id
                    ? {
                          ...die,
                          isHeld: !die.isHeld,
                      }
                    : die;
            });
        });
    }

    // affiche tous les elements de l'array Dice sur le dom
    const diceElements = dice.map((die) => (
        <Die
            key={die.id}
            number={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ));

    // change les chiffres des dices qui ne sont pas selectionés
    function rollDice() {
        setDice((oldDice) =>
            oldDice.map((die) => {
                return die.isHeld ? die : generateNewDie();
            })
        );
    }

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dice-container">{diceElements}</div>
            <button className="roll-dice" onClick={rollDice}>
                Roll
            </button>
        </main>
    );
}

export default App;
