import * as adb from "adbkit";
import { AsyncHelper } from "./utils/AsyncHelper";
import { Bot } from "./Bot";

async function main() {
    const adbClient = adb.createClient({
        host: "127.0.0.1",
    });
    const devices = await adbClient.listDevices();
    if (!devices.length) {
        console.log("Девайсы не найдены");
        return;
    }
    const device = devices[0];
    const bot = new Bot({
        adbClient,
        device,
        deviceWidth: 1500,
        deviceHeight: 986,
    });
    await bot.start();
}

main();
