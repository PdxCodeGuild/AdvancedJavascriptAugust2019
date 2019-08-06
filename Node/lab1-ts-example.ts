class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distance(otherPoint: Point): number {
    const a = this.x - otherPoint.x;
    const b = this.y - otherPoint.y;

    return Math.sqrt(a*a + b*b);
  }
}

const p1 = new Point(5, 7)