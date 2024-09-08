
class Hunter{
    constructor(x,y){
        this.x = x; 
        this.y = y;
        this.multiply = 0;
        this.energy = 250
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    
        
    }

    chooseCell(character){
        let found = [];

        for(let i = 0; i< this.directions.length; i++){
            let x = this.directions[i][0];
            let y = this.directions[i][1];

             if(x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if( matrix[y][x]=== character){
                    found.push(this.directions[i])
               }
             }

        }


        return found;
    }
    move(){
        this.energy--;
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell)

        if(newCell){
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        if(this.energy <= 0){
            this.die()
        }

    }
   
    mul() {
        this.multiply++;
        let emptyCell = this.chooseCell(0);
        let newCell = emptyCell.length > 0 ? random(emptyCell) : null;

        if (newCell && this.multiply >= 8) {
            let [newX, newY] = newCell;
            matrix[newY][newX] = 4; 
            
            let newHunter = new Hunter(newX, newY);
            hunterArr.push(newHunter);
            this.multiply = 0;
            console.log(`New Wild created at (${newX}, ${newY})`);
            
        }
      
    }
    eat(){
        let emptyCell = this.chooseCell(3);
        let newCell = random(emptyCell)
        
        if(newCell){
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for(let i = 0; i < wildArr.length; i++){
                if(wildArr[i].x == newX && wildArr[i].y == newY){
                    wildArr.splice(i,1)
                    break
                }
            }
            this.energy++

            if(this.energy >= 251){
                this.mul()
                this.energy = 250
            }

        } else {
            this.move()
        }
        if(this.energy <= 0){
            this.die()
        }
    }
    die(){
        matrix[this.y][this.x] = 0;
        for(let i = 0; i < hunterArr.length; i++){
            if(hunterArr[i].x == this.x && hunterArr[i].y == this.y){
                hunterArr.splice(i, 1)
                break   
            }
        }
    }
}
