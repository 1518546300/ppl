var global = require("./global");

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

        wordLine: {
            default: null,
            type:cc.Label
        },

        nextBtMask: {
            default: null,
            type:cc.Node
        },
    },

    // onLoad () {},

    promptStatus:function(num){
        if(num === 0){
            this.nextBtMask.active = true;
            this.wordLine.string = "You have lost the game!";
        }else{
            this.nextBtMask.active = false;
            this.wordLine.string = "You are winner!!!";
        }
    },

    buttonClicked:function(event , msg){
        switch (msg) {
            case 'restart':
                global.currentBarrier = global.currentBarrier;
                cc.director.loadScene("gameScene");
                break;
            case 'back':
                cc.director.loadScene("mainScene");
                break;
            case 'next':
                cc.director.loadScene("chapterScene");
                break;
            default:
                break;
        }
    },

    // update (dt) {},
});
