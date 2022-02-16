import React, {useState} from 'react'
import "./Grid.css"

function Grid(props) {
   
  


    const renderBoard = (row,index) => {
        return(
            <div key={index}> 
                {row.map(renderRows)}
                
            </div>
        ); 
    }

    const renderRows = (tile) => {
        let displayVal = tile.val; 

        if(tile.hide){
            displayVal= "."; 
        }
  
        return(
            <button key={tile.key} onClick={()=>props.show(tile.x,tile.y)} className='grid__button'> {displayVal} </button>        
            ); 
        
    }

    return (
        <div>
            {props.data.map(renderBoard)}
        </div>
    )
}

export default Grid