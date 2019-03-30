import barrierInfo from "./barrierInfoJs";

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

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        /*let draw = cc.PhysicsManager.DrawBits;
        cc.director.getPhysicsManager().debugDrawFlags = draw.e_shapeBit|draw.e_jointBit;*/

        cc.loader.loadRes('setting/barrierSetting' , function (err, asset) {
            if (err) {
                console.log(err);
                return;
            }
            let json = asset.json;
            barrierInfo.ballInfoArr = json.barrierBallLineInfo;
            barrierInfo.instructionBarrier = json.instructionBarrier;
        });
    },

    buttonClicked:function(event , msg){
        switch (msg) {
            case 'start':
                cc.director.loadScene("chapterScene");
                break;
            case 'create':
                cc.director.loadScene("createScene");
                break;
            default:
                break;
        }
    },
});
