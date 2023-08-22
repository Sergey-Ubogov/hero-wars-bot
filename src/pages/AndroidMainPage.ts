import { BasePage } from "../core/BasePage";
import { GameIcon } from "../elements/GameIcon";

export class AndroidMainPage extends BasePage {
    elementForDetecting = new GameIcon();
    gameIcon = new GameIcon();
    
}
