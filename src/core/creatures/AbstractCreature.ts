import { Observable, Observer, Subject } from "rxjs";

export abstract class Creature {
    public static HEALTHBAR_HEIGHT = 7;
    public static HEALTHBAR_WIDTH = 20;
    private _id: number;
    get id(): number {
        return this._id;
    }

    private _HP: number;
    get HP(): number {
        return this.HP;
    }

    _dead$: Subject<void>;
    get dead$(): Observable<void> {
        return this._dead$.asObservable();
    }
    addHP(value: number) {
        this._HP = this._HP + value >= 0 ? 0 :  this._HP + value;

        if (this._HP <= 0)
            this._dead$.next();
    }

    // private Tile position;
    // private Backpack backpack; Cambiare in inventory

    public Creature(id: number) {
        this._id = id;
        this._dead$ = new Subject();
    }
}
