/**
 * mobile.js
 *
 * @fileoverview  a javascript library for mobile-devs to use.
 * @link          
 * @author        Cheng Bing (824203428@qq.com)
 * @requires      
 * 
 * 
 */
(function (window, document, undefined) {

    var _$ = window._$ || {};

    var touch = {
        // slide distance，swipe event would be triggered if it exceed this distance(px)
        distance: 30,
        // slide duration, swipe event would be triggered if it exceed this duration(ms)
        duration: 1000
    };

    function bindSwipe(elem, swipeType, callback, triggerOnMove, stopPropagation, preventDefault) {
        /// <summary>
        /// 给 Dom 元素绑定事件
        /// </summary>
        /// <param name="elem" type="type"></param>
        /// <param name="swipeType" type="type"></param>
        /// <param name="callback" type="type"></param>
        /// <param name="triggerOnMove" type="type"></param>
        /// <param name="stopPropagation" type="type"></param>
        /// <param name="preventDefault" type="type"></param>
        
        var startPoint, endPoint, timer;


        function checkDirection(x1, y1, x2, y2) {
            /// <summary>
            /// 计算滑动方向（横向的优先级更高）
            /// </summary>
            /// <param name="x1" type="type"></param>
            /// <param name="y1" type="type"></param>
            /// <param name="x2" type="type"></param>
            /// <param name="y2" type="type"></param>
            /// <returns type=""></returns>
            var diffX = x1 - x2, diffY = y1 - y2, absX = Math.abs(diffX), absY = Math.abs(diffY), eventType;

            if (absX >= absY) {
                if (absX >= touch.distance) {
                    eventType = diffX > 0 ? 'swipeLeft' : 'swipeRight';
                }
            } else {
                if (absY >= touch.distance) {
                    eventType = diffY > 0 ? 'swipeUp' : 'swipeDown';
                }
            }

            return eventType;
        }

        function clearSwipeData() {
            /// <summary>
            /// 清除本次滑动数据记录
            /// </summary>
            startPoint = null; endPoint = null;

            if (timer) {
                clearTimeout(timer); timer = null;
            }
        }

        function triggerSwipeEvent(context, event) {
            /// <summary>
            /// 判断是否符合条件，确定是否执行swipe事件
            /// </summary>
            /// <param name="elem" type="type"></param>
            /// <param name="event" type="type"></param>
            /// <returns type=""></returns>
            if (startPoint && endPoint && checkDirection(startPoint.x, startPoint.y, endPoint.x, endPoint.y) === swipeType) {
                callback.call(context, event);
                return true;
            }
            return false;
        }

        elem.addEventListener('touchstart', function (event) {
            var self = this, touchPoint = event.touches[0];

            if (stopPropagation) {
                event.stopPropagation();
            }

            if (preventDefault) {
                event.preventDefault();
            }

            startPoint = {
                x: Math.floor(touchPoint.clientX),
                y: Math.floor(touchPoint.clientY)
            };

            timer = setTimeout(function () {
                clearSwipeData();                       //如果超时，清空本次touch数据

            }, touch.duration);
        });

        elem.addEventListener('touchmove', function (event) {
            var self = this, touchPoint = event.touches[0];

            if (stopPropagation) {
                event.stopPropagation();
            }

            if (preventDefault) {
                event.preventDefault();
            }

            if (startPoint) {
                endPoint = {
                    x: Math.floor(touchPoint.clientX),
                    y: Math.floor(touchPoint.clientY)
                };

                // 执行swipeType事件判断，是否符合触发事件
                if (triggerOnMove && triggerSwipeEvent(self, event)) {
                    clearSwipeData();
                }
            }
        });

        elem.addEventListener('touchend', function (event) {
            if (stopPropagation) {
                event.stopPropagation();
            }

            if (preventDefault) {
                event.preventDefault();
            }

            triggerSwipeEvent(self, event);
            
            clearSwipeData();                   // 清除本次touch数据
        });
    }

    
    var mobile = _$.mobile = {};                // 移动 mobile 工具类函数对象

    /**
    * @param  elem        {HTMLElement}         HTML元素
    * @param  callback    {Function}            事件回调函数
    * @param  options     {Object}              可选参数
    *                     stopPropagation       {Boolean}  是否停止冒泡，true为停止冒泡
    *                     preventDefault        {Boolean}  是否阻止默认事件，true为阻止默认事件
    *                     triggerOnMove         {Boolean}
    *                                           swipe事件有两种触发方式，一种是在touchmove过程中，只要满足滑动距离条件即触发。
    *                                           一种是在touchend中，进入滑动距离判断，如果满足滑动距离触发。
    *                                           默认值为false，在touchend中触发。
    */
    _$.each(['swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown'], function (index, name) {

        var defaultOpts = {
            triggerOnMove: false,
            stopPropagation: false,
            preventDefault: false
        };

        mobile[name] = function (elems, callback, options) {
            options = options || defaultOpts;
            elems = _$.isArray(elems) ? elems : [elems];

            _$.each(elems, function (index, elem) {
                bindSwipe(elem, name, callback, options.triggerOnMove, options.stopPropagation, options.preventDefault);
            });
        }
    });


    window._$ = _$;


})(window, document);