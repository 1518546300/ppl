

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

    buttonClicked:function(event , msg){
        switch (msg) {
            case 'Yes':
                cc.game.end();
                break;
            case 'No':
                this.node.destroy();
                break;
            case 'Menu':cc.director.loadScene('mainScene');
                break;
            default:
                break;
        }
    },

    // update (dt) {},
});
