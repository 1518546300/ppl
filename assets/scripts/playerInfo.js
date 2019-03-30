const playerInfo = {};

playerInfo.writeBarrier = function(num) {
    let userData = {
        barrier: num,
    };
    cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
};

playerInfo.writeCoinNum = function(num) {
    let coinNum = {
        gold: num
    };
    cc.sys.localStorage.setItem('coinNum', JSON.stringify(coinNum));
};

module.exports = playerInfo;
export default playerInfo;
