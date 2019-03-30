var constValue = require('constValue');

cc.Class({
    extends: cc.Component,

    properties: {
        particle:{
            default:[],
            type: cc.ParticleSystem
        },

        spine: {
            default:null,
            type: sp.Skeleton
        },

        audioBallBreak: {
            default: null,
            type: cc.AudioClip
        },
    },

    // onLoad () {},

    doAction:function (pos , type) {
        this.node.position = pos;

        this.node.runAction(cc.sequence(
            cc.callFunc(function(){
                this.spine.setAnimation(0, constValue.sgeName[type], false);
                this.particle[type].resetSystem();
                cc.audioEngine.play(this.audioBallBreak, false, 1);
            },this),
            cc.delayTime(0.3),
            cc.callFunc(function(){
                this.node.destroy();
            },this),
        ));
    },
});
