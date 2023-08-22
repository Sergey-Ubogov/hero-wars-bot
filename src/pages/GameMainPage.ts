import { BasePage } from "../core/BasePage";
import { GameSettingsIcon } from "../elements/GameSettingsIcon";
import { GirlWithAdsIcon } from "../elements/GirlWithAdsIcon";

export class GameMainPage extends BasePage {
    elementForDetecting = new GameSettingsIcon();
    girlWithAdsIcon = new GirlWithAdsIcon();
}
