import constValue from "./bossBarrierCvalue";

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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init(gameCtl) {
        this.gameCtl = gameCtl;
        this.node.position = cc.v2(0,-300);//初始化位置
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(constValue.ballSpeed , constValue.ballSpeed);//初始化速度
        this.touchPertect = 0;
    },

    onBallContactLRWall:function(){
        let xSpeed = null;
        let speed = this.getComponent(cc.RigidBody).linearVelocity;
        if(speed.x < 0){
            xSpeed = Math.abs(speed.x);
        }else{
            xSpeed = -constValue.ballSpeed;
        }

        let ySpeed = speed.y;
        this.changeBallSpeed(xSpeed , ySpeed);
    },

    onBallContactPandT:function(){
        let ySpeed = null;
        let speed = this.getComponent(cc.RigidBody).linearVelocity;
        if(speed.y < 0){
            ySpeed = Math.abs(speed.y);
        }else{
            ySpeed = -constValue.ballSpeed;
        }

        let xSpeed = speed.x;

        this.changeBallSpeed(xSpeed , ySpeed);
    },

    onBallContactBottom:function(){
        this.changeBallSpeed(0 , 0);
    },

    changeBallSpeed:function(xSpeed , ySpeed){
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(xSpeed,ySpeed);
    },

    onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 0://

                break;
            case 1://球碰到左右墙
                if(this.touchPertect === 0){
                    this.touchPertect = 1;
                    this.onBallContactLRWall();
                    this.touchPertect = 0;
                }
                break;
            case 2://球碰到上墙和托盘
                if(this.touchPertect === 0){
                    this.touchPertect = 1;
                    this.onBallContactPandT();
                    this.touchPertect = 0;
                }
                break;
            case 3://球碰到底部
                if(this.touchPertect === 0){
                    this.touchPertect = 1;
                    this.onBallContactBottom();
                    this.touchPertect = 0;
                }
                break;
            default:
                break;
        }
    },

});
