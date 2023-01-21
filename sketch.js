const W = 600;
const DIM = 6;
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
    tileWidth = W / DIM;
    restart();
}
function restart() {
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

function mouseClicked() {
    // redraw();
    if (mouseX >= W || mouseY >= W) {
        redraw();
        return;
    }
    console.log(grid[Math.floor(mouseY / tileWidth)][Math.floor(mouseX / tileWidth)]);
    // prevent default

}
function draw() {
    background(0);
    for (let i = 0; i < DIM; i++) {
        for (let j = 0; j < DIM; j++) {
            const cell = grid[i][j];
            if (cell.collapsed) {
                if (x == j && y == i) {
                    strokeWeight(tileWidth / size * 2);
                    stroke(225);
                    point(tileWidth * j + tileWidth / 2, tileWidth * i + tileWidth / 2);
                }
                strokeWeight(tileWidth / size);
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
            else {
                fill(0);
                stroke(255);
                strokeWeight(1);
                rect(tileWidth * j, tileWidth * i, tileWidth, tileWidth);

            }
        }
    }
    if (collapsed) {
        noLoop();

    }
    if (!collapse()) {
        restart();
    }
    // noLoop();
}
function collapse() {
    if (isCompleted()) return true;
    const available = [];
    let current = grid[y][x];
    if (y > 0 && grid[y - 1][x].valid() && !current.tried.includes(0)) {

        //TOP
        available.push(0);
    }
    if (x < DIM - 1 && grid[y][x + 1].valid() && !current.tried.includes(1)) {
        //RIGHT
        available.push(1);
    }
    if (y < DIM - 1 && grid[y + 1][x].valid() && !current.tried.includes(2)) {
        //DOWN
        available.push(2);
    }
    if (x > 0 && grid[y][x - 1].valid() && !current.tried.includes(3)) {
        //LEFT
        available.push(3);
    }
    if (available.length < 1) {

        current.collapsed = false;
        current.tried=[];
        // current.visited = true;
        if (current.top) {
            y -= 1;
            current = grid[y][x];
            current.bottom = false;
            current.tried.push(2);
        }
        else if (current.right) {
            x += 1;
            current = grid[y][x];
            current.left = false;
            current.tried.push(3);
        }
        else if (current.bottom) {
            y += 1;
            current = grid[y][x];
            current.top = false;
            current.tried.push(0);
        }
        else if (current.left) {
            x -= 1;
            current = grid[y][x];
            current.right = false;
            current.tried.push(1);
        } else {
            console.log("Fuck");
            // return false;
        }
        // console.log("current X : " + x + " Y : " + y);
        return true;
    }
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
            return true;
    }
    grid[y][x] = cell;
    return true;
}

function isCompleted() {
    collapsed = grid.every((r) => r.every((c) => c.collapsed));
    return collapsed;
}
function rnd(max) {
    return Math.floor(Math.random() * max);
}
