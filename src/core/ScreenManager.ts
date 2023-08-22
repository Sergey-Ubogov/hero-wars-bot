import { Client } from "adb-ts";
import { IDevice } from "adb-ts/lib/util";
import { createWriteStream } from "fs";
import * as sharp from "sharp";
import { Point } from "./Point";
import { AdbClient } from "./AdbClient";
import { AsyncHelper } from "../utils/AsyncHelper";

type ScreenManagerParams = {
    device: IDevice;
    screenDir: string;
};
class ScreenManagerClass {
    updatingInterval = 3000;
    pixels: Pixel[][];
    params: ScreenManagerParams;
    private timeoutId: NodeJS.Timeout;
    updatingPixels = false;

    async init(params: ScreenManagerParams) {
        this.params = params;
    }

    async startUpdatePixels() {
        this.updatingPixels = true;
        while (this.updatingPixels) {
            await this.updatePixels();
            await AsyncHelper.delay(this.updatingInterval);
        }
    }

    stopUpdatePixels() {
        this.updatingPixels = false;
    }

    get pixelsWidth() {
        return this.pixels[0]?.length;
    }

    get pixelsHeight() {
        return this.pixels?.length;
    }

    get screenPath() {
        return `${this.params.screenDir}/screen.png`;
    }

    get processedScreenPath() {
        return `${this.params.screenDir}/processed_screen.png`;
    }

    async updatePixels() {
        console.info("обновляем массив пикселей");
        const { device } = this.params;

        const buffer = await AdbClient.screenshot(device.id);
        const out = createWriteStream(this.screenPath);
        out.write(buffer);
        await out.end();
        const sharpImage = sharp(buffer);
        this.pixels = await this.getPixels(sharpImage);
    }

    async saveScreen() {
        const { device } = this.params;

        const buffer = await AdbClient.screenshot(device.id);
        const out = createWriteStream(this.screenPath);
        out.write(buffer);
        await out.end();
    }

    async drawLineOnScreen(point1: Point, point2: Point) {
        const screen = sharp(this.screenPath);
        const { width, height } = await screen.metadata();
        const svgLine = `
        <svg width="${width}" height="${height}">
            <line x1="${point1.x}" y1="${point1.y}" x2="${point2.x}" y2="${point2.y}" stroke="red" />
        </svg>`;
        const svgBuffer = Buffer.from(svgLine);

        await screen
            .composite([{ input: svgBuffer }])
            .toFile(this.processedScreenPath);
    }

    async getLineFromScreen(point1: Point, point2: Point) {
        const sharpImage = sharp(this.screenPath);
        const pixels = await this.getPixels(sharpImage);
        const line = pixels.slice(point1.y, point2.y + 1)[0];
        return line.slice(point1.x, point2.x);
    }

    async getPixels(sharpImage: sharp.Sharp) {
        const { width, height } = await sharpImage.metadata();
        const { data } = await sharpImage.raw().toBuffer({
            resolveWithObject: true,
        });
        const pixels = [];
        for (let y = 0; y < height; y++) {
            const line = [];
            for (let x = 0; x < width; x++) {
                const offset = 4 * (width * y + x);
                const red = data[offset];
                const green = data[offset + 1];
                const blue = data[offset + 2];
                const alpha = data[offset + 3];
                const pixel = [red, green, blue];
                line.push(pixel);
            }
            pixels.push(line);
        }
        return pixels;
    }
}
export const ScreenManager = new ScreenManagerClass();
