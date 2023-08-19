import * as adb from "adbkit";

type BotParams = {
    adbClient: any;
    device: Device;
    deviceWidth: number;
    deviceHeight: number;
};
type Device = {
    id: string;
    type: string;
};
export class Bot {
    private adbClient;
    private device: Device;
    private deviceWidth = 0;
    private deviceHeight = 0;
    constructor({ adbClient, device, deviceWidth, deviceHeight }: BotParams) {
        this.adbClient = adbClient;
        this.device = device;
        this.deviceWidth = deviceWidth;
        this.deviceHeight = deviceHeight;
    }

    async start() {
        await this.checkDeviceSize();
    }

    private async checkDeviceSize() {
        const output = await this.adbClient
            .shell(this.device.id, "wm size")
            .then(adb.util.readAll);
        const wmSizeStr = output.toString().trim();
        const [, , size] = wmSizeStr.split(" ");
        const [width, height] = size.split("x").map(Number);

        if (width !== this.deviceWidth || height !== this.deviceHeight) {
            console.log(`Бот работает только с расширением ${this.deviceWidth}x${this.deviceHeight}.
Текущее расширение: ${width}x${height}
            `);
        } else {
            console.log("Расширение девайса подходит!");
        }
    }
}
