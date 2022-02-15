import React, {useState} from 'react'
import Grid from './Grid.js'

function Game() {
    const [tile_data, set_tile_data] = useState([]); 
    const [board_size, set_board_size] = useState(20); //x & y dimension of the game board
    const [mine_count, set_mine_count] = useState(20); 
    const [mine_coord, set_mine_coord] = useState([]); 
    
    const buildTable = () =>{
        let tempData = [];        
        for (let i = 0; i<board_size; i++){
            let tempRow = []; 
            for (let k = 0; k<board_size; k++){
                    tempRow.push([0]); 
            }
            tempData.push(tempRow); 
        }
        generateMineLocations(); 
        tempData=placeMines(tempData); 
        tempData=updataProxVals(tempData); 
 
        set_tile_data(tempData);
      
     
    }


    const generateMineLocations = () =>{ //Creates x,y coordinates for random mine placement
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

    const placeMines = (table) =>{
        let tempBoard = table; 
        mine_coord.map(function(item){
            tempBoard[item[0]][item[1]]="M";
        } )
        return(tempBoard); 
    }

    const updataProxVals = (table) =>{
        let tempBoard = table; 
        mine_coord.map(function(mines){
            let tempX=0; 
            let tempY=0; 
            for (let i=-1; i<1; i++){
                tempX=mines[0]+i; 
                if(tempX>=0){
                    for (let k=-1; k<1; k++){
                        tempY=mines[1]+k; 
                        console.log("made it"); 
                        if(tempY>=0){
                            if(tempBoard[tempX][tempY] !="M"){
                                tempBoard[tempX][tempY] = tempBoard[tempX][tempY]+1;
                            }
                        }
                        //if(tempY>=0 && (tempBoard[tempX][tempY] !="M")){
                            //tempBoard[tempX][tempY] = tempBoard[tempX][tempY]+1; 
                            //console.log(tempX,tempY); 
                        //}
                    }
                }
            }
        })
        return(tempBoard); 
    }


  return (
    <div> 
        <button onClick={()=>buildTable()}> Generate</button>
        <Grid data={tile_data}/>
    </div> 
  )
}

export default Game