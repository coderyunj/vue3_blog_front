import { GameManager } from './GameManager';
import { CardInfo } from './CardInfo';
import { _decorator, Component, Node, Label, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Card')
export class Card extends Component {

    /**卡片图表 */
    @property({ type: Sprite })
    iconSprite: Sprite
    /**遮挡 */
    @property({ type: Sprite })
    hoverSprite: Sprite
    /**是否在队列 */
    _inQueue: boolean = false;
    /**编号 */
    public uid: number;

    /**卡片信息 */
    public cardInfo: CardInfo;

    start() {
        this.uid = GameManager.getInstance().createId()
        this.node.on('click', this.clickMe, this);
        // this.hideHover()
    }

    update(deltaTime: number) {

    }

    /**隐藏遮掩 */
    public hideHover() {
        this.hoverSprite.node.active = false;
    }

    /**显示遮掩 */
    public showHover() {
        this.hoverSprite.node.active = true;
    }

    /**是否显示遮掩 */
    isShowHover(): boolean {
        return this.hoverSprite.node.active;
    }

    /**点击卡片事件 */
    clickMe() {
        if (!this.hoverSprite.node.active) {
            GameManager.getInstance().addPreQueue(this)
        }
    }

    public setCardInfo(cardInfo: CardInfo) {
        this.cardInfo = cardInfo;
        this.iconSprite.spriteFrame = cardInfo.iconSF;
    }

    public inQueue() {
        this._inQueue = true;
    }

    public isInQueue(): boolean {
        return this._inQueue
    }

    /**移动动画 */
    public moveTo(x, y) {
        tween(this.node)
            .to(0.3, { position: new Vec3(x, y, this.node.position.z) }, { easing: "sineInOut" })
            .start()
    }

    /**删除动画 */
    removeByAction() {
        tween(this.node)
            .to(0.4, { scale: new Vec3(0, 0, this.node.position.z) }, { easing: "backIn" })
            .call(() => {
                this.node.removeFromParent()
            })
            .start()

    }

}

