var $map = (function (BMap) {
    if (!BMap) {
        console.log('BMap is undefined.....');
        return;
    }
    /**
     * 单例
     */
    var minMap;
    var map;
    var point;
    var elementSuper;
    var geoc;
    var marker;
    var infoWindow;
    var minMapEle;
    var minMapEle;
    var template = '<ul class="list">\n' +
        '                <li class="item item-borderless item-text-wrap">\n' +
        '                    ${addr}\n' +
        '                </li>\n' +
        '            </ul>';

    function MinMap() {
        if (!minMap) {
            if (!minMapEle) {
                minMapEle = document.createElement('div');
                minMapEle.style.width = window.innerWidth;
                minMapEle.style.height = window.innerHeight - 44 + 'px';
            }
            minMap = new MinMap.fn.init(minMapEle);
        }
        return minMap;
    }

    MinMap.fn = MinMap.prototype = {
        constructor: MinMap,
        init: function (element) {
            console.log('init:');
            console.log(element)
            map = new BMap.Map(element);
            point = new BMap.Point(121.427, 31.292);
            map.centerAndZoom(point, 20);
            geoc = new BMap.Geocoder();
            marker = new BMap.Marker(point);  // 创建标注
        },
        build: function (options) {
            //1、将地图dom赋给当前minMap标签
            if (options && options.elementSuper) {
                if (elementSuper) {
                    elementSuper.removeChild(minMapEle);
                }
                elementSuper = options.elementSuper;
                elementSuper.appendChild(minMapEle);
            }
            var addr = '';
            /*map.addEventListener('ondragging', function () {//移动结束后定位
                marker.setPosition(map.getCenter());
            });*/

            /*map.addEventListener('moveend', function () {
                var timeout = setTimeout(function () {
                    geoc.getLocation(marker.point, function (rs) {
                        if (rs && rs.addressComponents) {
                            addr = rs.addressComponents.province
                                + rs.addressComponents.city
                                + rs.addressComponents.district
                                + rs.addressComponents.street
                                + rs.addressComponents.streetNumber;
                            var info = template.replace(/\$\{addr\}/g, addr);
                            infoWindow = new BMap.InfoWindow(info, options);  // 创建信息窗口对象
                            marker.openInfoWindow(infoWindow);//图片加载完毕重绘infowindow
                            if (options && typeof(options.result) == 'function') {
                                options.result.call(this, addr);
                            }
                        }
                    });
                    clearTimeout(timeout);
                }, 200);

            });*/
            geoc.getLocation(point, function (rs) {
                if (rs && rs.addressComponents) {
                    addr = rs.addressComponents.province
                        + rs.addressComponents.city
                        + rs.addressComponents.district
                        + rs.addressComponents.street
                        + rs.addressComponents.streetNumber;
                    var info = template.replace(/\$\{addr\}/g, addr);
                    infoWindow = new BMap.InfoWindow(info, options);  // 创建信息窗口对象
                    map.addOverlay(marker);// 将标注添加到地图中
                    marker.openInfoWindow(infoWindow);//图片加载完毕重绘infowindow
                    if (options && typeof(options.result) == 'function') {
                        options.result.call(this, addr);
                    }
                }
            });
            map.addEventListener("click", function (e) {
                geoc.getLocation(e.point, function (rs) {
                    console.log(rs);
                    if (rs && rs.addressComponents) {
                        addr = rs.addressComponents.province
                            + rs.addressComponents.city
                            + rs.addressComponents.district
                            + rs.addressComponents.street
                            + rs.addressComponents.streetNumber;
                        var info = template.replace(/\$\{addr\}/g, addr);
                        infoWindow.setContent(info);
                        marker.setPosition(e.point);
                        marker.openInfoWindow(infoWindow);//图片加载完毕重绘infowindow
                        point = e.point;
                        if (options && typeof(options.result) == 'function') {
                            options.result.call(this, addr);
                        }
                    }
                });
            });
        }
    }
    MinMap.fn.init.prototype = MinMap.fn;
    return {
        minMap: MinMap
    }
})(BMap);