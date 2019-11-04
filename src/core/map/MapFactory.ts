import { Map, MapType } from "./Map";
import { Utilities } from "../../common/Utilities";

export class MapFactory { /*http://www.roguebasin.com/index.php?title=Dungeon-Building_Algorithm#The_algorithm*/

/*    Texture texture;
    int seed;
    Random random;*/
    private readonly MAX_AMISSIBLE_ROOMS = 15;
    private readonly MIN_ROOM_WIDTH=5;
    private readonly MIN_ROOM_HEIGHT=5;
    private readonly MAX_ROOM_WIDTH = 10;
    private readonly MAX_ROOM_HEIGHT= 10;
    private readonly MAX_MAP_WIDTH = 40;
    private readonly MAX_MAP_HEIGHT = 40;

    private rooms: Phaser.GameObjects.Rectangle[];
    public generate(seed: integer): Map{
        this.rooms = [];
        const mapType = Utilities.randInt(0, Object.keys(MapType).length - 1) as MapType;
        let map = new Map(1, MapType.COBBLE);

        return null;
    }
}
