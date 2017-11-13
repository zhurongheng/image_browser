(function (win, doc, wx, $) {
    $.post('/weixin/getJSAPIConfig', {c_url: 'http://u6frg3.natappfree.cc/weixin/'}, function (data) {
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.sign,// 必填，签名，见附录1
            jsApiList: ['chooseImage', 'previewImage', 'uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            console.log('接口验证成功!');
        });
        wx.error(function (res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            console.log('接口验证失败!');
            console.log(res);
        });

        function ImageItem(index, pIndex, url) {
            this.indexindex;
            this.pIndex = pIndex;
            this.url = url;
        }


        function ImageUploadFactory() {
            return new ImageUploadFactory.fn.init(this);
        }

        ImageUploadFactory.fn = ImageUploadFactory.prototype = {
            constructor: ImageUploadFactory,
            init: function (imageTableEle) {
                this.imageItems = new Array();
                this.imageTableEle = imageTableEle;
            },
            /**
             * 从相机或相册获取图片
             */
            getImage: function () {
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        // var localIds = res.localIds; 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        if (this.options && typeof(this.options.getImageComplete) == 'function') {
                            this.options.getImageComplete.call(this, res.localIds);
                        }
                    }
                });
            },
            /**
             * 根据localId上传图像
             * @param localId
             */
            uploadImage: function (localId) {
                wx.uploadImage({
                    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        // var serverId = res.serverId;返回图片的服务器端ID
                        if (this.options && typeof(this.options.uploadImageComplete) == 'function') {
                            this.options.uploadImageComplete.call(this, res.serverId);
                        }
                    }
                });
            },
            build: function (options) {
                this.options = options;
                if (typeof(options.onBuild) == 'function') {
                    //提供实例给angular组件
                    options.onBuild.call(this, this);
                }
            }
        };
        ImageUploadFactory.fn.init.prototype = ImageUploadFactory.fn;
        /**
         * 扩展jquery
         */
        $.fn.extend({
            imageUpload: ImageUploadFactory
        });
    }, 'JSON');
})(window, document, wx, jQuery);