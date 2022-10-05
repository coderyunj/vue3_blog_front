import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOver')
export class GameOver extends Component {

    @property(Label)
    contentLabel:Label

    start() {

    }

    update(deltaTime: number) {
        
    }

    public setText(text:string){
        this.contentLabel.string = text
    }

}

