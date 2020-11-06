import { Injectable } from '@nestjs/common';
import { EnvironmentDTO } from './dto/dto';
import { CoordinatesDTO } from './dto/dto'

@Injectable()
export class AppService {

  private strategyProtocols = {
    "closest-enemies": (list) => list,
    "furthest-enemies": (list) => list.reverse(),
    "assist-allies": (list) => list.sort(a => {
      if (a.allies) { return -1 }
      return 1
    }),
    "avoid-crossfire": (list) => list.filter(scan => !scan.allies),
    "prioritize-mech": (list) => {
      const order = { mech: 1, soldier: 2 };
      return list.sort((a, b) => (order[a.enemies.type] - order[b.enemies.type]))
    },
    "avoid-mech": (list) => list.filter(scan => scan.enemies.type != 'mech'),
  }


  radar(environment: EnvironmentDTO): CoordinatesDTO {
    const enemiesDistance = this.distanceOrder(environment);
    return this.chooseEnemy(environment.protocols, enemiesDistance);
  }

  private chooseEnemy(protocols: string[], enemiesDistance) {

    let list = enemiesDistance;
    protocols.map(condition => {
      list = this.strategyProtocols[condition](list);
    })
    return {
      x: list[0].coordinates.x,
      y: list[0].coordinates.y
    }
  }

  private distanceOrder(environment) {
    return environment.scan.map((enemy, i) => {
      const distance = this.distance(enemy);
      if (!(distance >= 100)) {
        return {
          ...enemy,
          distance: this.distance(enemy)
        }
      }
    }).sort((a, b) => a.distance - b.distance)
      .filter(Boolean)
  }

  private distance(enemy) {
    return Math.sqrt(
      Math.pow(enemy.coordinates.x, 2) +
      Math.pow(enemy.coordinates.y, 2)
    )
  }
}
