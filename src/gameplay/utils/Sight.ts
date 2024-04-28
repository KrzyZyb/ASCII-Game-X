import Vector from "../Vector";
import Layer, { DrawingOperation } from "../Layer"
import Player from "../../objects/actors/player/Player"
import Color from "../../view/colors/Color";
import { ColorValue } from "../../view/colors/ColorValue";

export default class Sight {

  static renderFieldOfView(player: Player, backgroundOperations: DrawingOperation[], objectsOperations: DrawingOperation[]){
    let coordinatesOfCellsInRadiusOfSight = Sight.findCellsInSightRadius(player);
    let cellsInRadiusOfSight = Sight.filterCells(backgroundOperations, objectsOperations, coordinatesOfCellsInRadiusOfSight)

    cellsInRadiusOfSight.forEach(op => {
      let brightness = (1 - Sight.calculateDistance(op.pos, player.pos)*0.05);
      op.color = new Color(255, 255, 255, brightness);
    })

    if(this.isInRadiousOfSight(objectsOperations[0].pos, cellsInRadiusOfSight)){
      let los = this.lineOfSight(player.pos, objectsOperations[0].pos);
      this.colorLosCells(los, cellsInRadiusOfSight);
    }
  }

  private static findCellsInSightRadius(player: Player): Vector[] {
    let radius = player.sightRange;
    let playerPosition = player.pos;
    const cells: Vector[] = [];
  
    for (let xOffset = -radius; xOffset <= radius; xOffset++) {
        for (let yOffset = -radius; yOffset <= radius; yOffset++) {
            const newX = playerPosition.x + xOffset;
            const newY = playerPosition.y + yOffset;
  
            // Calculate the distance between the player position and the current cell
            const distance = Math.sqrt(xOffset ** 2 + yOffset ** 2);
  
            // If the distance is within the radius, add the cell to the result
            if (distance <= radius) {
                cells.push(new Vector(newX, newY));
            }
        }
    }
    return cells;
  }

  private static colorLosCells(losCells: Vector[], cellsInRadius: DrawingOperation[]){
    cellsInRadius.forEach(cell => {
      losCells.forEach(losCell =>{
        if(Vector.equals(cell.pos, losCell)){
          cell.color = new Color(0, 255, 0, 1);
        }
      })
    })
  }

  private static filterCells(background: Array<DrawingOperation>, objects: Array<DrawingOperation>, cellsInRadius: Vector[]):Array<DrawingOperation>{
    let matches = new Array<DrawingOperation>();
    background.forEach(element => {
      cellsInRadius.forEach(cellInRadius => {
        if(element.pos.x === cellInRadius.x && element.pos.y === cellInRadius.y){
          matches.push(element);
        }
      });
    })
    return matches;
  }

  static calculateDistance(point1: Vector, point2: Vector): number {
    const deltaX = point2.x - point1.x;
    const deltaY = point2.y - point1.y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  }

  static lineOfSight(player: Vector, object: Vector): Vector[] {
    const linePoints: Vector[] = [];
    console.log("a")
    const dx = Math.abs(object.x - player.x);
    const dy = Math.abs(object.y - player.y);
    const sx = player.x < object.x ? 1 : -1;
    const sy = player.y < object.y ? 1 : -1;
    let err = dx - dy;
    console.log("b")


    let current = new Vector(player.x, player.y);

    while (!Vector.equals(current, object)) {

        linePoints.push(new Vector(current.x, current.y));

        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            current = current.add(new Vector(sx, 0));
        }
        if (e2 < dx) {
            err += dx;
            current = current.add(new Vector(0, sy));
        }
    }
    console.log("d")


    return linePoints;
  }

  static isInRadiousOfSight(object: Vector, cellsInRadius: DrawingOperation[]): boolean{
    for (const cell of cellsInRadius) {
      if (Vector.equals(cell.pos, object)) {
          return true;
      }
  }
  return false;
  }
}