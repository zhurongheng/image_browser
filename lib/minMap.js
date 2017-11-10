var $map = (function (BMap) {
    if (!BMap) {
        console.log('BMap is undefined.....');
        return;
    }
    var map;
    var point;
    function MinMap(element) {
        return new MinMap.fn.init(element);
    }

    MinMap.fn = MinMap.prototype = {
        constructor: MinMap,
        init: function (element) {
            this.element = element;
            //console.log(element);
        },
        build: function (options) {
            this.options = options;
            if(!map){
                map = new BMap.Map(this.element);
                console.log('创建map实例...');
            }
            console.log(map);
            if(!point){
                point = new BMap.Point(121.427, 31.292);
            }
            map.centerAndZoom(point, 20);
            var geoc = new BMap.Geocoder();
            var addr = '';
            var infoWindow;
            /*map.addEventListener('ondragging', function () {//移动结束后定位
                marker.setPosition(map.getCenter());
            });*/
            var template = '<ul class="list">\n' +
                '                <li class="item item-borderless item-text-wrap item-button-right">\n' +
                '                    ${addr}\n' +
                '                </li>\n' +
                '            </ul>';
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
            map.addEventListener("click",function(e){
                geoc.getLocation(e.point, function (rs) {
                    if (rs && rs.addressComponents) {
                        addr = rs.addressComponents.province
                            + rs.addressComponents.city
                            + rs.addressComponents.district
                            + rs.addressComponents.street
                            + rs.addressComponents.streetNumber;
                        var info = template.replace(/\$\{addr\}/g, addr);
                        infoWindow = new BMap.InfoWindow(info, options);  // 创建信息窗口对象
                        var marker = new BMap.Marker(e.point);  // 创建标注
                        map.addOverlay(marker);// 将标注添加到地图中
                        marker.openInfoWindow(infoWindow);//图片加载完毕重绘infowindow
                        map.panTo(e.point);
                        point=e.point;
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