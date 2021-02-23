/**
 * 验证输入数据
 */
/**
 * 
  过滤敏感字符，防止xss攻击 
 */
 export function  stripscript(str) {
     var toStr = '';
    if( typeof(str) === 'number'){
        str = toStr + str;
    }
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
        var rs = "";
        for (var i = 0; i < str.length; i++) {
                rs = rs + str.substr(i, 1).replace(pattern, '');
            }
        return rs;
        }
/*
  校验邮箱
*/
export function validateEmail(value) {
         let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
         return !reg.test(value) ?false:true;
       }
/*
  检验密码
*/       
export function validatePass(value) {
          let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
          return !reg.test(value) ?false:true;
        }

/*
  校验验证码
*/
export function validateVCode(value) {
         let reg = /^[a-z0-9]{6}$/;
          return !reg.test(value) ?false:true;
        }


    