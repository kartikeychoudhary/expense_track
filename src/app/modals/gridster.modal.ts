export class Gridster{
    cols: number;
    rows: number;
    y: number;
    x: number;

    constructor(cols: number, rows: number, x: number, y: number) {
        this.cols = cols;
        this.rows = rows;
        this.y = y;
        this.x = x;
    }
}