import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#f9bc60" : "#eff0f3"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}