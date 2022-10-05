import { GameOver } from './GameOver';
import { CardInfo } from './CardInfo';
import { Card } from './Card';
import { _decorator, Component, Node, director, Rect, UITransform, tween, Label, EventTouch, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

/**游戏管理器 */
@ccclass('GameManager')
export class GameManager extends Component {

    static gameManager: GameManager;

    /**编号种子 */
    idSeed: number = 1

    @property([CardInfo])
    icons: CardInfo[]

    @property([Prefab])
    gameLevelPrefab:Prefab[]

    @property(Label)
    markLabel: Label

    @property(Node)
    gameOverPanel: Node

    @property(Node)
    gameIndexPanel: Node

    @property(Node)
    gamePanel: Node

    @property(Node)
    gameNode:Node

    cardQueue: Card[] = []
    cards: Card[]

    mark: number = 0
    gameLevel: number = 0

    start() {
        GameManager.gameManager = this
        // this.initGame()
        this.gameIndexPanel.active = true
    }

    /**开始游戏 */
    public startGame(event: EventTouch, gameLevel) {
        this.gameLevel = parseInt(gameLevel)
        this.gameIndexPanel.active = false;
        this.initGame()
    }

    /**游戏选关界面 */
    public gameIndex(){
        this.gameIndexPanel.active = true 
        this.gameOverPanel.active = false 
        this.gamePanel.active = false ;
    }

    /**初始化游戏 */
    public initGame() {
        this.gameNode.removeAllChildren()
        this.cardQueue = []
        
        let levelPrefab = this.gameLevelPrefab[this.gameLevel-1]
        let gameLevel = instantiate(levelPrefab)
        this.gameNode.addChild(gameLevel)

        this.gamePanel.active = true
        this.cards = this.getComponentsInChildren(Card)
        this.cards.sort((a, b) => a.node.getSiblingIndex() - b.node.getSiblingIndex())
        //检测格子数量
        if (this.cards.length % 3 != 0) {
            console.error("当前格子数为"+this.cards.length+",格子数量不是3的倍数，无法创建游戏")
        }

        let count = Math.floor(this.cards.length / 3)
        let cacheIcons = []
        for (let i = 0; i < count; i++) {
            let rIdx = i % this.icons.length
            let rCard = this.icons[rIdx]
            cacheIcons.push(rCard)
            cacheIcons.push(rCard)
            cacheIcons.push(rCard)
        }

        let cacheCards = []
        let bulk = []
        for (let ci of cacheIcons) {
            let adx = this.randNum(3)
            if (bulk.length >= 7) {
                let outCard = bulk.splice(this.randNum(bulk.length), 1)[0]
                cacheCards.push(outCard)
                bulk.push(ci)
            } else {
                if (adx == 0 && bulk.length > 0) {
                    let outCard = bulk.splice(this.randNum(bulk.length), 1)[0]
                    cacheCards.push(outCard)
                    bulk.push(ci)
                } else {
                    bulk.push(ci)
                }
            }
        }

        let blength = bulk.length
        for (let i = 0; i < blength; i++) {
            let outCard = bulk.splice(this.randNum(bulk.length), 1)[0]
            cacheCards.push(outCard)
        }

        let idx = 0
        for (let card of this.cards) {
            let rCard = cacheCards[idx++]
            card.setCardInfo(rCard)
        }

        this.refreshCardLayer()
    }

    /**随机数 */
    randNum(max) {
        return Math.floor(Math.random() * max);
    }

    /**刷新格子遮掩 */
    refreshCardLayer() {
        for (let c1 of this.cards) {
            c1.hideHover()
        }
        for (let c1 of this.cards) {
            if (c1.isInQueue() || c1.isShowHover()) { continue; }
            for (let c2 of this.cards) {
                if (c2.isInQueue()) { continue; }
                let c1b = c1.getComponent(UITransform).getBoundingBox()
                let c2b = c2.getComponent(UITransform).getBoundingBox()
                if (c1b.intersects(c2b)) {
                    if (c1.node.getSiblingIndex() < c2.node.getSiblingIndex()) {
                        c1.showHover()
                    }
                }
            }
        }
    }

    update(deltaTime: number) {

    }

    public addPreQueue(card: Card) {

        //检测是否已经加入到队列
        if (this.cardQueue.find(item => item.uid == card.uid) || this.cardQueue.length >= 7) {
            return
        }

        card.inQueue()
        this.refreshCardLayer()

        let index = this.cardQueue.findIndex(item => item.cardInfo.id == card.cardInfo.id)
        let num = this.cardQueue.filter((item) => item.cardInfo.id == card.cardInfo.id).length
        if (index != -1) {
            this.cardQueue.splice(index + num, 0, card)
        } else {
            this.cardQueue.push(card)
        }

        this.rerank(0)
        setTimeout(() => {
            this.checkCards(card)
        }, 0.4);

    }

    /**检查是否可消除 */
    checkCards(card: Card) {
        let moveCards = this.cardQueue.filter((item) => item.cardInfo.id == card.cardInfo.id)
        if (moveCards.length >= 3) {
            moveCards.forEach((item) => {
                this.cardQueue.splice(this.cardQueue.indexOf(item), 1)
                item.removeByAction()
                this.mark += this.cardQueue.length + 1
                this.markLabel.string = "得分:" + this.mark
                this.checkGameStatus()
            })
            this.rerank(0.45)
        } else {
            this.checkGameStatus()
        }
    }

    /**检查游戏是否结束 */
    public checkGameStatus() {
        setTimeout(() => {
            if (this.cardQueue.length >= 7) {
                //GameOver - 游戏失败
                let gameOver:GameOver = this.gameOverPanel.getComponent(GameOver)
                gameOver.setText("槽位已满\n游戏失败!!")
                this.gameOverPanel.active = true
            } else {
                let allCards = this.getComponentsInChildren(Card)
                console.log(allCards.length)
                if (allCards.length == 0) {
                    //游戏胜利
                    let gameOver:GameOver = this.gameOverPanel.getComponent(GameOver)
                    gameOver.setText("成功通关!!")
                    this.gameOverPanel.active = true
                }
            }
        }, 1000)
    }

    /**排序队列 */
    rerank(delay) {
        setTimeout(() => {
            for (let i = 0; i < this.cardQueue.length; i++) {
                let curCard = this.cardQueue[i]
                curCard.moveTo(i * 95 - 285, -575)
            }
        }, delay * 1000)
    }

    public static getInstance(): GameManager {
        return GameManager.gameManager
    }

    /**创建编号 */
    createId(): number {
        return this.idSeed++;
    }

}

