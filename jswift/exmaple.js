
// 判断两个变量是否严格相等
console.log('isEqual:' + _$.equals({ key: '151023', name: 'Test', innerJson: { innerKey: '151023', innerName: 'Test' } },
    { key: '151023', name: 'Test', innerJson: { innerKey: '151023', innerName: 'Test' } }));

// 把字符串转换成数据类型
console.log('parseNumeric:' + _$.parseNumeric('1  2 4,5  6'));

// 拷贝Json串，深拷贝
console.log('clone:' + JSON.stringify(_$.clone({ key: '151023', name: 'Test', innerJson: { innerKey: '151023', innerName: 'Test' } })));

var arr = [{ key: '4', name: 'chengbing1', company: 'dongfangcaifu' }, { key: '2', name: 'chengbing2', company: 'dongfangcaifu' },
    { key: '3', name: 'chengbing3', company: 'dongfangcaifu' }, { key: '1', name: 'chengbing4', company: 'dongfangcaifu' }];

// 按照主键和次要键对数组进行排序
var sortedArr = _$.sort(arr, 1, 'key', 'name');

console.log('sort:' + JSON.stringify(sortedArr));

// 格式化字符串
console.log('Formated:' + _$.format('This is {0} and {1} and {2}', ['first', ['second', 'third']]));

// 获取对象中所有的keys
console.log('keys:' + _$.keys({ key: '151023', name: 'chengbing' }));

// 判断对象中是否包含指定key
console.log('hasKey:' + _$.has({ key: '151023', name: 'chengbing' }, 'name'));

// 判断变量是否为Object
console.log('isObject:' + _$.isObject({}));

// 判断变量是否为String
console.log('isString:' + _$.isString('This is string'));

// 判断变量是否为Array
console.log('isArray:' + _$.isArray(['First', 'Second', 'Third']));

// 判断变量是否为Finite数据
console.log('isFinite:' + _$.isFinite(6666));

// 判断变量是否为数值
console.log('isNumeric:' + _$.isNumeric('6666'));

// 判断变量是否不是数值
console.log('isNaN:' + _$.isNaN(Number.NaN));

// 判断变量是否为Bool类型
console.log('isBoolean:' + _$.isBoolean(true));

// 判断变量是否为空
console.log('isNull:' + _$.isNull(null));

// 判断变量是否未定义
console.log('isUndefined:' + _$.isUndefined(undefined));


// 遍历数组，并对数组中每个元素执行指定操作
console.log(_$.each(['First', 'Second', 'Third'], function (index, value) {
    console.log('index:' + index + ' value:' + value);
}));

// 删除字符串左边空格
console.log('lTrim:' + _$.ltrim('   Test String     '));

// 删除字符串右边空格
console.log('rTrim:' + _$.rtrim('   Test String     '));

// 删除字符串两边空格
console.log('trim:' + _$.trim('   Test String     ') + 'Right');

// 把数字以千分位格式表示
console.log('formatThousandth:' + _$.formatThousandth('12345678.123456'));

// 把千分位数字转换成正常数据表示方式
console.log('unFormatThousandth:' + _$.unFormatThousandth('12,345,678.123456%'));

// 把时间格式化成指定格式
console.log('formatDateTime:' + _$.formatDateTime('2012-01-31 09:00:22', 'yyyy/MM/dd hh:mm:ss'));

// 对包含中文字符的url进行编码
console.log('encodeUnicodeUrl:' + _$.encodeUnicodeUrl('http://www.eastmoney.com/东方财富'));

// 对编码后的url进行解码
console.log('decodeUnicodeUrl:' + _$.decodeUnicodeUrl('http%253A%252F%252Fwww.eastmoney.com%252F%25E4%25B8%259C%25E6%2596%25B9%25E8%25B4%25A2%25E5%25AF%258C'));

// 在数组中从指定位置查找第一次出现的指定的元素
console.log('indexOf: ' + _$.indexOf([1, 2, 3, 4, 5, 6], 4, 2));

// 在数组中从指定位置查找最后一次出现的指定的元素
console.log('lastIndexOf: ' + _$.lastIndexOf([1, 2, 3, 4, 5, 6], 5, 2));
