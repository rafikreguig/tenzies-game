import React from "react"
import Die from "./Die"
import Footer from "./Footer"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import line from "./imgs/line.png"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [roll, setRoll] = React.useState(0)
    const [height, setHeight] = React.useState(0)
    const [width, setWidth] = React.useState(0)

    const ref = React.useRef(null)
   
    React.useLayoutEffect(() => {
      setHeight(ref.current.offsetHeight)
      setWidth(ref.current.offsetWidth)
    }, [])


    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    
    function rollDice() {
       if(tenzies){
         setTenzies(false)
         setDice(allNewDice())
         setRoll(0)
       } else {    
         setRoll(prevRoll => prevRoll+1) 
         setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
         }))
       }
       
    }
     
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
       <section className="section"> 
        <main ref={ref}>
            {tenzies && <Confetti width={width} height={height} />}
            <div className="title--con">
               <h1 className="title">Tenzies</h1>
               <img src={line} alt="line" />
            </div>      
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            {tenzies && 
             <h3 className="cong--statment">
                Congratilation! You did it in {roll} {roll == 1 ? "roll" : "rolls"}.
             </h3>}
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
        <Footer />
      </section>
    )
}

