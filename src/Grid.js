import React, {useState} from 'react'
import "./Grid.css"

function Grid(props) {
  

    const renderBoard = (row) => {
        return(
            <div> 
                {row.map(renderRows)}
            </div>

        ); 

    }

    const renderRows = (tile) => {
        return(
        <button className='grid__button'> {tile} </button>
        ); 


    }



    return (
        <div>
            {props.data.map(renderBoard)}

        </div>
    )
}

export default Grid