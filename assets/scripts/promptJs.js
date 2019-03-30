var global = require("./global");

cc.Class({
    extends: cc.Component,

    properties: {
        word:{
            default:null,
            type: cc.Label
        },
    },

    onLoad () {
        this.wordIndex = 0;
        this.schedule(function() {
            if(this.dialogue){
                if(this.wordIndex < (this.dialogue[this.barrierName].length-1)){
                    this.wordIndex++;
                }else{
                    this.wordIndex = 0;
                }
                this.word.string = this.dialogue[this.barrierName][this.wordIndex];
            }
        }, 2);
    },

    writeRabbitDialogue:function(word){
        this.barrierName = (global.currentBarrier-1) + "";
        this.dialogue = word;
        this.word.string = this.dialogue[this.barrierName][this.wordIndex];
    },

});
