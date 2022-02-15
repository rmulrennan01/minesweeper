import React, {useState} from 'react'
import Grid from './Grid.js'

function Game() {
    const [tile_data, set_tile_data] = useState([]); 
    const [board_size, set_board_size] = useState(20); //x & y dimension of the game board
    const [mine_count, set_mine_count] = useState(20); 
    const [mine_coord, set_mine_coord] = useState([]); 
    

    const buildTable = () =>{
        let tempData = []; 
        let minesAdded = 0; 
        generateMineLocations(); 
        
        for (let i = 0; i<board_size; i++){
            let tempRow = []; 
            for (let k = 0; k<board_size; k++){
                if(mine_coord.includes([i,k])){
                    tempRow.push(["X"]); 
                }
                else{
                    tempRow.push([0]); 
                }
            }
            tempData.push(tempRow); 
        }
        set_tile_data(tempData); 
    }

    const generateMineLocations = () =>{
        let temp_coords = []; 
        for (let i = 0; i<mine_count; i++){
            let tempX = Math.floor(Math.random()*(mine_count)); 
            let tempY= Math.floor(Math.random()*(mine_count)); 
            while(mine_coord.includes([tempX,tempY])){
                tempX = Math.floor(Math.random()*(mine_count)); 
                tempY= Math.floor(Math.random()*(mine_count)); 
            }
            temp_coords.push([tempX, tempY]); 

        }
        set_mine_coord(temp_coords); 
        
    }




    

  return (
    <div> 
        <button onClick={buildTable}> Generate</button>
        <Grid data={tile_data}/>
    </div> 
  )
}

export default Game