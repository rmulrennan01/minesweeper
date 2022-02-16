import React, {useState} from 'react'
import Grid from './Grid.js'

function Game() {
    const [tile_data, set_tile_data] = useState([]); 
    const [board_size, set_board_size] = useState(20); //x & y dimension of the game board
    const [mine_count, set_mine_count] = useState(20); 
    const [mine_coord, set_mine_coord] = useState([]); 


    /*
    tile_data:
        x: 0 <= int < board_size
        y: 0 <= int < board_size
        val: string to display proximity count, mine, or empty
        flag: bool
        hide: bool

    */
    
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
            while(compareCoords(tempX,tempY, mine_coord)){
                tempX = Math.floor(Math.random()*(mine_count)); 
                tempY= Math.floor(Math.random()*(mine_count)); 
            }
            temp_coords.push([tempX, tempY]); 
        }
        console.log(temp_coords); 
       set_mine_coord(temp_coords); 
    }

    const placeMines = (table) =>{
        let tempBoard = table; 
        mine_coord.map(function(item){
            tempBoard[item[0]][item[1]]="M";
        } )
        return(tempBoard); 
    }

    const compareCoords = (x,y,arry) =>{
        let result = false; 
        arry.map(function(coord){
            if(coord[0]==x && coord[1]==y){
                result=true; 
            }
            console.log("ran"); 

        })
        return result; 
    }

    const updataProxVals = (table) =>{
        let tempBoard = table; 
        mine_coord.map(function(mines){
            let tempX=0; 
            let tempY=0; 
            for (let i=-1; i<2; i++){
                tempX=mines[0]+i; 
                if(tempX>=0 && tempX<board_size){ //X not off the game board
                    for (let k=-1; k<2; k++){
                        tempY=mines[1]+k; 
                        if(tempY>=0 && tempY<board_size){ //Y not off the game board
                            if(tempBoard[tempX][tempY] != 'M'){
                                tempBoard[tempX][tempY] = Number(tempBoard[tempX][tempY])+Number(1);
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