import { AdbClient } from "../core/AdbClient";
import { GameMainPage } from "../pages/GameMainPage";
import { AsyncHelper } from "../utils/AsyncHelper";

class AdsWatcherClass {
    gameMainPage = new GameMainPage();

    async do() {
        while (!this.gameMainPage.active) {
            console.log(
                "Для просмотра рекламы перейдите на главный экран игры"
            );
            await AsyncHelper.delay(5000);
        }
        await AdbClient.swipeToLeft();
        this.gameMainPage.girlWithAdsIcon.click();
    }
}

export const AdsWatcher = new AdsWatcherClass();
