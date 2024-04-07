import Vector from "../Vector";
import Layer, { DrawingOperation } from "../Layer"
import Player from "../../objects/actors/player/Player"
import Color from "../../view/colors/Color";

export default class Sight {

  static renderFieldOfView(player: Player, drawingOperations: DrawingOperation[]){
    let coordinatesOfCellsInRadiusOfSight = Sight.findCellsInSightRadius(player);
    let cellsInRadiusOfSight = Sight.filterCells(drawingOperations, coordinatesOfCellsInRadiusOfSight)
    cellsInRadiusOfSight.forEach(op => {
      let brightness = (1 - Sight.calculateDistance(op.pos, player.pos)*0.05);
      op.color = new Color(255, 255, 255, brightness);
    })
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

  private static filterCells(op: Array<DrawingOperation>, cellsInRadius: Vector[]):Array<DrawingOperation>{
    let matches = new Array<DrawingOperation>();
    op.forEach(element => {
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
}