import { BaseElement } from "../core/BaseElement";

export class GameIcon extends BaseElement {
    name = "иконку игры";
    matcher = [
        [39, 182, 219],
        [39, 182, 219],
        [39, 182, 219],
        [128, 154, 162],
        [239, 100, 80],
        [247, 140, 102],
        [238, 109, 81],
        [250, 210, 144],
        [245, 161, 113],
        [249, 113, 85],
    ] as Pixel[];
}
