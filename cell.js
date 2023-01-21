class Cell {
    constructor(col) {
        this.collapsed = col;
        this.top = false;
        this.left = false;
        this.right = false;
        this.bottom = false;
        this.tried = [];

    }
    valid(){
        return !this.collapsed;
    }
}
