import { Map } from "./Map";
import * as Dungeon from '@mikewesthad/dungeon';

export class MapFactory { /*http://www.roguebasin.com/index.php?title=Dungeon-Building_Algorithm#The_algorithm*/

	/*    Texture texture;
			int seed;
			Random random;*/
	private readonly MAX_AMISSIBLE_ROOMS = 15;
	private readonly MIN_ROOM_WIDTH = 5;
	private readonly MIN_ROOM_HEIGHT = 5;
	private readonly MAX_ROOM_WIDTH = 10;
	private readonly MAX_ROOM_HEIGHT = 10;
	private readonly MAX_MAP_WIDTH = 40;
	private readonly MAX_MAP_HEIGHT = 40;

	private rooms: Phaser.GameObjects.Rectangle[];

	constructor() {}

	public generate(): Map {
		const dungeon = new Dungeon({
			width: this.MAX_MAP_WIDTH,
			height: this.MAX_MAP_HEIGHT,
			doorPadding: 1,
			rooms: {
				width: { min: this.MIN_ROOM_WIDTH, max: this.MAX_ROOM_WIDTH, onlyOdd: false },
				height: { min: this.MIN_ROOM_HEIGHT, max: this.MAX_ROOM_HEIGHT, onlyOdd: false },
				maxRooms: this.MAX_AMISSIBLE_ROOMS
			},
		});

		dungeon.drawToConsole();
		
		return null;
	}
}
