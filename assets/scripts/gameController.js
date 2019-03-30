var global = require("./global");

cc.Class({
    extends: cc.Component,

    properties: {
        exitFrame:{
            default: null,
            type: cc.Prefab
        },
    },

    onLoad () {

    },

    buttonClicked:function(event , msg){
        switch (msg) {
            case 'exit':
                let exit = cc.instantiate(this.exitFrame);
                exit.parent = this.node;
                break;
            default:
                break;
        }
    },

    // update (dt) {},
});
