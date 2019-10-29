import Dexie from "dexie";

export class GameStore {
    private constructor() {

    }

    initialize() {;
        var db = new Dexie("web-rogue");
        db.version(1).stores({ game: "game" });
    }
}