import { Utilities } from "../../common/Utilities";

export enum MapType {
  COBBLE,
  SAND,
  SEWERS,
  CAVE
}

export enum TileType {
  Solid,
  Walkable,
  Door,
  Destructible,
  Hidden,
  NextLevel
}

export class Map {

    private _level: number;
    get level(): number {
        return this._level;
    }
    items = [];

    // private MapContainer mapcontainer;
    // private MapType type;
    // private List<Item> itemsInMap;

    // private GridCell[][] pathGrid;

    private _type: MapType;
    get type(): number {
        return this._type;
    }

    
    constructor(level: number, type: MapType){
        this._level=level;
        // this.mapcontainer=mapcontainer;
        this._type=type;
    }

    public getRandomPosition(tileType: TileType) {
      const tiles = this.getTilesByType(tileType);

      if(tiles.length == 0)
        return null;

      let randomTile: Phaser.Tilemaps.Tile;
      const randx = Utilities.randInt(0, tiles.length-1);
      const randy = Utilities.randInt(0, tiles.length);
        /*if(getTile(randy,randx).getType() == type)
            randomTile=getTile(randy,randx);*/
      return randomTile;
    }

    private getTilesByType(tileType: TileType) {
        //TODO
      return [];
		}

		isPositionFree(x: number, y: number): boolean {
			// TODO
			return true;
		}
}
