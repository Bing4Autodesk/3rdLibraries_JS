/**
 * jswift.js
 *
 * @fileoverview  a javascript library for dev to use.
 * @link          
 * @author        Cheng Bing (chengbing@eastmoney.com)
 * @requires      
 * 
 * 
 */
(function (window, document, undefined) {

    //  Regular expression for date-time string
        //  2016-01-29 14:28:28 || 2016-01-29
    var regMinusDateTime = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) ((?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9])?$/,
        //  2016/01/29 14:28:28 || 2016/01/29
        regSlashDateTime = /^(?:19|20)[0-9][0-9]\/(?:(?:0[1-9])|(?:1[0-2]))\/(?:(?:[0-2][1-9])|(?:[1-3][0-1])) ((?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9])?$/;


    // Save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

    // Create quick reference variables for speed access to core prototypes.
    var
      push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    var
      nativeIsArray      = Array.isArray,
      nativeKeys         = Object.keys,
      nativeBind         = FuncProto.bind,
      nativeCreate       = Object.create;


    var nativeIndexOf           = ArrayProto.indexOf,
        nativeLastIndexOf       = ArrayProto.lastIndexOf,
        nativeForEach           = ArrayProto.forEach,
        nativeEvery             = ArrayProto.every,
        nativeSome              = ArrayProto.some,
        nativeFilter            = ArrayProto.filter,
        nativeMap               = ArrayProto.map,
        nativeReduce            = ArrayProto.reduce,
        nativeReduceRight       = ArrayProto.reduceRight;

    

    var previousSwift = window._$;

    var _$ = function (obj) {
        /// <summary>
        /// Create a safe reference to the jSwift object for use below
        /// </summary>
        /// <param name="obj"></param>
        if (obj instanceof _$) {
            return obj;
        }
        if (!(this instanceof _$)) {
            return new _$(obj);
        }
        this._wrapped = obj;
    };

    // Current version
    _$.version = '1.0.0';

    window._$ = _$;

    // It is used to debug performance of js code
    var Timer = {
        _data: {},

        start: function (key) {
            Timer._data[key] = new Date();
        },

        stop: function (key) {
            var time = Timer._data[key];
            if (time) {
                Timer._data[key] = new Date() - time;
            }
        },

        getTime: function (key) {

            return Timer._data[key];
        }
    };

    window.Timer = Timer;

    if (typeof Array.prototype.contains !== 'function') {
        Array.prototype.contains = function (item) {
            /// <summary>
            /// Check whether if contains item
            /// </summary>
            /// <param name="item"></param>
            for (i = 0; i < this.length; i++) {
                if (this[i] == item) {
                    return true;
                }
            }
            return false;
        };
    }


    if (typeof String.prototype.format !== 'function') {
        String.prototype.format = function () {
            /// <summary>
            /// Format string
            /// </summary>
            var args = arguments;
            return this.replace(/\{(\d+)\}/g,
                function (m, i) {
                    return args[i];
                });
        };
    }

    function isArraylike(obj) {
        /// <summary>
        /// Check whether the given obj is like array
        /// </summary>
        /// <param name="obj"></param>

        var length = ("length" in obj && obj.length), type = typeof obj;

        var isWindow = (function (obj) {
            return obj != null && obj === obj.window;
        })(obj);

        if (type === "function" || isWindow) {
            return false;
        }

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ((length - 1) in obj);
    }

    function toOneDimensionArray(obj) {
        /// <summary>
        /// Convert multi-dimensional array to one-dimensional array
        /// </summary>
        /// <param name="obj"></param>

        var rArray = [];

        if (!_$.isArray(obj)) {
            rArray.push(obj);

            return rArray;
        }

        for (var index = 0, len = obj.length; index < len; index++) {
            var item = obj[index];

            if (!_$.isArray(item)) {
                rArray.splice(rArray.length, 0, item);
            }
            else {
                var tArray = toOneDimensionArray(item);
                for (var index2 = 0, len2 = tArray.length; index2 < len2; index2++) {
                    rArray.splice(rArray.length, 0, tArray[index2]);
                }
            }
        }

        return rArray;
    }

    _$.each = function (obj, callback, args) {
        /// <summary>
        /// Traversing array and call specified function 
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="callback"></param>
        /// <param name="args"></param>
        var value, i = 0, length = obj.length, isArray = isArraylike(obj);

        if (args) {
            if (isArray) {
                for (; i < length; i++) {
                    value = callback.apply(obj[i], args);

                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.apply(obj[i], args);

                    if (value === false) {
                        break;
                    }
                }
            }

            // A special, fast, case for the most common use of each
        } else {
            if (isArray) {
                for (; i < length; i++) {
                    value = callback.call(obj[i], i, obj[i]);

                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.call(obj[i], i, obj[i]);

                    if (value === false) {
                        break;
                    }
                }
            }
        }

        return obj;
    },

    _$.clone = function (obj) {
        /// <summary>
        /// Copy given object variable deeply
        /// </summary>
        /// <param name="obj"></param>

        if (!obj || !_$.isObject(obj)) {
            return obj;
        }
        if (_$.isArray(obj)) {
            return obj.slice();
        }

        var copy = {};
        for (attr in obj) {
            if (!obj.hasOwnProperty(attr)) {
                continue;
            }
            copy[attr] = (typeof obj[attr] == "object") ? clone(obj[attr]) : obj[attr];
        }
        return copy;
    };

    _$.equals = function (first, second) {
        /// <summary>
        /// Compare whether the two objects are equal
        /// </summary>
        /// <param name="first"></param>
        /// <param name="second"></param>

        // If both first and second are null or undefined and exactly the same
        if (first === second) {
            return true;
        }
        // If they are not strictly equal, they both need to be Objects
        if (!(first instanceof Object) || !(second instanceof Object)) {
            return false;
        }
        // They must have the exact same prototype chain, the closest we can do is
        // test the constructor.
        if (first.constructor !== second.constructor) {
            return false;
        }
        for (var p in first) {
            // Inherited properties were tested using first.constructor === second.constructor
            if (first.hasOwnProperty(p)) {
                // Allows comparing first[ p ] and second[ p ] when set to undefined
                if (!second.hasOwnProperty(p)) {
                    return false;
                }
                // If they have the same strict value or identity then they are equal
                if (first[p] === second[p]) {
                    continue;
                }
                // Numbers, Strings, Functions, Booleans must be strictly equal
                if (typeof (first[p]) !== "object") {
                    return false;
                }
                // Objects and Arrays must be tested recursively
                if (!_$.equals(first[p], second[p])) {
                    return false;
                }
            }
        }
        for (p in second) {
            // allows first[ p ] to be set to undefined
            if (second.hasOwnProperty(p) && !first.hasOwnProperty(p)) {
                return false;
            }
        }
        return true;
    };


    // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
    _$.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (index, name) {

        _$['is' + name] = function (obj) {
            /// <summary>
            /// Check the given variable is specified type
            /// </summary>
            /// <param name="obj"></param>
            if (_$.isUndefined(obj) || _$.isNull(obj)) {
                return false;
            }

            return toString.call(obj) === '[object ' + name + ']';
        };
    });

    _$.isNumeric = function (num) {
        /// <summary>
        /// Check if num is numeric
        /// </summary>
        /// <param name="num"></param>
        if (_$.isUndefined(num) || _$.isNull(num)) {
            return false;
        }

        if (typeof num === 'number') {
            return true;
        }

        return /^(-)?\d+(\.\d*)?$/.test(num);
    };

    _$.isDateTime = function (obj) {
        /// <summary>
        /// Check whether the given variable is date-time or date-time formated string
        /// </summary>
        /// <param name="obj"></param>

        if (_$.isUndefined(obj) || _$.isNull(obj)) {
            return false;
        }

        if (_$.isDate(obj)) {
            return true;
        }
        if (!_$.isString(obj)) {
            return false;
        }
        if (regMinusDateTime.test(obj) || regSlashDateTime.test(obj)) {
            return true;
        }

        return false;

    };

    _$.parseNumeric = function (obj) {
        /// <summary>
        /// Parse object from string to float number
        /// Exclude character , and last character % 
        /// </summary>
        /// <param name="obj"></param>

        if (typeof obj === 'number') {
            return obj;
        }

        if (typeof obj === 'string') {
            var temp = obj.replace(/,|[ ]/gi, '').replace(/%$/, '');
            if (!_$.isNumeric(temp)) {
                return Number.NaN;
            }
            return parseFloat(temp);
        }

        return obj;
    };

    _$.parseDateTime = function (obj) {
        /// <summary>
        /// Parse a given object to a date-time variable
        /// </summary>
        /// <param name="obj"></param>
        if (_$.isDate(obj)) {
            // if it is date-time variable
            return obj;
        }
        if (!_$.isDateTime(obj)) {
            // if it is not a date-time or date-time formated string
            return obj;
        }

        return new Date(obj.replace(/-/gi, '/'));
    };

    _$.formatDateTime = function (obj, pattern) {
        /// <summary>
        /// Formate date-time or date-time string to specified pattern
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="pattern"></param>

        if (!_$.isDateTime(obj)) {
            return obj;
        }

        var dateObj = _$.parseDateTime(obj);

        var o = {
            "M+": dateObj.getMonth() + 1,
            "d+": dateObj.getDate(),
            "h+": dateObj.getHours(),
            "m+": dateObj.getMinutes(),
            "s+": dateObj.getSeconds(),
            "q+": Math.floor((dateObj.getMonth() + 3) / 3),
            "S": dateObj.getMilliseconds()
        };

        if (/(y+)/.test(pattern)) {
            pattern = pattern.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(pattern)) {
                pattern = pattern.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        } 
        return pattern;

    };

    _$.formatThousandth = function (num) {
        /// <summary>
        /// Format a given num in thousandth
        /// </summary>
        /// <param name="num"></param>
        if (_$.isUndefined(num) || _$.isNull(num)) {
            return num
        }
        var parsedNum = _$.parseNumeric(num);
        if (_$.isNaN(parsedNum)) {
            return num;
        }

        var numstring = parsedNum.toString(), regFloat = /^.*\..*$/,
            index = numstring.indexOf("."), reg = /(-?\d+)(\d{3})/;

        if (!regFloat.test(numstring)) {
            while (reg.test(numstring)) {
                numstring = numstring.replace(reg, "$1,$2");
            }
            return numstring;
        }
        else {
            var stringOfInt = numstring.substring(0, index),
                stringOfPoint = numstring.substring(index + 1, numstring.length);

            while (reg.test(stringOfInt)) {
                stringOfInt = stringOfInt.replace(reg, "$1,$2");
            }
            return stringOfInt + "." + stringOfPoint;
        }
    };

    _$.unFormatThousandth = function (num) {
        /// <summary>
        /// Convert a given num from thousandth to normal formated
        /// </summary>
        /// <param name="num"></param>

        if (_$.isUndefined(num) || _$.isNull(num)) {
            return num
        }
        var parsedNum = _$.parseNumeric(num), regEnd = /%$/;
        if (_$.isNaN(parsedNum)) {
            return num;
        }
        else {
            return (regEnd.test(num)) ? parsedNum + '%' : parsedNum;
        }
    };


    _$.isArray = nativeIsArray || function (obj) {
        /// <summary>
        /// Check whether obj is Array
        /// </summary>
        /// <param name="obj"></param>
        return toString.call(obj) === '[object Array]';
    };

    _$.isObject = function (obj) {
        /// <summary>
        /// Check whether the given variable is an object
        /// </summary>
        /// <param name="obj"></param>
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    _$.isFinite = function (obj) {
        /// <summary>
        /// Check whether the given variable is a finite number
        /// </summary>
        /// <param name="obj"></param>
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };

    _$.isNaN = function (obj) {
        /// <summary>
        /// Check whethe the given variable is NaN
        /// (NaN is the only number which does not equal itself)
        /// </summary>
        /// <param name="obj"></param>
        return _$.isNumber(obj) && obj !== +obj;
    };


    _$.isBoolean = function (obj) {
        /// <summary>
        /// Check whethe the given variable is a boolen
        /// </summary>
        /// <param name="obj"></param>
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };

    _$.isNull = function (obj) {
        /// <summary>
        /// Check whether given variable equals null exactly
        /// </summary>
        /// <param name="obj"></param>
        return obj === null;
    };

    _$.isUndefined = function (obj) {
        /// <summary>
        /// Check whethe the given variable is undefined
        /// </summary>
        /// <param name="obj"></param>
        return obj === undefined;
    };

    _$.has = function (obj, key) {
        /// <summary>
        /// Check if the given object has a given property directly on itself not on a prototype 
        /// </summary>
        /// <param name="obj"></param>
        /// <param name="key"></param>
        return obj != null && hasOwnProperty.call(obj, key);
    };

    /*	

    排序函数使用实例	
    var s=[{first:'Joe',last:'Besser'},{first:'Moe',last:'Howard'},
		    {first:'Joe',last:'DeRita'},{first:'Shemp',last:'Howard'},
		    {first:'Larry',last:'Fine'},{first:'Curly',last:'Howard'}];		
    var result=s.sort(asc('last',asc('first')));

    */

    var asc = function (name, minor) {
        /// <summary>
        /// Warpper a sorting function by asc
        /// </summary>
        /// <param name="name">Primary sorted name</param>
        /// <param name="minor">Second sorted name</param>
        return function (o, p) {
            var a, b;
            if (o && p && typeof o === 'object' && typeof p === 'object') {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return typeof minor === 'function' ? minor(o, p) : 0;
                }
                if (typeof a == typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            }
            else {
                throw {
                    name: 'Error',
                    messge: 'Excepted an object when sorting by ' + name
                }
            }
        }
    };

    var desc = function (name, minor) {
        /// <summary>
        /// Warpper a sorting function by desc
        /// </summary>
        /// <param name="name">Primary sorted name</param>
        /// <param name="minor">Second sorted name</param>
        return function (o, p) {
            var a, b;
            if (o && p && typeof o === 'object' && typeof p === 'object') {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return typeof minor === 'function' ? minor(o, p) : 0;
                }
                if (typeof a == typeof b) {
                    return a > b ? -1 : 1;
                }
                return typeof a > typeof b ? -1 : 1;
            }
            else {
                throw {
                    name: 'Error',
                    messge: 'Excepted an object when sorting by ' + name
                }
            }
        }
    };

    var Enum4Sort = {
        // default status
        DEFAULT: 0,
        // asc status
        ASC: 1,
        // desc status
        DESC: -1
    };

    _$.sort = function (srcArray, sortType, name, minor) {
        /// <summary>
        /// Sort srcArray in ascending || descending order
        /// </summary>
        /// <param name="srcArray">Source array to be sorted</param>
        /// <param name="sortType">Order type</param>
        /// <param name="name">Primary key</param>
        /// <param name="minor">Secondary key</param>
        sortType = sortType || Enum4Sort.DEFAULT;

        if (!_$.isArray(srcArray)) {
            return srcArray;
        }

        if (arguments.length === 3) {
            return srcArray.sort((sortType === Enum4Sort.DESC) ? desc(name) : asc(name));
        }
        else if (arguments.length > 3) {
            return srcArray.sort((sortType === Enum4Sort.DESC) ? desc(name, desc(minor)) : asc(name, asc(minor)));
        }
        else {
            throw {
                name: 'Error',
                messge: (arguments.length > 3) ? 'Excepted an object when sorting by ' + name + ' and ' + minor : 'Excepted an object when sorting by ' + name
            }
        }
    };

    _$.keys = Object.keys || function (obj) {
        /// <summary>
        /// Get keys of this given variable
        /// </summary>
        /// <param name="obj"></param>
        var result = [];

        if (!_$.isObject(obj)) {
            return [];
        }

        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }
            result.push(prop);
        }
        return result;
    };


    _$.ltrim = function (obj) {
        /// <summary>
        /// Delete left end space characters of the given string
        /// </summary>
        /// <param name="obj"></param>
        if (!_$.isString(obj)) {
            return obj;
        }

        return obj.replace(/(^\s*)/g, '');
    };

    _$.rtrim = function (obj) {
        /// <summary>
        /// Delete the right end space characters of the given string
        /// </summary>
        /// <param name="obj"></param>
        if (!_$.isString(obj)) {
            return obj;
        }

        return obj.replace(/(\s*$)/g, '');
    };

    _$.trim = function (obj) {
        /// <summary>
        /// Delete the both ends space characters of the given string
        /// </summary>
        /// <param name="obj"></param>
        if (!_$.isString(obj)) {
            return obj;
        }
        return obj.replace(/(^\s*)|(\s*$)/g, '');
    };

    _$.format = function () {
        /// <summary>
        /// Fomat a given string variable
        /// </summary>
        if (arguments.length <= 1) {
            return arguments[0];
        }

        var obj = arguments[0], args = slice.call(arguments, 1);

        var formatArgs = toOneDimensionArray(args);

        return obj.replace(/\{(\d+)\}/g,
            function (m, i) {
                return formatArgs[i];
            });
    };

    _$.encodeUnicodeUrl = function (url) {
        /// <summary>
        /// Encode the given url with chinese characters
        /// </summary>
        /// <param name="url"></param>

        return encodeURIComponent(encodeURIComponent(url));
    };

    _$.decodeUnicodeUrl = function (url) {
        /// <summary>
        /// Decode the given url with chinese characters
        /// </summary>
        /// <param name="url"></param>

        return decodeURIComponent(decodeURIComponent(url));
    };

    _$.indexOf = function (arr, el, fromIndex) {
        /// <summary>
        /// Search index of the given element in the specified array
        /// </summary>
        /// <param name="arr"></param>
        /// <param name="el"></param>
        /// <param name="startIndex"></param>

        arr = arr || [];
        fromIndex = +fromIndex || 0;
        
        var len = arr.length, n = 0;

        if (!_$.isArray(arr) || fromIndex > len) {
            return -1;
        }

        if (nativeIndexOf) {
            return nativeIndexOf.call(arr, el, fromIndex);
        }

        n = Math.abs(fromIndex) === Infinity ? fromIndex : 0;
        n = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        while (n < len) {
            if (arr[n] === el) {
                return n;
            }
            n++;
        }

        return -1;
    };

    _$.lastIndexOf = function (arr, el, fromIndex) {
        /// <summary>
        /// Seach the index of given element of the specified array
        /// </summary>
        /// <param name="arr"></param>
        /// <param name="el"></param>
        /// <param name="fromIndex"></param>
        arr = arr || [];
        var len = arr.length, n = 0;

        if (fromIndex != 0) {
            n = +fromIndex || len-1;
        }
        n = max(n >= 0 ? n : len - Math.abs(n), 0);

        if (!_$.isArray(arr) || n === 0) {
            return -1;
        }

        if (nativeLastIndexOf) {
            return nativeLastIndexOf.call(arr, el, fromIndex);
        }

        while (n >= 0) {
            if (arr[n] === el) {
                return n;
            }
            n--;
        }
        return -1; 
    };

    _$.forEach = function (arr, callback, args) {
        /// <summary>
        /// Traversing the given array and call the callback function for each element
        /// </summary>
        /// <param name="arr"></param>
        /// <param name="callback"></param>
        /// <param name="args"></param>

        arr = arr || [];
        if (!_$.isArray(arr)) {
            arr = [arr];
        }
        if (!_$.isUndefined(callback) || _$.isNull(callback) || !_$.isFunction(callback)) {
            return;
        }
        if (nativeForEach) {
            nativeForEach.call(arr, callback, args);
        }
        _$.each(arr, callback, args);
    };


    _$.filter = function (arr, callback, args) {
        /// <summary>
        /// Filter the given array according to specified function
        /// </summary>
        /// <param name="arr"></param>
        /// <param name="callback"></param>
        /// <param name="args"></param>

        arr = arr || [];
        if (!_$.isArray(arr)) {
            arr = [arr];
        }
        if (!_$.isUndefined(callback) || _$.isNull(callback) || !_$.isFunction(callback)) {
            return arr;
        }

        if (nativeFilter) {
            return nativeFilter.call(arr, callback, args);
        }
        
        var result = [];
        for (var index = 0, len = arr.length; index < len; index++) {

            if (callback.call(arg, arr[index], index, arr)) {
                result.push(arr[index]);
            }
        }

        return result;

    };

    _$.map = function (arr, callback, args) {
        /// <summary>
        /// Create a new array with the results of calling a provided function on every element in the  given array
        /// </summary>
        /// <param name="arr"></param>
        /// <param name="callback"></param>
        /// <param name="args"></param>
        arr = arr || [];
        if (!_$.isArray(arr)) {
            arr = [arr];
        }
        var result = [];

        if (!_$.isUndefined(callback) || _$.isNull(callback) || !_$.isFunction(callback)) {
            return _$.clone(arr);
        }

        if (nativeMap) {
            return nativeMap.call(arr, callback, args);
        }

        for (var index = 0, len = arr.length; index < len; index++) {
            var mappedValue = callback.call(args, arr[index], index, arr);
            result.push(mappedValue);
        }

        return result;

    };

    _$.some = function (arr, callback, args) {
        /// <summary>
        /// Check whether some element in the array passses
        /// the test implemented by the provided function
        /// </summary>
        /// <param name="arr"></param>
        /// <param name="callback"></param>
        /// <param name="args"></param>

        arr = arr || [];
        if (!_$.isArray(arr)) {
            arr = [arr];
        }
        if (!_$.isUndefined(callback) || _$.isNull(callback) || !_$.isFunction(callback)) {
            return false;
        }

        if (nativeSome) {
            return nativeSome.call(arr, call, args);
        }

        for (var index = 0, len = arr.length; index < len; index++) {
            if (callback.call(args, arr[index], index, arr)) {
                return true;
            }
        }

    };

    _$.every = function (arr, callback, args) {
        /// <summary>
        /// Check whether all the elements in the array pass
        /// the test implemented by the provided function
        /// </summary>
        /// <param name="arr"></param>
        /// <param name="callback"></param>
        /// <param name="args"></param>

        arr = arr || [];
        if (!_$.isArray(arr)) {
            arr = [arr];
        }
        if (!_$.isUndefined(callback) || _$.isNull(callback) || !_$.isFunction(callback)) {
            return false;
        }
        if (nativeEvery) {
            return nativeEvery.call(arr, callback, args);
        }

        for (var index = 0, len = arr.length; index < len; index++) {
            if (!callback.call(args, arr[index], index, arr)) {
                return false;
            }
        }

        return true;

    };


    _$.reduce = function (arr, callback, initial) {
        /// <summary>
        /// Apply a function against an accumulator and each value of the array 
        /// (from left to right) to reduce it to a single value
        /// </summary>
        /// <param name="arr"></param>
        /// <param name="callback"></param>
        /// <param name="initial"></param>

        arr = arr || [];
        if (!_$.isArray(arr)) {
            arr = [arr];
        }

        var index = 0, result = (arguments.length >= 3) ? initial : arr[index++];

        if (!_$.isUndefined(callback) || !_$.isFunction(callback) || arr.length <= 0) {
            return null;
        }

        if (nativeReduce) {
            return nativeReduce.call(arr, callback, initial);
        }

        for (var len = arr.length; index < len; index++) {
            result = callback(result, arr[index], index, arr);
        }

        return result;
       
    };

    _$.reduceRight = function (arr, callback, initial) {
        /// <summary>
        /// Apply a function against an accumulator and each value of the array
        /// (from right to left) to reduce it to a single value 
        /// </summary>
        /// <param name="arr"></param>
        /// <param name="callback"></param>
        /// <param name="initial"></param>

        arr = arr || [];
        if (!_$.isArray(arr)) {
            arr = [arr];
        }

        if (!_$.isUndefined(callback) || !_$.isFunction(callback) || arr.length <= 0) {
            return null;
        }
        if (nativeReduceRight) {
            return nativeReduceRight.call(arr, callback, initial);
        }

        var len = arr.length, index = 0, result = (arguments.length >= 3) ? initial : arr[index--];
        
        for (; index >= 0; index--) {
            result = callback(result, arr[index], index, arr);
        }

        return result;

    };

    _$.flatten = function (obj) {
        /// <summary>
        /// Convert multi-dimensional array to one-dimensional array
        /// </summary>
        /// <param name="obj"></param>
        if (!_$.isArray(obj)) {
            return obj;
        }

        return toOneDimensionArray(obj);
    };
    
    _$.noConflict = function () {
        /// <summary>
        /// Set previousSwift to its previous owner
        /// return a referene to the jSwift object
        /// </summary>
        window._$ = previousSwift;
        return this;
    };

})(window, document);