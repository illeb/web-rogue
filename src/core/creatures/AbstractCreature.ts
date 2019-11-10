import { Observable, Subject } from "rxjs";
import { Inventory } from '../items/inventory';

export abstract class Creature {
		// Proprietà grafiche da gestire fuori dal model
    // public static HEALTHBAR_HEIGHT = 7;
    // public static HEALTHBAR_WIDTH = 20;

    private _HP: number;
    get HP(): number {
        return this.HP;
    }

		protected deadSubject: Subject<void>;
		readonly dead$: Observable<void>;

    // private position: Tile;
    public inventory: Inventory;

		constructor(readonly id: number) {
				this.deadSubject = new Subject();
				this.dead$ = this.deadSubject.asObservable();
		}

    addHP(value: number) {
        this._HP = this._HP + value >= 0 ? 0 :  this._HP + value;

        if (this._HP <= 0)
            this.deadSubject.next();
    }

}
