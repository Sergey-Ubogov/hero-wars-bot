import { Client } from "adb-ts";
import { AdbClientOptions, IDevice } from "adb-ts/lib/util/types";
import { Point } from "./Point";
import { ScreenManager } from "./ScreenManager";
import { AsyncHelper } from "../utils/AsyncHelper";

class AdbClientClass {
    private adbClient: Client;
    private device: IDevice;
    listDevices: InstanceType<typeof Client>["listDevices"];
    deviceWidth?: number;
    deviceHeight?: number;
    screenshot: InstanceType<typeof Client>["screenshot"];

    get deviceId() {
        return this.device.id;
    }

    async getDeviceResolution() {
        const output = await AdbClient.shell("wm size");
        const wmSizeStr = output.trim();
        const [, , size] = wmSizeStr.split(" ");
        const [width, height] = size.split("x").map(Number);
        this.deviceWidth = width;
        this.deviceHeight = height;

        return { width, height };
    }

    init({ host = "127.0.0.1", ...options }: AdbClientOptions = {}) {
        const adbClient = new Client({
            host,
            ...options,
        });
        this.adbClient = adbClient;
        this.listDevices = this.adbClient.listDevices.bind(this.adbClient);
        this.screenshot = this.adbClient.screenshot.bind(this.adbClient);
    }

    setDevice(device: IDevice) {
        this.device = device;
    }

    async tap(point: Point) {
        await this.adbClient.execDeviceShell(
            this.deviceId,
            `input tap ${point.x} ${point.y}`
        );
    }

    async swipe(pointFrom: Point, pointTo: Point, duration = 500) {
        console.log(pointFrom, pointTo);
        await this.adbClient.execDeviceShell(
            this.deviceId,
            `input touchscreen swipe ${pointFrom.x} ${pointFrom.y} ${pointTo.x} ${pointTo.y} ${duration}`
        );
        await AsyncHelper.delay(ScreenManager.updatingInterval); // wait animations
    }

    async swipeToLeft() {
        const { pixelsWidth, pixelsHeight } = ScreenManager;
        const pointFrom = new Point(pixelsWidth / 2 - 300, pixelsHeight / 2);
        const pointTo = new Point(pixelsWidth / 2, pixelsHeight / 2);
        return this.swipe(pointFrom, pointTo);
    }

    async swipeToRight() {
        const { pixelsWidth, pixelsHeight } = ScreenManager;
        const pointFrom = new Point(pixelsWidth / 2 + 300, pixelsHeight / 2);
        const pointTo = new Point(pixelsWidth / 2, pixelsHeight / 2);
        return this.swipe(pointFrom, pointTo);
    }

    shell(command: string) {
        return this.adbClient.shell(this.deviceId, command);
    }
}
export const AdbClient = new AdbClientClass();
