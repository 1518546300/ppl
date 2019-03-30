var global = require("global");

cc.Class({
    extends: cc.Component,

    properties: {
        frame:{
            default: null,
            type: cc.Node
        },

        btNode:{
            default: [],
            type: cc.Node
        },

    },

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    buttonClicked:function(event , msg){
        switch (msg) {
            case '0':
                global.currentBt = 0;
                break;
            case '1':
                global.currentBt = 1;
                break;
            case '2':
                global.currentBt = 2;
                break;
            case '3':
                global.currentBt = 3;
                break;
            case '4':
                global.currentBt = 4;
                break;
            case '5':
                global.currentBt = 5;
                break;
            case '6':
                global.currentBt = 6;
                break;
            case '7':
                global.currentBt = 8;
                break;
            case '8':
                global.currentBt = 10;
                break;
            case '9':
                global.currentBt = 9;
                break;
            default:
                break;
        }
        this.frame.position = this.btNode[msg].position;
        this.changeGridBall();
    },

    changeGridBall:function(){
        global.choiceGrid.getComponent("gridJs").changeBallSp(global.currentBt);
    },

    onKeyDown (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.q:
                global.currentBt = 0;
                this.keyFunc(0);
                break;
            case cc.macro.KEY.w:
                global.currentBt = 1;
                this.keyFunc(1);
                break;
            case cc.macro.KEY.e:
                global.currentBt = 2;
                this.keyFunc(2);
                break;
            case cc.macro.KEY.r:
                global.currentBt = 3;
                this.keyFunc(3);
                break;
            case cc.macro.KEY.t:
                global.currentBt = 4;
                this.keyFunc(4);
                break;
            case cc.macro.KEY.y:
                global.currentBt = 5;
                this.keyFunc(5);
                break;
            case cc.macro.KEY.u:
                global.currentBt = 6;
                this.keyFunc(6);
                break;
            case cc.macro.KEY.i:
                global.currentBt = 8;
                this.keyFunc(7);
                break;
            case cc.macro.KEY.o:
                global.currentBt = 10;
                this.keyFunc(8);
                break;
            case cc.macro.KEY.p:
                global.currentBt = 9;
                this.keyFunc(9);
                break;
            case cc.macro.KEY.backspace:
                global.choiceGrid.getComponent("gridJs").changeBallSp(-1);
                break;
            default:
                break;
        }

    },

    keyFunc:function(num){
        this.frame.position = this.btNode[num].position;
        this.changeGridBall();
    },

    /*onKeyUp (event) {
        switch(event.keyCode) {
            case cc.macro.KEY.ctrl:
                cc.log('turn up ctrl');
                break;
            case cc.macro.KEY.z:
                cc.log('turn up z');
                break;
        }
    },*/
});
