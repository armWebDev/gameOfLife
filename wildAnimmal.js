class Wild {
    constructor(x, y) {
        this.x = x; 
        this.y = y;
        this.multiply = 0;
        this.energy = 8; 
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character1, character2) {
        let found = [];
        for (let [x, y] of this.directions) {
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] === character1 || matrix[y][x] === character2) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }

    move() {
        this.energy--;
        let emptyCell = this.chooseCell(0);
        let newCell = emptyCell.length > 0 ? random(emptyCell) : null;

        if (newCell) {
            let [newX, newY] = newCell;
            matrix[newY][newX] = 3; 
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
        if (this.energy <= 0) {
            this.die();
        }
    }

    mul() {
        this.multiply++;
        let emptyCell = this.chooseCell(0);
        let newCell = emptyCell.length > 0 ? random(emptyCell) : null;

        if (newCell && this.multiply >= 8) {
            let [newX, newY] = newCell;
            matrix[newY][newX] = 3; 
            
            let newWild = new Wild(newX, newY);
            wildArr.push(newWild);
            this.multiply = 0;
        }
    }

    eat() {
        let emptyCell = this.chooseCell(2).concat(this.chooseCell(1));
        let newCell = emptyCell.length > 0 ? random(emptyCell) : null;

        if (newCell) {
            let [newX, newY] = newCell;

            matrix[newY][newX] = 3; 
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            if (matrix[newY][newX] === 1) { 
                for (let i = 0; i < grassArr.length; i++) {
                    if (grassArr[i].x === newX && grassArr[i].y === newY) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            } else if (matrix[newY][newX] === 2) { 
                for (let i = 0; i < eaterArr.length; i++) {
                    if (eaterArr[i].x === newX && eaterArr[i].y === newY) {
                        eaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            
            this.energy++;

            if (this.energy >= 9) {
                this.mul();
                this.energy = 8; 
            }
        } else {
            this.move();
        }
        if (this.energy <= 0) {
            this.die();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < wildArr.length; i++) {
            if (wildArr[i].x === this.x && wildArr[i].y === this.y) {
                wildArr.splice(i, 1);
                break;
            }
        }
    }
}
