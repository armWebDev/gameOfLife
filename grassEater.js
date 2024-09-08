
class GrassEater{
    constructor(x,y){
        this.x = x; 
        this.y = y;
        this.multiply = 0;
        this.energy = 20
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

            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        if(this.energy <= 0){
            this.die()
        }

    }
    mul(){
        this.multiply ++;
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell);
        
        if(newCell && this.multiply >= 8){

            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 1;
            
            let eater = new GrassEater(newX, newY);
            eaterArr.push(eater);
            this.multiply = 0;

        }
    }
    eat(){
        let emptyCell = this.chooseCell(1);
        let newCell = random(emptyCell)
        
        if(newCell){
            let newX = newCell[0]
            let newY = newCell[1]

            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

            for(let i = 0; i < grassArr.length; i++){
                if(grassArr[i].x == newX && grassArr[i].y == newY){
                    grassArr.splice(i,1)
                    break
                }
            }
            this.energy++

            if(this.energy >= 21){
                this.mul()
                this.energy = 20
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
        for(let i = 0; i < eaterArr.length; i++){
            if(eaterArr[i].x == this.x && eaterArr[i].y == this.y){
                eaterArr.splice(i, 1)
                break   
            }
        }
    }
}
