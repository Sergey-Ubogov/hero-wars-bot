import { BaseElement } from "../core/BaseElement";
import { Point } from "../core/Point";

export class GirlWithAdsIcon extends BaseElement {
    name = "иконку девочки с рекламой";
    hardcodedPoint = new Point(120, 800);
    matcher = [
        [73, 40, 36],
        [73, 40, 36],
        [73, 40, 36],
        [73, 39, 36],
        [73, 39, 35],
        [38, 32, 39],
        [29, 70, 116],
        [24, 98, 170],
        [24, 98, 170],
        [16, 91, 163],
    ] as Pixel[];
}
