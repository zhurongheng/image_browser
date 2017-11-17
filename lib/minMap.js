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
    var geolocation;
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
            map = new BMap.Map(element);
            geoc = new BMap.Geocoder();
            geolocation = new BMap.Geolocation();
        },
        build: function (options) {
            /**
             *根据当前坐标初始化地图
             */
            geolocation.getCurrentPosition(function (r) {
                //定位完成
                if (options && typeof(options.mapReady) == 'function') {
                    options.mapReady.call(this);
                }
                /**
                 * 关于状态码
                 *BMAP_STATUS_SUCCESS    检索成功。对应数值“0”。
                 *BMAP_STATUS_CITY_LIST    城市列表。对应数值“1”。
                 *BMAP_STATUS_UNKNOWN_LOCATION    位置结果未知。对应数值“2”。
                 *BMAP_STATUS_UNKNOWN_ROUTE    导航结果未知。对应数值“3”。
                 *BMAP_STATUS_INVALID_KEY    非法密钥。对应数值“4”。
                 *BMAP_STATUS_INVALID_REQUEST    非法请求。对应数值“5”。
                 *BMAP_STATUS_PERMISSION_DENIED    没有权限。对应数值“6”。(自 1.1 新增)
                 *BMAP_STATUS_SERVICE_UNAVAILABLE    服务不可用。对应数值“7”。(自 1.1 新增)
                 *BMAP_STATUS_TIMEOUT    超时。对应数值“8”。(自 1.1 新增)=
                 */
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    point = r.point;
                    map.centerAndZoom(point, 20);
                    if (!marker) {
                        marker = new BMap.Marker(point);  // 创建标注
                    }
                    marker.setPosition(point);
                    //1、将地图dom赋给当前minMap标签
                    if (options && options.elementSuper) {
                        if (elementSuper) {
                            elementSuper.removeChild(minMapEle);
                        }
                        elementSuper = options.elementSuper;
                        elementSuper.appendChild(minMapEle);
                    }
                    var addr = '';
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
                                options.result.call(this,{address:addr,location:point.lng+','+point.lat});
                            }
                        }
                    });
                    map.addEventListener("click", function (e) {
                        geoc.getLocation(e.point, function (rs) {
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
                                    options.result.call(this, {address:addr,location:point.lng+','+point.lat});
                                }
                            }
                        });
                    });
                }
                else {
                    alert('定位失败:' + this.getStatus());
                }
            }, {enableHighAccuracy: true});
        }
    }
    MinMap.fn.init.prototype = MinMap.fn;
    return {
        minMap: MinMap
    }
})(BMap);