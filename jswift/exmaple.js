/********************************************************************** noConflict ***********************************************************************/

///
/// 给该类库重命名（防止命名冲突）
///

// 函数原型
_$.noConflict();

// 调用实例
var Emutil = _$.noConflict();
console.log('parseNumeric: ' + Emutil.parseNumeric('1  2 4,5  6%'));
//输出结果
123456


/********************************************************************** format ***********************************************************************/

///
/// 格式化字符串（可以传入一维数组或者多维数组）
///

// 函数原型
_$.format();

// 调用实例(多维数组)
console.log('Formated:' + _$.format('This is {0} and {1} and {2}', ['first', ['second', 'third']]));
//输出结果
'This is first and second and third'

// 调用实例(一维数组)
console.log('Formated:' + _$.format('This is {0} and {1} and {2}', ['first', 'second', 'third']));
//输出结果
'This is first and second and third'

// 调用实例(直接传参数)
console.log('Formated:' + _$.format('This is {0} and {1} and {2}', 'first', 'second', 'third'));
//输出结果
'This is first and second and third'



/********************************************************************** parseNumeric ***********************************************************************/

///
/// 把字符串转换成数据类型
///

// 函数原型
_$.parseNumeric(obj);

// 调用实例
console.log('parseNumeric: ' + _$.parseNumeric('1  2 4,5  6'));
//输出结果
123456

// 调用实例
console.log('parseNumeric: ' + _$.parseNumeric('1  2 4,5  6%'));
//输出结果
123456



/********************************************************************** equals ***********************************************************************/

///
/// 判断两个对象的值是否相等
///

// 函数原型
_$.equals(first, second);

// 调用实例
console.log('isEqual:' + _$.equals({ key: '151023', name: 'Test', innerJson: { innerKey: '151023', innerName: 'Test' } },
    { key: '151023', name: 'Test', innerJson: { innerKey: '151023', innerName: 'Test' } }));
// 输出结果
true


// 调用实例
console.log('isEqual:' + _$.equals({ key: '151023', name: 'Test', innerJson: { innerKey: 'Test', innerName: 'Test' } },
    { key: '151023', name: 'Test', innerJson: { innerKey: '151023', innerName: 'Test' } }));
// 输出结果
false


/********************************************************************** sort ***********************************************************************/

///
/// 对数组对象进行排序（可以传入多个排序字段）
///

// 函数原型
_$.sort(srcArray, sortType, name, minor);

// 调用实例
var arr = [{ key: '4', name: 'chengbing1', company: 'dongfangcaifu' }, { key: '2', name: 'chengbing2', company: 'dongfangcaifu' },
    { key: '3', name: 'chengbing3', company: 'dongfangcaifu' }, { key: '1', name: 'chengbing4', company: 'dongfangcaifu' }];

// 按照主键和次要键对数组进行排序（升序）
var sortedArr = _$.sort(arr, 1, 'key', 'name');
console.log('sort:' + JSON.stringify(sortedArr));


// 调用实例
var arr = [{ key: '4', name: 'chengbing1', company: 'dongfangcaifu' }, { key: '2', name: 'chengbing2', company: 'dongfangcaifu' },
    { key: '3', name: 'chengbing3', company: 'dongfangcaifu' }, { key: '1', name: 'chengbing4', company: 'dongfangcaifu' }];

// 按照主键和次要键对数组进行排序（降序）
var sortedArr = _$.sort(arr, -1, 'key', 'name');
console.log('sort:' + JSON.stringify(sortedArr));


/********************************************************************** clone ***********************************************************************/

///
/// 拷贝对象（深拷贝）
///

// 函数原型
_$.clone(obj);

// 调用实例
console.log('clone:' + _$.clone({ key: '151023', name: 'Test', innerJson: { innerKey: '151023', innerName: 'Test' } },
    { key: '151023', name: 'Test', innerJson: { innerKey: '151023', innerName: 'Test' } }));
// 输出结果
"{ key: '151023', name: 'Test', innerJson: { innerKey: '151023', innerName: 'Test' } },{ key: '151023', name: 'Test', innerJson: { innerKey: '151023', innerName: 'Test' } }"



/********************************************************************** formatThousandth ***********************************************************************/

///
/// 把千分位的数值类型转换成正常表示方式
///

// 函数原型
_$.formatThousandth(num);

// 调用实例
console.log('formatThousandth: ' + _$.formatThousandth('12345678.123456'));
//输出结果
'12,345,678.123456'

// 调用实例（百分比数字）
console.log('formatThousandth: ' + _$.formatThousandth('12345678.123456%'));
//输出结果
'12,345,678.123456%'


/********************************************************************** unFormatThousandth ***********************************************************************/

///
/// 把千分位的数值类型转换成正常表示方式
///

// 函数原型
_$.unFormatThousandth(num);

// 调用实例
console.log('unFormatThousandth: ' + _$.unFormatThousandth('12,345,678.123456'));
//输出结果
'12345678.123456'

// 调用实例（百分比数字）
console.log('unFormatThousandth: ' + _$.unFormatThousandth('12,345,678.123456%'));
//输出结果
'12345678.123456'



/********************************************************************** formatDateTime ***********************************************************************/

///
/// 对时间类型的数据或者字符串进行格式化
///

// 函数原型
_$.formatDateTime(obj, pattern);

// 调用实例
console.log('formatDateTime: ' + _$.formatDateTime('2012-01-31 09:00:22', 'yyyy/MM/dd hh:mm:ss'));
//输出结果
'2012/01/31 09:00:22'

// 调用实例
console.log('formatDateTime: ' + _$.formatDateTime(new Date(), 'yyyy-MM-dd hh:mm:ss'));
//输出结果
'2016-02-01 13:25:19'



/********************************************************************** decodeUnicodeUrl ***********************************************************************/

///
/// 对带有中文等特殊字符的url进行编码
///

// 函数原型
_$.decodeUnicodeUrl(url);

// 调用实例
console.log('decodeUnicodeUrl: ' + _$.encodeUnicodeUrl('http://www.eastmoney.com/东方财富'));
//输出结果
'http%253A%252F%252Fwww.eastmoney.com%252F%25E4%25B8%259C%25E6%2596%25B9%25E8%25B4%25A2%25E5%25AF%258C'


/********************************************************************** encodeUnicodeUrl ***********************************************************************/

///
/// 对带有中文等特殊字符的url进行解码
///

// 函数原型
_$.encodeUnicodeUrl(url);

// 调用实例
console.log('encodeUnicodeUrl: ' + _$.encodeUnicodeUrl('http%253A%252F%252Fwww.eastmoney.com%252F%25E4%25B8%259C%25E6%2596%25B9%25E8%25B4%25A2%25E5%25AF%258C'));
//输出结果
'http://www.eastmoney.com/东方财富'



/********************************************************************** lTrim ***********************************************************************/

///
/// 删除字符串左边的空格字符
///

// 函数原型
_$.lTrim(obj);

// 调用实例
console.log('lTrim: ' + _$.lTrim('     lTrim Test     '));
//输出结果
'lTrim Test     '


/********************************************************************** rTrim ***********************************************************************/

///
/// 删除字符串右边的空格字符
///

// 函数原型
_$.rTrim(obj);

// 调用实例
console.log('rTrim: ' + _$.rTrim('     rTrim Test     '));
//输出结果
'     rTrim Test'



/********************************************************************** trim ***********************************************************************/

///
/// 删除字符串两边的空格字符
///

// 函数原型
_$.rTrim(obj);

// 调用实例
console.log('trim: ' + _$.rTrim('     trim Test     '));
//输出结果
'trim Test'


/********************************************************************** indexOf ***********************************************************************/

///
/// 1.查找指定元素在数组中第一次出现的位置
/// 2.如果传入fromIndex则指定查找开始位置（如果是负值，则位置为倒数fromeIndex位）
/// 3.EMCSCRIPT 5+ 中包含该函数，为了跨浏览器支持实现之
///

// 函数原型
_$.indexOf(arr, el, fromIndex);

// 调用实例
console.log('indexOf: ' + _$.indexOf([1, 2, 3, 4, 5, 6], 4));
//输出结果
3

// 调用实例
console.log('indexOf: ' + _$.indexOf([1, 2, 3, 4, 5, 6], 3, 2));
//输出结果
3

// 调用实例
console.log('indexOf: ' + _$.indexOf([1, 2, 3, 4, 5, 6], 5));
//输出结果
-1



/********************************************************************** lastIndexOf ***********************************************************************/

///
/// 1.查找指定元素在数组中最后出现的位置
/// 2.如果传入fromIndex则指定查找终止位置（如果是负值，则位置为倒数fromeIndex位）
/// 3.EMCSCRIPT 5+ 中包含该函数，为了跨浏览器支持实现之
///

// 函数原型
_$.lastIndexOf(arr, el, fromIndex);

// 调用实例
console.log('lastIndexOf: ' + _$.lastIndexOf([1, 2, 3, 4, 5, 6], 4));
//输出结果
3

// 调用实例
console.log('lastIndexOf: ' + _$.lastIndexOf([1, 2, 3, 4, 5, 6], 3, 4));
//输出结果
3

// 调用实例
console.log('lastIndexOf: ' + _$.lastIndexOf([1, 2, 3, 4, 5, 6], 2));
//输出结果
-1



/********************************************************************** filter ***********************************************************************/

///
/// 1.从左向右遍历数组中的每个元素并执行callback函数（args用于指定callback函数执行上下文），
///   对数组上的每个元素执行callback函数,并且根据返回结果筛选符合条件的元素（EMCSCRIPT 5+ 中包含该函数）
///   在该工具类中实现该函数是为了支持一些比较旧的浏览器
///

// 函数原型
_$.filter(arr, callback, args);

// 调用实例
console.log('filter: ' + _$.filter([1, 2, 3, 4, 5, 6], function (item, index, arrr) {
    return (item % 2 === 0);
}));
//输出结果
[2, 4, 6]



/********************************************************************** map ***********************************************************************/

///
/// 1.从左向右遍历数组中的每个元素并执行callback函数（args用于指定callback函数执行上下文），
///   对数组上的每个元素执行callback函数返回一个执行操作后的新数组（EMCSCRIPT 5+ 中包含该函数）
///   在该工具类中实现该函数是为了支持一些比较旧的浏览器
///

// 函数原型
_$.map(arr, callback, args);

// 调用实例
console.log('map: ' + _$.map([1, 2, 3, 4, 5, 6], function (item, index, arrr) {
    return (item * 2);
}));
//输出结果
[2, 4, 6, 8, 10, 12]


/********************************************************************** some ***********************************************************************/

///
/// 1.从左向右遍历数组中的每个元素并执行callback函数（args用于指定callback函数执行上下文），
///   当所有的元素都不满足条件是返回false，否则返回true（EMCSCRIPT 5+ 中包含该函数）
///   在该工具类中实现该函数是为了支持一些比较旧的浏览器
///

// 函数原型
_$.some(arr, callback, args);

// 调用实例
console.log('some: ' + _$.some([1, 2, 3, 4, 5, 6], function (item, index, arrr) {
    return (item % 2 === 0);
}));
//输出结果
true

// 调用实例
console.log('some: ' + _$.some([1, 2, 3, 4, 5, 6], function (item, index, arrr) {
    return (item > 6);
}));
//输出结果
false


/********************************************************************** every ***********************************************************************/

///
/// 1.从左向右遍历数组中的每个元素并执行callback函数（args用于指定callback函数执行上下文），
///   当所有的元素都满足条件是返回true，否则返回false（EMCSCRIPT 5+ 中包含该函数）
///   在该工具类中实现该函数是为了支持一些比较旧的浏览器
///

// 函数原型
_$.every(arr, callback, args);

// 调用实例
console.log('every: ' + _$.every([1, 2, 3, 4, 5, 6], function (item, index, arrr) {
    return (item % 2 === 0);
}));
//输出结果
false

// 调用实例
console.log('every: ' + _$.every([1, 2, 3, 4, 5, 6], function (item, index, arrr) {
    return (item > 0);
}));
//输出结果
true





/********************************************************************** reduce ***********************************************************************/


///
/// 1.调用该函数传入一个累加器，同时从左向右遍历数组中的每个元素
///   执行该累加器，最终返回一个值（EMCSCRIPT 5+ 中包含该函数）
///   在该工具类中实现该函数是为了支持一些比较旧的浏览器
///

// 函数原型
_$.reduce(arr, callback, initial);

// 调用实例
console.log('reduce: ' + _$.reduce([1, 2, 3, 4, 5, 6, 7], function (a, b) {
    return a + b;
}));
//输出结果
28

// 调用实例
console.log('reduce: ' + _$.reduce([1, 2, 3, 4, 5, 6, 7], function (a, b) {
    return a + b;
}, 6));
//输出结果
34


/********************************************************************** reduceRight ***********************************************************************/


///
/// 1.调用该函数传入一个累加器，同时从右向左遍历数组中的每个元素
///   执行该累加器，最终返回一个值（EMCSCRIPT 5+ 中包含该函数）
///   在该工具类中实现该函数是为了支持一些比较旧的浏览器
///

// 函数原型
_$.reduceRight(arr, callback, initial);

// 调用实例
console.log('reduceRight: ' + _$.reduceRight([1, 2, 3, 4, 5, 6, 7], function (a, b) {
    return a + b;
}));
//输出结果
28

// 调用实例
console.log('reduceRight: ' + _$.reduceRight([1, 2, 3, 4, 5, 6, 7], function (a, b) {
    return a + b;
}, 6));
//输出结果
34



/********************************************************************** toFixedEx ***********************************************************************/


///
/// 1.将字符串或者数值类型精确到小数后制定位数
/// 2.转换失败使用指定的字符串替换
///

// 函数原型
_$.toFixedEx(obj, decimal, defaultVal);

// 调用实例
console.log('toFixedEx: ' + _$.toFixedEx('1234.56789', 2, '-'));
//输出结果
1234.56

// 调用实例
console.log('toFixedEx: ' + _$.toFixedEx(null, 2, '-'));
//输出结果
'-'


/********************************************************************** startWith ***********************************************************************/

///
/// 1.检查字符串是否以指定的字符串开头
/// 2.字符串中可以同时包含中英文字符
/// 3.可以指定是否区分大小写，默认区分大小写
///

// 函数原型
_$.startWith(obj, pattern, ignoreCase);

// 调用实例
console.log('startWith: ' + _$.startWith('你好 dongfangcaifu', '你好'));
//输出结果
true

// 调用实例
console.log('startWith: ' + _$.startWith('你好 dongfangcaifu', '你好6'));
//输出结果
false


/********************************************************************** endWith ***********************************************************************/


///
/// 1.检查字符串是否以指定的字符串结尾
/// 2.字符串中可以同时包含中英文字符
/// 3.可以指定是否区分大小写，默认区分大小写
///

// 函数原型
_$.endWith(obj, pattern, ignoreCase);

// 调用实例
console.log('endWith: ' + _$.endWith('hello 东方财富 ', '东方财富'));
//输出结果
true;

// 调用实例
console.log('endWith: ' + _$.endWith('hello 东方财富 ', '东方财富3'));
//输出结果
false;



/********************************************************************** flatten ***********************************************************************/


///
/// 1.数组扁平化，将多维数组转换成一维数组
///

// 函数原型
_$.flatten(obj);

// 调用实例
console.log('flatten: ' + _$.flatten([1, 2, [3, [4, 5], 6], 7, [8, 9], 10]));
//输出结果
[1, 2, 3, 4, 5, 6, 7, 8, 9];



/********************************************************************** each | forEach ***********************************************************************/


///
/// 遍历数组，对数组上的每个元素执行指定操作
///

// 函数原型
_$.each(obj, callback, args) | _$.forEach(obj, callback, args);

// 调用实例
console.log(_$.each(['First', 'Second', 'Third'], function (index, value) {
    console.log('index:' + index + ' value:' + value);
}));
//输出结果
'index:0 value:First'
'index:1: value:Second'
'index:2: value:Third'


/********************************************************************** keys ***********************************************************************/

///
/// 获取给定JSON对象的所有Key值(不在原型链中查找)
///

// 函数原型
_$.keys(obj);

// 调用实例
console.log('keys:' + _$.keys({ key: '151023', name: 'Test' }));
//输出结果
['key','name']



/********************************************************************** has ***********************************************************************/

///
/// 判断指定JSON对象中是否包含指定的Key
///

// 函数原型
_$.has(obj, key);

// 调用实例
console.log('hasKey:' + _$.has({ key: '151023', name: 'chengbing' }, 'name'));
//输出结果
true

// 调用实例
console.log('hasKey:' + _$.has({ key: '151023', name: 'chengbing' }, 'name6'));
//输出结果
false



/********************************************************************** isObject ***********************************************************************/

///
/// 判断给定变量是否为Object类型
///

// 函数原型
_$.isObject(obj);

// 调用实例
console.log('isObject:' + _$.isObject({ key: '151023', name: 'Test' }));
//输出结果
true

// 调用实例
console.log('isObject:' + _$.isObject('6543'));
//输出结果
false



/********************************************************************** isString ***********************************************************************/

///
/// 判断给定变量是否为String类型
///

// 函数原型
_$.isString(obj);

// 调用实例
console.log('isString:' + _$.isString('6543'));
//输出结果
true

// 调用实例
console.log('isString:' + _$.isObject({ key: '151023', name: 'Test' }));
//输出结果
false



/********************************************************************** isArray ***********************************************************************/

///
/// 判断给定变量是否为Array类型
///

// 函数原型
_$.isArray(obj);

// 调用实例
console.log('isArray:' + _$.isArray([1, 2, 3, 4, 5, 6]));
//输出结果
true

// 调用实例
console.log('isArray:' + _$.isArray({ key: '151023', name: 'Test' }));
//输出结果
false



/********************************************************************** isFinite ***********************************************************************/

///
/// 判断给定变量是否为Finite类型
///

// 函数原型
_$.isFinite(obj);

// 调用实例
console.log('isFinite:' + _$.isFinite(6666));
//输出结果
true



/********************************************************************** isNumeric ***********************************************************************/

///
/// 判断给定变量是否为数值类型或者数值类型的字符串
///

// 函数原型
_$.isNumeric(obj);

// 调用实例
console.log('isNumeric:' + _$.isNumeric(6666));
//输出结果
true

// 调用实例
console.log('isNumeric:' + _$.isNumeric('6666'));
//输出结果
true

// 调用实例
console.log('isNumeric:' + _$.isNumeric('xxxxxx'));
//输出结果
false


/********************************************************************** isNaN ***********************************************************************/

///
/// 判断给定变量是否为NaN类型
///

// 函数原型
_$.isNaN(obj);

// 调用实例
console.log('isNaN:' + _$.isNaN(Number.NaN));
//输出结果
true

// 调用实例
console.log('isNaN:' + _$.isNaN(6666));
//输出结果
false


/********************************************************************** isBoolean ***********************************************************************/

///
/// 判断给定变量是否为Bool类型
///

// 函数原型
_$.isBoolean(obj);

// 调用实例
console.log('isBoolean:' + _$.isBoolean(true));
//输出结果
true

// 调用实例
console.log('isBoolean:' + _$.isBoolean(6666));
//输出结果
false


/********************************************************************** isNull ***********************************************************************/

///
/// 判断给定变量是否为Null类型
///

// 函数原型
_$.isNull(obj);

// 调用实例
console.log('isNull:' + _$.isNull(null));
//输出结果
true

// 调用实例
console.log('isNull:' + _$.isNull(6666));
//输出结果
false



/********************************************************************** isUndefined ***********************************************************************/

///
/// 判断给定变量是否为undefined类型
///

// 函数原型
_$.isUndefined(obj);

// 调用实例
console.log('isUndefined:' + _$.isUndefined(undefined));
//输出结果
true

// 调用实例
console.log('isUndefined:' + _$.isUndefined(void 0));
//输出结果
true

// 调用实例
console.log('isUndefined:' + _$.isUndefined());
//输出结果
true

// 调用实例
console.log('isUndefined:' + _$.isUndefined(6666));
//输出结果
false