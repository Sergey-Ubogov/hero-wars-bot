import { AsyncHelper } from "../utils/AsyncHelper";
import { Matcher } from "../utils/Matcher";
import { AdbClient } from "./AdbClient";
import { Point } from "./Point";
import { ScreenManager } from "./ScreenManager";

export abstract class BaseElement {
    abstract matcher: Pixel[];
    abstract name: string;
    hardcodedPoint?: Point;

    async click(tryCount = 6) {
        const { name, hardcodedPoint } = this;
        const point = Matcher.matchPixels({
            pixels: ScreenManager.pixels,
            matcher: this.matcher,
            itemName: this.name,
        });
        if (point) {
            console.info(`point: ${point.x}, ${point.y}`);
            await AdbClient.tap(point);
        } else {
            console.info(
                `не нашли ${name}, попытаемся еще раз через ${ScreenManager.updatingInterval}ms`
            );
            await AsyncHelper.delay(ScreenManager.updatingInterval);
            if (tryCount > 0) {
                await this.click(tryCount - 1);
            } else if (hardcodedPoint) {
                console.info(
                    `пробуем кликнуть на захардкоженную точку (${hardcodedPoint.x}, ${hardcodedPoint.y})`
                );
                await AdbClient.tap(hardcodedPoint);
            } else {
                console.info(`не нашли ${this.name}.`);
            }
        }
    }
}
