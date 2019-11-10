import { Item } from './item';

export const VOID_SLOT = undefined;

export class Inventory {
	readonly items: Array<Item>;

	constructor(size: integer) {
		this.items = new Array(size).fill(VOID_SLOT);
	}

	add(item: Item) {
		const index = this.items.indexOf(VOID_SLOT);
		if (index < 0) return false;

		this.items[index] = item;
		return true;
	}

	remove(item: Item) {
		const index = this.items.indexOf(item);
		if (index < 0) return false;

		this.items[index] = VOID_SLOT;
		return true;
	}
}
