import { Map } from './Map';

/**
 * A* pathfinder algorithm
 * Source: https://github.com/zushenyan/a-star/blob/master/PathFinder.java
 */
export class PathFinder {
	private readonly openList: Array<PathNode>;
	private readonly closedList: Array<PathNode>;

	public constructor() {
		this.openList = [];
		this.closedList = [];
	}

	public findPath(map: Map, start: Phaser.Tilemaps.Tile, goal: Phaser.Tilemaps.Tile): Array<PathNode> /* throws NullPointerException */ {
		this.openList.length = 0;
		this.closedList.length = 0;

		const goalPathNode = new PathNode(goal, null, null);
		const startPathNode = new PathNode(start, null, null);
		let temp = new PathNode(start, null, goalPathNode);

		this.openList.push(temp);
		while (this.openList.length > 0) {
			if (temp.location === goal) {
				return this.constructPath(startPathNode, temp, true);
			}

			temp = this.lookingForBestPathNode();
			if (temp == null) break;

			this.closedList.push(temp);
			this.addNeighbor(temp, startPathNode, goalPathNode, map);
		}

		return this.constructPath(startPathNode, goalPathNode, false);
	}

	/**
	 * Aggiorna la coda per la valutazione (openList) valutando tutti i nodi adiacenti a parent.
	 * Inserisce i nodi incontrati per la prima volta e aggiorna quelli già presenti se accessibili
	 * a minor costo.
	 * @param parent
	 * @param start
	 * @param goal
	 * @param map
	 */
	private addNeighbor(parent: PathNode, start: PathNode, goal: PathNode, map: Map): void {
		const x = parent.location.x;
		const y = parent.location.y;

		for (let leftTopY = y - 1; leftTopY < y + 2; leftTopY++) {
			for (let leftTopX = x - 1; leftTopX < x + 2; leftTopX++) {

				const isGoal = goal.location.x === leftTopX && goal.location.y === leftTopY;
				if (leftTopY === y && leftTopX === x) {
					//pass itself
				}
				else if (isGoal || map.isPositionFree(leftTopX, leftTopY)) {
					const node: PathNode = new PathNode({ x: leftTopX, y: leftTopY } as Phaser.Tilemaps.Tile, parent, goal);
					const index = this.openListIndexOf(node);
					if (this.closedListContains(node)) {
						// Se il nodo è già stato valutato non lo considero
					}
					else if (index != -1) {
						// Se il nodo è già in coda per la valutazione lo aggiorno se ho trovato un percorso meno costoso
						const old: PathNode = this.openList[index];
						if (old.parent.costFromStart > node.parent.costFromStart) {
							this.openList[index] = node;
						}
					}
					else {
						// Aggiungo il nodo in coda per la valutazione
						this.openList.push(node);
					}
				}
			}
		}
	}

	private openListIndexOf(node: PathNode): number {
		for (let index = 0; index < this.openList.length; index++) {
			const anotherPathNode: PathNode = this.openList[index];
			if (anotherPathNode === node) {
				return index;
			}
		}
		return -1;
	}

	private openListContains(node: PathNode): boolean {
		for (let index = 0; index < this.openList.length; index++) {
			const anotherPathNode: PathNode = this.openList[index];
			if (anotherPathNode === node) {
				return true;
			}
		}
		return false;
	}

	private closedListContains(node: PathNode): boolean {
		for (let index = 0; index < this.closedList.length; index++) {
			const anotherPathNode: PathNode = this.closedList[index];
			if (anotherPathNode === node) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Recupera il nodo in coda per la valutazione (openList) con il minor costo.
	 * @return
	 */
	private lookingForBestPathNode(): PathNode {
		if (this.openList.length === 0) {
			return null;
		}

		let lowestCostIndex = 0;
		let cost = this.openList[0].getTotalCost();
		for (let index = 1; index < this.openList.length; index++) {
			const node: PathNode = this.openList[index];
			if (node.getTotalCost() < cost) {
				cost = node.getTotalCost();
				lowestCostIndex = index;
			}
		}
		const node: PathNode = this.openList.splice(lowestCostIndex, 1)[0];
		return node;
	}

	private constructPath(start: PathNode, goal: PathNode, practicable: boolean): Path {
		const path: Path = new Path(start, goal, practicable);
		while (practicable && goal != null) {
			path.unshift(goal);
			goal = goal.parent;
		}
		return path;
	}
}

export class Path extends Array<PathNode> {

	constructor(
		public readonly start: PathNode,
		public readonly goal: PathNode,
		public readonly practicable: boolean
	) {
		super();
	}

}

export class PathNode {
	public readonly costFromStart: number;
	public readonly costToGoal: number;

	public constructor(
		public readonly location: Phaser.Tilemaps.Tile,
		public readonly parent: PathNode,
		goal: PathNode
	) {
		if (parent != null) {
			this.costFromStart = this.calculateCostFromStart(parent);
		}
		if (goal != null) {
			let x = location.x - goal.location.x;
			let y = location.y - goal.location.y;
			this.costToGoal = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		}
	}

	private calculateCostFromStart(parent: PathNode): number {
		const x = this.location.x - parent.location.x;
		const y = this.location.y - parent.location.y;
		let sum = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		sum += this.parent.costFromStart;
		return sum;
	}

	public equals(node: PathNode): boolean {
		return this.location === node.location;
	}

	public getTotalCost(): number {
		return this.costFromStart + this.costToGoal;
	}

	public getParentMessage(): string {
		if (this.parent == null) {
			return null;
		}
		return this.parent.getLocationMessage();
	}

	public getLocationMessage(): string {
		return "[" + this.location.x + "," + this.location.y + "]";
	}

	public toString(): string {
		return "[" + this.location.x + "," + this.location.y + "]" + "\tparent: " + this.parent;
	}
}
