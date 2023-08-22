import { Point } from "../core/Point";

type MatchPixelsParams = {
    pixels: Pixel[][];
    matcher: Pixel[];
    itemName?: string;
    lineStart?: number;
    lineEnd?: number;
};
export const Matcher = {
    matchPixels({
        pixels,
        matcher,
        itemName,
        lineStart = 0,
        lineEnd = pixels.length,
    }: MatchPixelsParams) {
        //console.info(`ищем ${itemName}`);
        const maxY = lineEnd;
        const matcherLength = matcher.length;
        const matcherStr = matcher.toString();
        const maxX = pixels[0].length - matcherLength;
        for (let y = lineStart; y < maxY; y++) {
            for (let x = 0; x < maxX; x++) {
                const lineForMatch = pixels[y].slice(x, x + matcherLength);
                if (lineForMatch.toString() === matcherStr) {
                    //console.info(`нашли ${itemName}`);
                    return new Point(
                        Math.round((x + x + matcherLength) / 2),
                        y
                    );
                }
            }
        }
        //console.info(`не нашли ${itemName}`);
        return null;
    },
};
