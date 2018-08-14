//获取当前时间
function getNowTime(){
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";

        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? '0'+ (data.getMonth()+1) : data.getMonth()+1;
        var strDate = date.getDate() < 10 ? '0'+data.getDate() : data.getDate();
        
        var hour = date.getHours() < 10 ? '0'+data.getHours(): data.getHours();
        var minute = date.getMinutes() < 10 ? '0'+data.getMinutes(): data.getMinutes();
        var second = date.getSeconds() < 10 ? '0'+data.getSeconds(): data.getSeconds();

        var currentTime = year + seperator1 + month + seperator1 + strDate+ " "
                        + hour + seperator2 + minute + seperator2 + second;
        return currentTime;
}

module.exports = getNowTime;