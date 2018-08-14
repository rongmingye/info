this.Site = (function() {
    var def = {
        "protocol": "http",
        "hostname": "127.0.0.1",
        // "hostname": "39.108.97.182",
        // "hostname": "rongmingye.xin",
        // "hostname": "192.168.0.104",
        "port": "8080",
        "path": ""
    };
    /**
     * 定义不同服务之间的接口
     * [注意] path的属性名在配置文件中保持唯一
     */
    var map = [
        {
            "port":"8080",
            "path": {
                "user.login": "/user/login", //用户登陆
                "user.info": "/user/info", // 用户信息
                "user.changeInfo": "/user/changeInfo", // 用户信息
                "user.repassword": "/user/repassword", // 改密码
                "student.practice": "/student/practice", //学生实习信息
                "student.publicPractice": "/student/publicPractice", // 发布实习信息
                "teacher.practices": "/teacher/practices", // 老师的学生们实习

                "employ.info": "/employ/info", // 招聘信息
                "employ.publish": "/employ/publish", // 发布招聘
                "board.getQuestions": "/board/getQuestions", //所有问题信息
                "board.getQuestion": "/board/getQuestion", //当前问题
                "board.getComments": "/board/getComments", //当前评论
                "board.getReplys": "/board/getReplys", //当前回复
                "board.publicQuestion": "/board/publicQuestion", // 发布问题
                "board.publicComment": "/board/publicComment", // 发布评论
                "board.publicReply": "/board/publicReply", // 发布回复
                "school.news": "/school/news", // 校园风采
                "school.classStudents": "/school/classStudents", // 班级名单
            }
        },
    ];

    return function (str) {
        for(var i = 0; i < map.length; i++) {
            if(map[i].path[str]) {
                var protocol = map[i].protocol || def.protocol,
                    hostname = map[i].hostname || def.hostname,
                    port = map[i].port || def.port,
                    path = map[i].path[str];
                return protocol+"://"+hostname+":"+port+path;
            }
        }
        return "";
    };

})();