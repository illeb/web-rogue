
export class Stats {
    constructor(public maxHP: number, public speed: number, public strenght:number){ }

    public static generate(minHp: number, maxHp: number, minSpeed: number, maxSpeed: number, minStrenght: number, maxStrenght: number) {
        return new Stats(
            Math.floor(Math.random() * maxHp) + minHp,
            Math.floor(Math.random() * maxSpeed) + minSpeed, 
            Math.floor(Math.random() * maxStrenght) + minStrenght
        );
    }
}
