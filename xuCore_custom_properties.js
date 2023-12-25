//=============================================================================
// xuCore.js
//=============================================================================

/*:
 * @plugindesc 徐然自定义属性插件
 * @author XiaoxuStudio
 *
 * @help 徐然自定义属性插件，由小徐工作室——徐然制作
 * 当前为版本：0.1.51
 * 
 * 版本0.1.51（2023.12.20）
 * 1.增加同步属性：当一个自定义属性设置为同步属性时
 * 则属性会在装备和脱下时减少对应角色的相应数值
 * 
 * 版本0.1.5（2023.12.14）
 * 1.增加可对部分对象自定义属性
 * 
 * 版本0.1.4（2023.4.28）
 * 1.新增两处位置显示
 * 
 * 版本0.1.3（2022-9-9）
 * 1.新增属性值类型：字符串数组，使用英文逗号分割数组
 * 
 * 版本0.1.2（2022-9-9）
 * 1.修复自增、自减无效的bug
 * 
 * 版本0.1.1（2022-9-9）
 * 1.修复状态显示生效
 * 2.添加更新历史
 * 
 * 版本0.1 （2022-9-8）
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
 * 在属性值里添加字符串数组
 * 在对话框里使用\XUG[角色id,属性标签{数组索引}]
 * 
 * 示例：
 * 属性值里添加字符串数组：小徐,插件,很好（假设属性标签为tag）
 * 在对话框使用\XUG[1,tag{0}] ————>提示小徐
 * 在对话框使用\XUG[1,tag{1}] ————>提示插件
 * 在对话框使用\XUG[1,tag{2}] ————>提示很好
 * 
 * 其他对象添加属性：
 * 在备注上使用<$X...:value>
 * 必须使用$X（大写X）开头，否则不会被解析
 * value默认会被解析成string字符串，(value)将会被解析为js值
 * <$Xquanlity:(10)> --> 将会被解析为数字10
 * <$Xquanlity:10> --> 将会被解析为字符串10
 * 
 * 同步属性：
 * 在备注上使用<$X...:value,true>
 * 则当前属性会作为同步属性
 * 属性会在装备和脱下时减少对应角色的相应数值
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
 * 【sweapon】
 * sweapon 装备索引 属性 属性值
 * 介绍：
 * 设置定义的属性值
 * 
 * 【sskill】
 * sskill 技能索引 属性 属性值
 * 介绍：
 * 设置定义的属性值
 * 
 * 【sstate】
 * sstate 状态索引 属性 属性值
 * 介绍：
 * 设置定义的属性值
 * 
 * 【sarmor】
 * sarmor 护甲索引 属性 属性值
 * 介绍：
 * 设置定义的属性值
 * 
 * 【sclass】
 * sclass 职业索引 属性 属性值
 * 介绍：
 * 设置定义的属性值
 * 【senemy】
 * senemy 敌人索引 属性 属性值
 * 介绍：
 * 设置定义的属性值
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
 * 【\XUG{类型,索引id,属性标识}】
 * 介绍：
 * 用于获取对应对象的属性值
 * 类型：weapon 装备，skill 技能，item 物品 ，state 状态，armor 护甲 ，enemy 敌人 ， class 职业
 * —————————————————————————Xu_core—————————————————————————
 * 
 * 此插件由小徐工作室——徐然制作
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
 * 
 * @param fgx
 * @text ——————————分割线———————————
 * @parent 其他设置
 * 
 *  @param oncheck1
 * @text 启用状态标签显示1
 * @parent 其他设置
 * @type boolean
 * @desc  在上面属性下显示一个属性
 * NO - false     YES - true
 * @default false
 * 
 * @param onvalue1
 * @text 属性标识1
 * @parent 其他设置
 * @type string
 * @desc  此处标识对应自定义属性标识，如需显示多个请用英文逗号分割
 * @default jj
 * 
 * @param onvalue_offset1
 * @text 属性标识1——y偏移
 * @parent 其他设置
 * @type Number
 * @desc  此处标识对应属性标识1的y轴偏移
 * @default -10
 * 
 * 
 * @param fgx
 * @text ——————————分割线———————————
 * @parent 其他设置
 *  
 * 
 * @param oncheck_ac
 * @text 启用角色状态标签显示
 * @parent 其他设置
 * @type boolean
 * @desc  在角色职位旁边显示一个属性
 * NO - false     YES - true
 * @default false
 * 
 * @param onvalue_ac
 * @text 角色属性标识
 * @parent 其他设置
 * @type string
 * @desc  此处标识对应自定义属性标识，如需显示多个请用英文逗号分割
 * @default jj
 * 
 * @param onvalue_ac_offsetx
 * @text 角色状态标签——x偏移
 * @parent 其他设置
 * @type Number
 * @desc  此处标识对应角色状态标签的x轴偏移
 * @default 60
 * 
 */
//=============================================================================

const fs = require('fs');
var XuCore = XuCore || {};
XuCore.tool = XuCore.tool || {};

XuCore.Param = XuCore.Param || {};


var localdata = PluginManager.parameters("xuCore_custom_properties");
XuCore.Param.slist = eval(localdata['SXlist']);
XuCore.Param.tlist = eval(localdata['SXtag']);
XuCore.Param.vlist = eval(localdata['SXvalue']);

XuCore.xlog = function (te) {
    console.log("小徐核心(XuCore):" + te);
}

var version = "0.1.4";
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
var x_actor = function (actorId) {
    var actor_obj = $gameActors.actor(actorId);
    console.log(actor_obj)
    return actor_obj;
}
var change = window.change = function (obj, id, prototype, val) {
    if (obj && obj[id] && obj[id]._xrcustom_p) {
        if (obj[id]._xrcustom_p.hasOwnProperty(prototype)) {
            let match = val.match(/^\(([^\)]+)\)$/i)
            if (match) { val = new Function("return " + match[1])() }
            obj[id]._xrcustom_p[prototype] = val
        }
        if (obj[id]._syncvarlist.hasOwnProperty(prototype)) {
            let match = val.match(/^\(([^\)]+)\)$/i)
            if (match) { val = new Function("return " + match[1])() }
            obj[id]._syncvarlist[prototype] = val
        }
    }
}
let _attr = function (obj, id, prototype) {
    if (obj && obj[id] && obj[id]._xrcustom_p) {
        if (obj[id]._xrcustom_p.hasOwnProperty(prototype)) {
            return obj[id]._xrcustom_p[prototype]
        }
    }
    return null;
}
var attr = window.attr = function (type, id, prototype) {
    let res = null;
    if (type == "weapon") {
        res = _attr.call(this, $dataWeapons, id, prototype)
    }
    if (type == "skill") {
        res = _attr.call(this, $dataSkills, id, prototype)
    }
    if (type == "item") {
        res = _attr.call(this, $dataItems, id, prototype)
    }
    if (type == "state") {
        res = _attr.call(this, $dataStates, id, prototype)
    }
    if (type == "armor") {
        res = _attr.call(this, $dataArmors, id, prototype)
    }
    if (type == "class") {
        res = _attr.call(this, $dataClasses, id, prototype)
    }
    if (type == "enemy") {
        res = _attr.call(this, $dataEnemies, id, prototype)
    }
    return res;
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
XuCore.tool.DAName = Window_Base.prototype.drawActorClass;
Window_Base.prototype.drawActorClass = function (actor, x, y, width) {
    XuCore.tool.DAName.call(this, actor, x, y, width);
    var text_lo = ""
    var next_position = { x: x, y: y }
    // 角色属性
    var offset1 = parseFloat(localdata["onvalue_ac_offsetx"])
    if (localdata["oncheck_ac"] == "true") {
        var lo_data = localdata["onvalue_ac"].split(",");
        for (var i = 0; i < lo_data.length; i++) {
            text_lo += actor._Var[lo_data[i]].value;
        }
        var text_size = text_lo.length * this.lineHeight()
        if (text_size > 100) {
            text_size = text_size / 2;
        }
        next_position.x = next_position.x + this.lineHeight() + offset1
        this.drawText(text_lo, next_position.x, next_position.y, text_size, 'right');
        text_lo = undefined;
    }
};


XuCore.tool.DALevel = Window_Base.prototype.drawActorLevel;
Window_Base.prototype.drawActorLevel = function (actor, x, y) {
    XuCore.tool.DALevel.call(this, actor, x, y);
    var text_lo = ""
    var next_position = { x: x, y: y }
    if (localdata["oncheck"] == "true") {
        var lo_data = localdata["onvalue"].split(",");
        for (var i = 0; i < lo_data.length; i++) {
            text_lo += actor._Var[lo_data[i]].value;
        }
        var text_size = text_lo.length * this.lineHeight()
        if (text_size > 100) {
            text_size = text_size / 2;
        }
        next_position.y = next_position.y + this.lineHeight()
        this.drawText(text_lo, next_position.x, next_position.y, text_size, 'left');
        text_lo = "";
    }
    // 属性标识1
    var offset1 = parseFloat(localdata["onvalue_offset1"])
    if (localdata["oncheck1"] == "true") {
        var lo_data = localdata["onvalue1"].split(",");
        for (var i = 0; i < lo_data.length; i++) {
            text_lo += actor._Var[lo_data[i]].value;
        }
        var text_size = text_lo.length * this.lineHeight()
        if (text_size > 100) {
            text_size = text_size / 2;
        }
        next_position.y = next_position.y + this.lineHeight() + offset1
        this.drawText(text_lo, next_position.x, next_position.y, text_size, 'left');
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


Game_Actor.prototype.setVar = function (arr, value, ins = false) {
    if (value && arr && this._Var[arr] != null) {
        this._Var[arr].value = value;
    }
    return true;
}
XuCore.tool.initEquips = Game_Actor.prototype.initEquips
Game_Actor.prototype.initEquips = function (equips) {
    XuCore.tool.initEquips.call(this, equips)
    var slots = this.equipSlots();
    var maxSlots = slots.length;
    for (var j = 0; j < this.equips().length; j++) {
        if (j < maxSlots) {
            if (this.equips()[j] && this.equips()[j]._syncvarlist) {
                if (Object.keys(this.equips()[j]._syncvarlist).length > 0) {
                    for (let i in this.equips()[j]._syncvarlist) {
                        let val = this.equips()[j]._syncvarlist[i]
                        if (val) {
                            try {
                                let vals = parseFloat(val)
                                this.setVar(i, parseFloat(this.getVar(i).value) + vals)
                            } catch (e) {
                                this.setVar(i, parseFloat(this.getVar(i).value) + val)
                            }
                        }
                    }
                }
            }
        }
    }
    this.releaseUnequippableItems(true);
    this.refresh();
};
Game_Actor.prototype.initvarlist = function () {
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

XuCore.tool.tradeItemWithParty = Game_Actor.prototype.tradeItemWithParty
Game_Actor.prototype.tradeItemWithParty = function (newItem, oldItem) {
    let res = XuCore.tool.tradeItemWithParty.call(this, newItem, oldItem)
    if (newItem && newItem._syncvarlist) {
        if (Object.keys(newItem._syncvarlist).length > 0) {
            for (let i in newItem._syncvarlist) {
                let val = newItem._syncvarlist[i]
                if (val) {
                    try {
                        let vals = parseFloat(val)
                        this.setVar(i, parseFloat(this.getVar(i).value) + vals)
                    } catch (e) {
                        this.setVar(i, parseFloat(this.getVar(i).value) + val)
                    }
                }
            }
        }
    }
    if (oldItem && oldItem._syncvarlist) {
        if (Object.keys(oldItem._syncvarlist).length > 0) {
            for (let i in oldItem._syncvarlist) {
                let val = oldItem._syncvarlist[i]
                if (val) {
                    try {
                        let vals = parseFloat(val)
                        this.setVar(i, parseFloat(this.getVar(i).value) - vals)
                    } catch (e) {
                        this.setVar(i, parseFloat(this.getVar(i).value) + val)
                    }
                }
            }
        }
    }
    return res
};



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
        text = text.replace(/\x1bXUG\{(([a-zA-Z]+),(\d+),([a-zA-Z0-9]+))\}/gi, function (match, o, type, id, prototype) {
            id = parseInt(id)
            let res = ""
            if (type == "weapon") {
                res = attr(type, id, prototype)
            }
            if (type == "skill") {
                res = attr(type, id, prototype)
            }
            if (type == "item") {
                res = attr(type, id, prototype)
            }
            if (type == "state") {
                res = attr(type, id, prototype)
            }
            if (type == "armor") {
                res = attr(type, id, prototype)
            }
            if (type == "class") {
                res = attr(type, id, prototype)
            }
            if (type == "enemy") {
                res = attr(type, id, prototype)
            }
            return res;
        }.bind(this));
        text = text.replace(/\x1bXUG\[((\d+),([a-zA-Z0-9]+))\]/gi, function () {
            var lo_data = arguments[1].split(",");
            let res = $gameActors.actor(lo_data[0])[lo_data[1]]
            if (res) {
                return res.value;
            }
            return arguments[1];
        }.bind(this));
        text = text.replace(/\x1bXUG\[((\d+),(([a-zA-Z0-9]+)(\{[0-9]\})))\]/gi, function () {
            var lo_data = arguments[1].split(",");
            // var the_value=;
            var the_index = lo_data[1].substring(lo_data[1].indexOf("{") + 1, lo_data[1].indexOf("}")) //截取
            var the_tag = lo_data[1].match("(.+)\{")[1];
            var the_te = ""
            if (lo_data[1].match(the_tag) != null) {
                var local_var = $gameActors.actor(lo_data[0])[the_tag.toString()].value.split(",");
                the_te = local_var[the_index];
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
        if (command == "sweapon") {
            change($dataWeapons, args[0], args[1], args[2])
        }
        if (command == "sskill") {
            change($dataSkills, args[0], args[1], args[2])
        }
        if (command == "sitem") {
            change($dataItems, args[0], args[1], args[2])
        }
        if (command == "sstate") {
            change($dataStates, args[0], args[1], args[2])
        }
        if (command == "sarmor") {
            change($dataArmors, args[0], args[1], args[2])
        }
        if (command == "sclass") {
            change($dataClasses, args[0], args[1], args[2])
        }
        if (command == "senemy") {
            change($dataEnemies, args[0], args[1], args[2])
        }
    }

}


//初始化其他对象笔记属性
XuCore.tool.onload = DataManager.onLoad
DataManager.onLoad = function (object) {
    XuCore.tool.onload.call(this, object)
    const complite = (obj, type) => {
        let index = 0
        for (let item of obj) {
            if (item) {
                if (!item.hasOwnProperty("_xrcustom_p")) { item._xrcustom_p = {} }
                let attrs = item.meta || {}
                for (let attr in attrs) {
                    // 自定义
                    if (attr.startsWith("$X")) {
                        // 加载其他
                        let key = attr.slice(2)
                        let val = attrs[attr]
                        // 判断属性是否有效
                        if (val) {
                            // 自定义属性
                            let match = String(val).match(/^\(([^\)]+)\)$/i)
                            if (match) { item._xrcustom_p[key] = new Function("return " + match[1])() } else { item._xrcustom_p[key] = val }
                        }
                    }
                }
            }
            index++
        }
    }
    if ($dataWeapons && $dataWeapons.length > 0 && !$dataWeapons.init) { complite($dataWeapons, "Weapons"); $dataWeapons.init = true }
    if ($dataSkills && $dataSkills.length > 0 && !$dataSkills.init) { complite($dataSkills, "Skills"); $dataSkills.init = true }
    if ($dataItems && $dataItems.length > 0 && !$dataItems.init) { complite($dataItems, "Items"); $dataItems.init = true }
    if ($dataStates && $dataStates.length > 0 && !$dataStates.init) { complite($dataStates, "States"); $dataStates.init = true }
    if ($dataArmors && $dataArmors.length > 0 && !$dataArmors.init) { complite($dataArmors, "Armors"); $dataArmors.init = true }
    if ($dataClasses && $dataClasses.length > 0 && !$dataClasses.init) { complite($dataClasses, "Classes"); $dataClasses.init = true }
    if ($dataEnemies && $dataEnemies.length > 0 && !$dataEnemies.init) { complite($dataEnemies, "Enemies"); $dataEnemies.init = true }
};

// 加载同步属性
XuCore.tool.extractMetadata = DataManager.extractMetadata
DataManager.extractMetadata = function (data) {
    XuCore.tool.extractMetadata.call(this, data)
    var re = /<([^<>:]+)(:?)([^>]*)>/g;
    for (; ;) {
        var match = re.exec(data.note);
        if (match) {
            if (/^\<\$X(.+):(.+),(.+)\>/i.test(String(match[0]))) {
                if (!data.hasOwnProperty("_syncvarlist")) {
                    data._syncvarlist = new Proxy({}, {
                        get(o, p) {
                            return o[p]
                        },
                        set(o, p, v) {
                            data._xrcustom_p[p] = v
                            o[p] = v
                            return true
                        },
                    })
                }
                let m = String(match[0]).match(/^\<\$X(.+):(.+),(.+)\>/i)
                data.meta["$X" + m[1]] = m[2];
                // 判断属性是否有效
                let key = m[1]
                let val = m[2]
                if (val) {
                    let match = String(val).match(/^\(([^\)]+)\)$/i)
                    if (match) {
                        Object.defineProperty(data._syncvarlist, key, {
                            value: new Function("return " + match[1])(),
                            enumerable: true,
                            writable: true,
                            configurable: true
                        })
                    } else {
                        Object.defineProperty(data._syncvarlist, key, {
                            value: val,
                            enumerable: true,
                            writable: true,
                            configurable: true
                        })
                    }
                }
            }
        } else {
            break;
        }
    }
};

// 加载其他对象笔记属性
XuCore.tool.loadGameWithoutRescue = DataManager.loadGameWithoutRescue
DataManager.loadGameWithoutRescue = function (savefileId) {
    XuCore.tool.loadGameWithoutRescue.call(this, savefileId)
    // 解包目前已存在的数据，不存在则跳过
    const _unpack = (obj, type, arr) => {
        for (let ind in obj) {
            let item = obj[ind]
            if (item) {
                let attrs = item._xrcustom_p || {}
                for (let key in attrs) {
                    let tr = arr[ind]
                    if (tr[key]) {
                        item._xrcustom_p[key] = tr[key]
                    }
                }
            }
        }
    }
    const _unpack_s = (obj, type, arr) => {
        for (let ind in obj) {
            let item = obj[ind]
            if (item) {
                let attrs = item._syncvarlist || {}
                for (let key in attrs) {
                    let tr = arr[ind]
                    if (tr[key]) {
                        item._syncvarlist[key] = tr[key]
                    }
                }
                item._syncvarlist = new Proxy(attrs, {
                    get(o, p) {
                        return o[p]
                    },
                    set(o, p, v) {
                        item._xrcustom_p[p] = v
                        o[p] = v
                        return true
                    },
                })
            }
        }
    }
    // 加载对象属性
    let a = 'xrobj%1.xrsave'.format(savefileId);
    let a_path = StorageManager.localFileDirectoryPath() + a
    if (fs.existsSync(a_path)) {
        // 存在就加载
        let jsonp = JsonEx.parse(LZString.decompressFromBase64(fs.readFileSync(a_path, { encoding: 'utf8' })))
        for (let item in jsonp["_xc"]) {
            if (item == "weapon") {
                _unpack($dataWeapons, item, jsonp["_xc"][item])
            }
            if (item == "skill") {
                _unpack($dataSkills, item, jsonp["_xc"][item])
            }
            if (item == "item") {
                _unpack($dataItems, item, jsonp["_xc"][item])
            }
            if (item == "state") {
                _unpack($dataStates, item, jsonp["_xc"][item])
            }
            if (item == "armor") {
                _unpack($dataArmors, item, jsonp["_xc"][item])
            }
            if (item == "class") {
                _unpack($dataClasses, item, jsonp["_xc"][item])
            }
            if (item == "enemy") {
                _unpack($dataEnemies, item, jsonp["_xc"][item])
            }
        }
        for (let item in jsonp["_xs"]) {
            if (item == "weapon") {
                _unpack_s($dataWeapons, item, jsonp["_xs"][item])
            }
            if (item == "skill") {
                _unpack_s($dataSkills, item, jsonp["_xs"][item])
            }
            if (item == "item") {
                _unpack_s($dataItems, item, jsonp["_xs"][item])
            }
            if (item == "state") {
                _unpack_s($dataStates, item, jsonp["_xs"][item])
            }
            if (item == "armor") {
                _unpack_s($dataArmors, item, jsonp["_xs"][item])
            }
            if (item == "class") {
                _unpack_s($dataClasses, item, jsonp["_xs"][item])
            }
            if (item == "enemy") {
                _unpack_s($dataEnemies, item, jsonp["_xs"][item])
            }
        }
    }
    return true
};

// 保存其他对象笔记属性
XuCore.tool.backup = StorageManager.backup
StorageManager.backup = function (savefileId) {
    XuCore.tool.backup.call(this, savefileId)
    let a = 'xrobj%1.xrsave'.format(savefileId);
    const complite = (obj, sdata, type) => {
        for (let ind in obj) {
            let item = obj[ind]
            if (item) {
                if (!sdata.hasOwnProperty("_xc")) { sdata["_xc"] = {} }
                if (!sdata.hasOwnProperty("_xs")) { sdata["_xs"] = {} }
                if (!sdata._xc.hasOwnProperty(type)) { sdata["_xc"][type] = {} }
                if (!sdata._xs.hasOwnProperty(type)) { sdata["_xs"][type] = {} }
                if (!sdata._xc[type].hasOwnProperty(ind)) { sdata._xc[type][ind] = {} }
                let attrs = item._xrcustom_p || {}
                if (Object.keys(attrs).length > 0) {
                    for (let key in attrs) {
                        let val = attrs[key]
                        sdata._xc[type][ind][key] = val
                    }
                }
                // 同步
                if (!sdata._xs[type].hasOwnProperty(ind)) { sdata._xs[type][ind] = {} }
                attrs = item._syncvarlist || {}
                if (Object.keys(attrs).length > 0) {
                    for (let key in attrs) {
                        let val = attrs[key]
                        sdata._xs[type][ind][key] = val
                    }
                }
            }
        }
    }
    let data = {}
    if ($dataWeapons && $dataWeapons.length > 0 && $dataWeapons.init) { complite($dataWeapons, data, "weapon"); }
    if ($dataSkills && $dataSkills.length > 0 && $dataSkills.init) { complite($dataSkills, data, "skill"); }
    if ($dataItems && $dataItems.length > 0 && $dataItems.init) { complite($dataItems, data, "item"); }
    if ($dataStates && $dataStates.length > 0 && $dataStates.init) { complite($dataStates, data, "state"); }
    if ($dataArmors && $dataArmors.length > 0 && $dataArmors.init) { complite($dataArmors, data, "armor"); }
    if ($dataClasses && $dataClasses.length > 0 && $dataClasses.init) { complite($dataClasses, data, "class"); }
    if ($dataEnemies && $dataEnemies.length > 0 && $dataEnemies.init) { complite($dataEnemies, data, "enemy"); }
    if (this.exists(savefileId)) {
        if (this.isLocalMode()) {
            var compressed = LZString.compressToBase64(JsonEx.stringify(data));
            let a_path = this.localFileDirectoryPath() + a
            fs.writeFileSync(a_path, compressed);
        } else {
            var compressed = LZString.compressToBase64(JsonEx.stringify(data));
            var key = this.webStorageKey(savefileId);
            localStorage.setItem(key + a, compressed);
        }
    }
};

// ————————————————————XU_Core———————————————————————————
//到底部了哦！！！
// COPY代码请留我个姓名，LOVE 爱你！！！
// ————————————————————XU_Core———————————————————————————