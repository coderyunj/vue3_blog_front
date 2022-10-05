import { _decorator, Component, Node, Label, Sprite, SpriteFrame} from 'cc';
const { ccclass, property } = _decorator;


@ccclass('CardInfo')
export class CardInfo{

    /**编号 */
    @property
    public id = 0;
    /**名称 */
    @property
    public itemName = '';
    /**卡片图表 */
    @property(SpriteFrame)
    public iconSF: SpriteFrame ;

}