import Die from "./Die.js";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
    const [rollNumber, setrollNumber] = React.useState(0);
    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);
    const [record, setRecord] = React.useState(
        localStorage.getItem("Record", JSON.stringify(rollNumber)) || 0
    );
    //console.log(record);
    React.useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every((die) => die.value === firstValue);
        if (allHeld && allSameValue) {
            setTenzies(true);
            //console.log("You won!");
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
        if (!tenzies) {
            setDice((oldDice) =>
                oldDice.map((die) => {
                    return die.isHeld ? die : generateNewDie();
                })
            );
            setrollNumber((prevRollNumber) => {
                //console.log(prevRollNumber);
                return prevRollNumber + 1;
            });
        } else {
            setTenzies(false);
            setRecord((prevRecord) => {
                console.log(prevRecord);
                console.log(rollNumber);
                if (prevRecord === 0) {
                    return localStorage.setItem(
                        "Record",
                        JSON.stringify(rollNumber)
                    );
                }
                if (rollNumber < prevRecord) {
                    return localStorage.setItem(
                        "Record",
                        JSON.stringify(rollNumber)
                    );
                }
            });
            setDice(allNewDice());
            setrollNumber(0);
        }
    }

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dice-container">{diceElements}</div>
            <div>
                <p className="instructions">Number of rolls : {rollNumber}</p>
            </div>

            <button className="roll-dice" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
            {tenzies && <Confetti />}

            <div className="record">
                <p className="record-title">Record</p>
                <p className="record-text">Rolls : {record} || Time : </p>
            </div>
        </main>
    );
}

export default App;
