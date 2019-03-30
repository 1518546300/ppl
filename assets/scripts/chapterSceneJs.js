var global = require("./global");
import playerInfo from "./playerInfo";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        barrierBt:{
            default:[],
            type: cc.Node
        },
    },

    onLoad () {
        let userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        let coins = JSON.parse(cc.sys.localStorage.getItem('coinNum'));
        console.log(userData);
        if(!userData || !coins){
            playerInfo.writeBarrier(1);
            playerInfo.writeCoinNum(30);
            playerInfo.playerBarrier = 1;
        }else{
            playerInfo.playerBarrier = userData.barrier;
            playerInfo.playerCoins = coins.gold;
        }

        /*for(let i = 0;i < this.barrierBt.length;i++){
            this.barrierBt[i].active = false;
        }

        for(let i = 0;i < playerInfo.playerBarrier;i++){
            this.barrierBt[i].active = true;
        }*/
    },

    buttonClicked:function(event , msg){
        switch (msg) {
            case '1':
                global.currentBarrier = 1;
                cc.director.loadScene("gameScene");
                break;
            case '2':
                global.currentBarrier = 2;
                cc.director.loadScene("gameScene");
                break;
            case '3':
                global.currentBarrier = 3;
                cc.director.loadScene("gameScene");
                break;
            case '4':
                global.currentBarrier = 4;
                cc.director.loadScene("gameScene");
                break;
            case '5':
                global.currentBarrier = 5;
                cc.director.loadScene("gameScene");
                break;
            case '6':
                global.currentBarrier = 6;
                cc.director.loadScene("gameScene");
                break;
            case '7':
                global.currentBarrier = 7;
                cc.director.loadScene("gameScene");
                break;
            case '8':
                global.currentBarrier = 8;
                cc.director.loadScene("gameScene");
                break;
            case '9':
                global.currentBarrier = 9;
                cc.director.loadScene("gameScene");
                break;
            case '10':
                global.currentBarrier = 10;
                cc.director.loadScene("bossScene3");
                break;
            default:
                break;
        }
    },
});
