//=============================================================================
// xuCore.js
//=============================================================================

/*:
 * @plugindesc 小徐自定义属性插件
 * @author XiaoxuStudio
 *
 * @help 小徐自定义属性插件，由小徐工作室——徐然制作
 * 当前为版本：0.1.3
 * 
 * 版本0.1.3
 * 1.新增属性值类型：字符串数组，使用英文逗号分割数组
 * 
 * 版本0.1.2
 * 1.修复自增、自减无效的bug
 * 
 * 版本0.1.1
 * 1.修复状态显示生效
 * 2.添加更新历史
 * 
 * 版本0.1
 * 1.增加自定义属性功能
 * 2.增加插件说明介绍
 * 3.插件框架构建
 * 
 * —————————————————————————Xu_core—————————————————————————
 * 
 * ▁▂▃▄▅▆▇自定义属性
 * 
 * 在Sx Menu中有三栏，分别是属性名称，属性标识，属性值
 * 
 * 属性名称：对应键值为name(你们可能会用到)，该属性是定义我们属性的名称
 * 属性标识：用于定义我们属性的标识，是唯一的
 * 属性值：对应键值为value(你们可能会用到)，定义属性的默认值
 * 
 * 以上属性缺一不可
 * 
 * 
 * 字符串数组
 * 
 * 在属性值里添加字符串数组
 * 在对话框里使用\XUG[角色id,属性标签{数组索引}]
 * 
 * 示例：
 * 属性值里添加字符串数组：小徐,插件,很好（假设属性标签为tag）
 * 在对话框使用\XUG[1,tag{0}] ————>提示小徐
 * 在对话框使用\XUG[1,tag{1}] ————>提示插件
 * 在对话框使用\XUG[1,tag{2}] ————>提示很好
 * 
 * —————————————————————————Xu_core—————————————————————————
 * 
 * ▁▂▃▄▅▆▇插件指令
 * 
 * 【gactor】
 * gactor 角色id 属性标识
 * 介绍：
 * 用于获取我们定义的属性
 * 
 * 【sactor】
 * sactor 角色id 属性标识 属性值
 * 介绍：
 * 用于设置我们定义的属性对应的属性值
 * 
 * 【add_actor】
 * add_actor 角色id 属性标识 属性值
 * 介绍：
 * 自增定义的属性值
 * 
 * 【down_actor】
 * add_actor 角色id 属性标识 属性值
 * 介绍：
 * 自减定义的属性值
 * 
 * —————————————————————————Xu_core—————————————————————————
 * 
 * ▁▂▃▄▅▆▇脚本指令
 * 
 * 【x_actor】
 * x_actor(角色id)
 * 介绍：
 * 用于获取对应角色的对象，如果要获取我们定义的角色属性值
 * 可以使用x_actor(角色id).getVar(属性标识).value
 * 这个value上面也说过，所以也可以获取name
 * 
 * 
 * —————————————————————————Xu_core—————————————————————————
 * 
 * ▁▂▃▄▅▆▇对话框代码
 * 
 * 【\XUG[角色id,属性标识]】
 * 介绍：
 * 用于获取对应角色的属性值
 * 
 * —————————————————————————Xu_core—————————————————————————
 * 
 * 此插件由小型工作室——徐然制作
 * 2022/9/8
 * 
 * 
 * @param Sx Menu
 * @default
 * 
 * @param SXlist
 * @text 属性名称
 * @parent Sx Menu
 * @type []
 * @desc 这里可以自己新增对象的属性
 * @default ["境界"]
 * 
 * @param SXtag
 * @text 属性标识
 * @parent Sx Menu
 * @type []
 * @desc 此处标识对应自定义属性
 * @default ["jj"]
 *
 * @param SXvalue
 * @text 属性值
 * @parent Sx Menu
 * @type []
 * @desc  此处标识对应自定义属性值，可使用字符串数组
 * @default ["练气"]
 * 
 * @param SXstate
 * @text 启用
 * @parent Sx Menu
 * @type boolean
 * @desc  自定义属性启用开关
 * NO - false     YES - true
 * @default true
 * 
 * @param 其他设置
 * @default
 * 
 * @param oncheck
 * @text 启用状态标签显示
 * @parent 其他设置
 * @type boolean
 * @desc  在状态一栏显示一个属性
 * NO - false     YES - true
 * @default false
 * 
 * @param onvalue
 * @text 属性标识
 * @parent 其他设置
 * @type string
 * @desc  此处标识对应自定义属性标识，如需显示多个请用英文逗号分割
 * @default jj
 * 
 */





//=============================================================================


var XuCore = XuCore || {};
XuCore.tool = XuCore.tool || {};

XuCore.Param = XuCore.Param || {};


var localdata = PluginManager.parameters("xuCore_custom_properties");
XuCore.Param.slist = eval(localdata['SXlist']);
XuCore.Param.tlist = eval(localdata['SXtag']);
XuCore.Param.vlist = eval(localdata['SXvalue']);

XuCore.tool.varlist = XuCore.tool.varlist || {};//总属性存储

XuCore.xlog = function (te) {
    console.log("小徐核心(XuCore):" + te);
}

var version = "0.1.3";
XuCore.xlog("版本：" + version);

XuCore.tool.contains = function (arr, str) {
    var i = arr.length - 1;
    while (i--) {
        if (arr[i] == str) {
            return true;
        }
    }
    return false;
}



// ————————————————————XU_Core———————————————————————————
//定义Xu_core工具类
// ————————————————————XU_Core———————————————————————————
var x_actor=function(actorId){
    var actor_obj = $gameActors.actor(actorId);
    console.log(actor_obj)
    return actor_obj;
}

// ————————————————————XU_Core———————————————————————————
//重写Window_Status
// ————————————————————XU_Core———————————————————————————
XuCore.tool.Wstatus = Window_Status.prototype.drawBasicInfo;
Window_Status.prototype.drawBasicInfo = function (x, y) {
    XuCore.tool.Wstatus.call(this, x, y);
    var lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
};
XuCore.tool.DALevel = Window_Base.prototype.drawActorLevel;
Window_Base.prototype.drawActorLevel = function (actor, x, y) {
    XuCore.tool.DALevel.call(this, actor, x, y);
    var text_lo = ""
    console.log(localdata["oncheck"])
    if (localdata["oncheck"]=="true") {
        var lo_data = localdata["onvalue"].split(",");
        for (var i = 0; i < lo_data.length; i++) {
            text_lo += actor._Var[lo_data[i]].value;
        }
        var text_size = text_lo.length * this.lineHeight()
        if (text_size > 100) {
            text_size = text_size / 2;
        }
        this.drawText(text_lo, x, y + this.lineHeight(), text_size, 'left');
        text_lo = undefined;
    }
};

// ————————————————————XU_Core———————————————————————————
//重写Game_Actor
// ————————————————————XU_Core———————————————————————————

XuCore.tool.iMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function () {
    XuCore.tool.iMembers.call(this);
    this._Var = {};
     this.initvarlist();
}

XuCore.tool.Gsetup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
    XuCore.tool.Gsetup.call(this, actorId);
    //    其他设置
}

Game_Actor.prototype.getVar = function (arr) {
    if (arr && this._Var && this._Var[arr]) {
        return this._Var[arr];
    }
    return {};
}


Game_Actor.prototype.setVar = function (arr, value) {
    if (value && arr && this._Var[arr] != null) {
        this._Var[arr].value = value;
    }
    return true;
}


Game_Actor.prototype.initvarlist = function (actorId) {
    this._Var_lo = {};
    this._Var = {};
    // 加载属性
    for (var i = 0; i < XuCore.Param.tlist.length; i++) {
        var param = XuCore.Param.tlist[i].toString();
        var param1 = XuCore.Param.slist[i] || "无";
        var param2 = XuCore.Param.vlist[i];
        this._Var_lo[param.toString()] = { "name": param1, "value": param2 };
    }
    //检测对比
    for (var i = 0; i < XuCore.Param.tlist.length; i++) {
        var param = XuCore.Param.tlist[i].toString();
        if (XuCore.tool.contains(this._Var, param) == false) {
            this._Var[param] = this._Var_lo[param];
        }
    }
}



//By FROG https://github.com/FrogboyMV/Health/blob/master/FROG_Health.js
if (localdata.SXstate) {
    var bOk = false;
    var evalStr = "Object.defineProperties (Game_Actor.prototype, {";
    //判断标识和变量
    if (XuCore.Param.vlist.length != XuCore.Param.tlist.length) {
        XuCore.xlog("存在值与标识无对应关系");
    } else {
        for (var i = 0; i < XuCore.Param.vlist.length; i++) {
            var param = XuCore.Param.tlist[i];
            var param1 = XuCore.Param.slist[i] || "无";
            var param2 = XuCore.Param.vlist[i];
            if (param && param1 && param2) {
                evalStr += "" +
                    param + ": { " +
                    "   get: function () { " +
                    "      return this.getVar('" + param + "') || 0; " +
                    "   }, " +
                    "   configurable: true " +
                    "}, ";
                bOk = true;
            }
        }
    }
    evalStr = evalStr.slice(0, -1) + " });";
    if (bOk) eval(evalStr);
    i = bOk = evalStr = param = param1 = undefined;

}





//处理对话框变量
XuCore.tool.WBase = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function (text) {
    text = XuCore.tool.WBase.call(this, text);
    if (localdata.SXstate) {
        text = text.replace(/\\/g, '\x1b');
        text = text.replace(/\x1b\x1b/g, '\\');
        text = text.replace(/\x1bXUG\[((\d+),([a-zA-Z0-9]+))\]/gi, function () {
            var lo_data = arguments[1].split(",");
            return $gameActors.actor(lo_data[0])[lo_data[1]].value;
        }.bind(this));
        text = text.replace(/\x1bXUG\[((\d+),(([a-zA-Z0-9]+)(\{[0-9]\})))\]/gi, function () {
            var lo_data = arguments[1].split(",");
            // var the_value=;
            var the_index=lo_data[1].substring(lo_data[1].indexOf("{")+1,lo_data[1].indexOf("}")) //截取
            var the_tag=lo_data[1].match("(.+)\{")[1];
            var the_te=""
            if(lo_data[1].match(the_tag)!=null){
                var local_var = $gameActors.actor(lo_data[0])[the_tag.toString()].value.split(",");
                the_te=local_var[the_index];
            }
            return the_te;
        }.bind(this));
        return text;
    }
};







//处理插件指令
XuCore.tool.Icmd = Game_Interpreter.prototype
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    if (localdata.SXstate) {
        if (command == "gactor") {
            var actor_obj = $gameActors.actor(args[0]);
            XuCore.xlog(actor_obj[args[1]][args[2]]);
        }
        if (command == "sactor") {
            var actor_obj = $gameActors.actor(args[0]);
            actor_obj.setVar(args[1], args[2]);
        }
        if (command == "add_actor") {
            var actor_obj = $gameActors.actor(args[0]);
            var lo_v = parseInt(actor_obj.getVar(args[1]).value);
            actor_obj.setVar(args[1], lo_v + parseInt(args[2]));
        }
        if (command == "down_actor") {
            var actor_obj = $gameActors.actor(args[0]);
            var lo_v = parseInt(actor_obj.getVar(args[1]).value);
            actor_obj.setVar(args[1], lo_v - parseInt(args[2]));
        }
    }

}






// ————————————————————XU_Core———————————————————————————
//到底部了哦！！！
// COPY代码请留我个姓名，LOVE 爱你！！！
// ————————————————————XU_Core———————————————————————————