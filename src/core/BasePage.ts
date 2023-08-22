import { Matcher } from "../utils/Matcher";
import { BaseElement } from "./BaseElement";
import { ScreenManager } from "./ScreenManager";

export abstract class BasePage {
    abstract elementForDetecting: BaseElement;

    get active() {
        const { elementForDetecting } = this;
        return Boolean(
            Matcher.matchPixels({
                pixels: ScreenManager.pixels,
                matcher: elementForDetecting.matcher,
                itemName: elementForDetecting.name,
            })
        );
    }
}
