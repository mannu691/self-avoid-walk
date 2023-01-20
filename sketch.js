const W = 600;
const DIM = 10;
const size = 3;
let tileWidth;
let grid = [];
let startX;
let startY;
let x;
let y;
let collapsed = false;



function setup() {
    createCanvas(W, W);
    fillGrid();
    tileWidth = W / DIM;
    x = rnd(DIM);
    y = rnd(DIM);
    startX = x;
    startY = y;
    grid[y][x].collapsed = true;
}
function restart(){
    fillGrid();
    x = rnd(DIM);
    y = rnd(DIM);
    startX = x;
    startY = y;
    grid[y][x].collapsed = true;
}
function fillGrid() {
    for (let i = 0; i < DIM; i++) {
        let row = [];
        for (let j = 0; j < DIM; j++) {
            row.push(new Cell(false));
        }
        grid[i] = row;
    }
}


function mousePressed() {
    redraw();
}
function draw() {
    background(0);
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            const cell = grid[i][j];
            if (cell.collapsed) {
                if (x == j && y == i) {
                    strokeWeight(tileWidth/size*2);
                    stroke(225);
                    point(tileWidth * j + tileWidth / 2, tileWidth * i + tileWidth / 2);
                }
                strokeWeight(tileWidth/size);
                stroke(255);
                const cenX = tileWidth * j + tileWidth / 2;
                const cenY = tileWidth * i + tileWidth / 2;
                if (cell.top) {
                    line(cenX, cenY, cenX, tileWidth * i);
                }
                if (cell.right) {
                    line(cenX, cenY, tileWidth * j + tileWidth, cenY);
                }
                if (cell.bottom) {

                    line(cenX, cenY, cenX, tileWidth * i + tileWidth);
                }
                if (cell.left) {
                    line(cenX, cenY, tileWidth * j, cenY);
                }
            }
        }
    }
    if(collapsed){
        noLoop();
        
    }
    if (!collapse()) {
        restart();
    }
    // noLoop();
}
function collapse() {
    const available = [];
    const current = grid[y][x];
    if (y > 0 && !grid[y - 1][x].collapsed) {
        //TOP
        available.push(0);
    }
    if (x < DIM - 1 && !grid[y][x + 1].collapsed) {
        //RIGHT
        available.push(1);
    }
    if (y < DIM - 1 && !grid[y + 1][x].collapsed) {
        //DOWN
        available.push(2);
    }
    if (x > 0 && !grid[y][x - 1].collapsed) {
        //LEFT
        available.push(3);
    }
    if(grid.every((r)=>r.every((c)=>c.collapsed))){
        collapsed = true;
        return true;
    }
    if (available.length < 1) return false;
    const dir = random(available);
    const cell = new Cell(true);
    switch (dir) {
        case 0:
            y -= 1;
            current.top = true;
            cell.bottom = true;
            break;
        case 1:
            x += 1;
            current.right = true;
            cell.left = true;
            break;
        case 2:
            y += 1;
            current.bottom = true;
            cell.top = true;
            break;
        case 3:
            x -= 1;
            current.left = true;
            cell.right = true;
            break;
        default:
            break;
    }

    grid[y][x] = cell;
    return true;
}

function rnd(max) {
    return Math.floor(Math.random() * max);
}
