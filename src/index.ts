import { Client } from "adb-ts";
import { AsyncHelper } from "./utils/AsyncHelper";
import { Bot } from "./Bot";
import { ScreenManager } from "./core/ScreenManager";
import { Point } from "./core/Point";
import { AdbClient } from "./core/AdbClient";

async function main() {
    AdbClient.init();
    const devices = await AdbClient.listDevices();
    if (!devices.length) {
        console.log("Девайсы не найдены");
        return;
    }
    const device = devices[0];
    AdbClient.setDevice(device);

    const bot = new Bot({
        device,
        supportedDeviceWidth: 1500,
        supportedDeviceHeight: 986,
    });
    await ScreenManager.init({
        device,
        screenDir: "screenshots",
    });

    await ScreenManager.updatePixels();
    ScreenManager.startUpdatePixels();

    // await ScreenManager.saveScreen();
    /*const y = 800;
    const point1 = new Point(120, y);
    const point2 = new Point(130, y);
    await ScreenManager.drawLineOnScreen(point1, point2);
    const pixels = await ScreenManager.getLineFromScreen(point1, point2);
    console.info(pixels);*/

    await bot.start();
}

main();
