
let grassArr = []
let eaterArr  = []
let wildArr  = []
let hunterArr = []

function generateMatrix(size, grassCount,grassEaterCaunt, wildCount,hunterCount){
    var matrix = [
    
    ];
   for(let i = 0; i < size; i++){
    matrix[i] = []
    for(let j = 0; j < size; j++){
        matrix[i].push(0)
    }
   }
    

   for(let i = 0; i < grassCount; i++){
    let x = Math.floor(Math.random() * size)
    let y = Math.floor(Math.random() * size)

    matrix[x][y] = 1
   }

   for(let i = 0; i < grassEaterCaunt; i++){
    let x = Math.floor(Math.random() * size)
    let y = Math.floor(Math.random() * size)

    matrix[x][y] = 2
    
   }

   for(let i = 0; i < wildCount; i++){
    let x = Math.floor(Math.random() * size)
    let y = Math.floor(Math.random() * size)

    matrix[x][y] = 3
   }

   for(let i = 0; i < hunterCount; i++){
    let x = Math.floor(Math.random() * size)
    let y = Math.floor(Math.random() * size)

    matrix[x][y] = 4
   }
   return matrix
}


let matrix = generateMatrix(50,150,100,50,10)

console.log(matrix);

var side = 10;

function setup() {
    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length *
        side);
    background('#acacac');

    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j] == 1){
                let newGrass = new Grass(j,i)
                grassArr.push(newGrass)
            }
            else if(matrix[i][j] == 2){
                
                let newGrassEater = new GrassEater(j,i)
                eaterArr.push(newGrassEater)
            }
            else if(matrix[i][j] == 3){
                let newWild = new Wild(j,i)
                wildArr.push(newWild)
            }
            else if(matrix[i][j] == 4){
                let newHunter = new Hunter(j,i)
                hunterArr.push(newHunter)
            }
        }
    }
    
    
}


function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);
            /*
            fill("blue")
            text(x+" "+y, x*side+side/2,y*side+side/2)
            */
        }
    }

    for(let grass of grassArr){
        grass.mul()
    }
    for(let eater of eaterArr){
       
        eater.eat()
        

    }

    for(let wild of wildArr){
       
        wild.eat()
    }
    for(let hunt of hunterArr){
       
        hunt.eat()
    }
}