import { BaseElement } from "../core/BaseElement";
import { Point } from "../core/Point";

export class GameSettingsIcon extends BaseElement {
    name = "иконку настроек игры";
    hardcodedPoint = new Point(1430, 50);
    matcher = [
        [254, 209, 107],
        [254, 205, 103],
        [252, 201, 99],
        [252, 201, 99],
        [254, 205, 103],
        [248, 205, 103],
        [190, 153, 74],
        [158, 124, 56],
        [153, 119, 51],
        [153, 119, 51],
    ] as Pixel[];
}
