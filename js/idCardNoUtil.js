/**
 * 根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
 *    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
 *    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
 *    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
 *    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。
 *
 * 出生日期计算方法。
 *    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
 *    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
 * 
 * 下面是正则表达式:
 * 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
 * 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
 * 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 * 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
 * 
 * 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
 *               公式(1)中： 
 *               i----表示号码字符从由至左包括校验码在内的位置序号； 
 *               ai----表示第i位置上的号码字符值； 
 *               Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
 *               i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
 *               Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
 * 
 * 身份证号合法性验证 
 * 支持15位和18位身份证号
 * 支持地址编码、出生日期、校验位验证
 */

class idCardNoUtil {
  /** 省,直辖市代码表 */
  provinceAndCitys = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",

    21: "辽宁",
    22: "吉林",
    23: "黑龙江",

    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",

    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",

    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",

    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",

    71: "台湾",

    81: "香港",
    82: "澳门",

    91: "国外"
  }

  /** 每位加权因子 */
  powers = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

  /** 第18位校检码 */
  parityBit = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

  /** 性别 */
  genders = { male: "男", female: "女" };

  /**
   * 校验地址码
   * @param {String} addressCode
   */
  checkAddressCode(addressCode) {
    return !/^[1-9]\d{5}$/.test(addressCode) ? false : !!this.provinceAndCitys[parseInt(addressCode.substring(0, 2))];
  }

  /** 
   * 校验日期码
   * @param {String} birDayCode 身份证第7到14位
   */
  checkBirthDayCode(birDayCode) {
    if (!/^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode)) return false;
    let yyyy = parseInt(birDayCode.substring(0, 4), 10);
    let mm = parseInt(birDayCode.substring(4, 6), 10);
    let dd = parseInt(birDayCode.substring(6), 10);
    let xdata = new Date(yyyy, mm - 1, dd);
    return xdata > new Date() ? false : xdata.getFullYear() == yyyy && xdata.getMonth() == mm - 1 && xdata.getDate() == dd;
  }

  /** 
   * 计算校检码
   * @param {String} idCardNo
   */
  getParityBit(idCardNo) {
    let id17 = idCardNo.substring(0, 17);
    /** 加权 */
    let power = 0;
    for (let i = 0; i < 17; i++)
      power += parseInt(id17.charAt(i), 10) * parseInt(this.powers[i]);
    return this.parityBit[power % 11];
  }

  /** 
   * 验证校检码
   * @param {String} idCardNo
   */
  checkParityBit(idCardNo) {
    return this.getParityBit(idCardNo) == idCardNo.charAt(17).toUpperCase();
  }

  /** 
   * 校验15位或18位的身份证号码
   * @param {String} idCardNo
   */
  checkIdCardNo(idCardNo) {
    //15位和18位身份证号码的基本校验
    if (!/^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo)) return false;
    //判断长度为15位或18位 
    switch (idCardNo.length) {
      case 15: return this.check15IdCardNo(idCardNo);
      case 18: return this.check18IdCardNo(idCardNo);
      default: return false;
    }
  }

  /**
   * 校验15位的身份证号码
   * @param {String} idCardNo 
   */
  check15IdCardNo(idCardNo) {
    // 15位身份证号码的基本校验
    if (!/^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo)) return false;
    // 校验地址码
    if (!this.checkAddressCode(idCardNo.substring(0, 6))) return false;
    // 校验日期码
    return this.checkBirthDayCode(`19${idCardNo.substring(6, 12)}`);
  }

  /**
   * 校验18位的身份证号码
   * @param {String} idCardNo 
   */
  check18IdCardNo(idCardNo) {
    // 18位身份证号码的基本格式校验
    if (!/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo)) return false;
    // 校验地址码
    if (!this.checkAddressCode(idCardNo.substring(0, 6))) return false;
    // 校验日期码
    if (!this.checkBirthDayCode(idCardNo.substring(6, 14))) return false;
    // 验证校检码
    return this.checkParityBit(idCardNo);
  }

  /**
   * 日期
   * @param {String} day 
   */
  formateDateCN(day) {
    return `${day.substring(0, 4)}-${day.substring(4, 6)}-${day.substring(6)}`;
  }

  /**
   * 获取信息
   * @param {String} idCardNo 
   */
  getIdCardInfo(idCardNo) {
    switch (idCardNo.length) {
      case 15: return {
        /** 出生日期(yyyy-mm-dd) */
        birthday: this.formateDateCN(`19${idCardNo.substring(6, 12)}`),
        /** 性别 */
        gender: parseInt(idCardNo.charAt(14)) % 2 == 0 ? this.genders.female : this.genders.male
      };
      case 18: return {
        /** 出生日期(yyyy-mm-dd) */
        birthday: this.formateDateCN(idCardNo.substring(6, 14)),
        /** 性别 */
        gender: parseInt(idCardNo.charAt(16)) % 2 == 0 ? this.genders.female : this.genders.male
      };
    }
  }

  /**
   * 18位转15位
   * @param {String} idCardNo
   */
  getId15(idCardNo) {
    switch (idCardNo.length) {
      case 15: return idCardNo;
      case 18: return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
      default: return null;
    }
  }

  /**
   * 15位转18位
   * @param {String} idCardNo
   */
  getId18(idCardNo) {
    switch (idCardNo.length) {
      case 15:
        let id17 = `${idCardNo.substring(0, 6)}19${idCardNo.substring(6)}`;
        return id17 + this.getParityBit(id17);
      case 18:
        return idCardNo;
      default:
        return null;
    }
  }
};