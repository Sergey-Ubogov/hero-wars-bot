import * as adb from "adbkit";

type BotParams = {
    adbClient: any;
    device: Device;
    supportedDeviceWidth: number;
    supportedDeviceHeight: number;
};
type Device = {
    id: string;
    type: string;
};
export class Bot {
    constructor(private params: BotParams) {}

    async start() {
        await this.checkDeviceResolution();
    }

    private async checkDeviceResolution() {
        const {
            adbClient,
            device,
            supportedDeviceWidth,
            supportedDeviceHeight,
        } = this.params;

        const output = await adbClient
            .shell(device.id, "wm size")
            .then(adb.util.readAll);
        const wmSizeStr = output.toString().trim();
        const [, , size] = wmSizeStr.split(" ");
        const [width, height] = size.split("x").map(Number);

        if (
            width !== supportedDeviceWidth ||
            height !== supportedDeviceHeight
        ) {
            console.log(`Бот работает только с разрешением ${supportedDeviceWidth}x${supportedDeviceHeight}.
Текущее разрешение: ${width}x${height}
            `);
        } else {
            console.log("Разрешение экрана подходит!");
        }
    }
}
