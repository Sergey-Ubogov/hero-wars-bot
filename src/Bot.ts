import { Client } from "adb-ts";
import { IDevice } from "adb-ts/lib/util";
import { AndroidMainPage } from "./pages/AndroidMainPage";
import { ScreenManager } from "./core/ScreenManager";
import { AsyncHelper } from "./utils/AsyncHelper";
import { AdbClient } from "./core/AdbClient";
import { AdsWatcher } from "./features/AdsWatcher";

type BotParams = {
    device: IDevice;
    supportedDeviceWidth: number;
    supportedDeviceHeight: number;
};
export class Bot {
    constructor(private params: BotParams) {}

    async start() {
        const { device } = this.params;
        console.info(`Найдено устройство: ${device.id} (${device.state})`);
        await this.checkDeviceResolution();
        await this.openGameIfNotOpened();
        await this.loop();
    }

    private async checkDeviceResolution() {
        const { supportedDeviceWidth, supportedDeviceHeight } = this.params;

        const { width, height } = await AdbClient.getDeviceResolution();

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

    async checkGameIsActive() {
        const processPrefix = "com.nexters.herowars";
        const output = await AdbClient.shell(
            `dumpsys activity activities | grep mResumedActivity | cut -d "{" -f2 | cut -d ' ' -f3 | cut -d "/" -f1`
        );
        return output.includes(processPrefix);
    }

    async openGameIfNotOpened() {
        const gameIsActive = await this.checkGameIsActive();
        if (gameIsActive) {
            return;
        }

        console.log("Пытаемся открыть игру");

        await ScreenManager.updatePixels();
        const andoidMainPage = new AndroidMainPage();
        await andoidMainPage.gameIcon.click();
    }

    async loop() {
        const features = [AdsWatcher];
        while (features.length) {
            const feature = features.shift();
            await feature.do();
        }
    }
}
