/**
 * Fullscreen banner 'KINOPOLITEN'
 * Created by Evgeny Chuvelev on 21/12/14.
 * http://www.facebook.com/chuvelev
 */

(function (window, undefined){
    window.KinopolitenBnr = function(options) {

        /**
         * Default banner settings
         * @type {{staticHost: string, appStoreLink: string, googlePlayLink: string, canClose: boolean, autoInit: boolean}}
         */
        var defaultOptions = {
            classContainer: 'cont',
            staticHost: 'http://' + window.location.hostname,
            appStoreLink: 'https://itunes.apple.com/ru/app/kinopoliten/id949480166?mt=8',
            googlePlayLink: 'https://play.google.com/store/apps/details?id=ru.vmetro.kinohod',
            canClose: false,
            autoInit: true
        };

        var settings = extend(defaultOptions, options), // extended setting by custom options object
            bannerHTML_iphone = '<div class="kinopoliten__wrapper"><img class="kinopoliten__logo-vmetro" src="'+ settings.staticHost +'/kinopoliten_bnr/images/vmetro-logo.png" width="117" height="101" alt="В МЕТРО" title="В МЕТРО"/><div class="kinopoliten__text-title">&laquo;Кинополитен&raquo; для iPhone</div><div class="kinopoliten__text-slogan">Покупайте билеты в кино без наценки!</div><img class="kinopoliten__poster" src="'+ settings.staticHost +'/kinopoliten_bnr/images/kinopoliten_iphone.png" alt="Билеты без наценки" title="Билеты без наценки"/><div class="kinopoliten__app-buttons"><a href="'+ settings.appStoreLink +'"><img src="'+ settings.staticHost +'/kinopoliten_bnr/images/apple-app_store_button.png" class="kinopoliten__app-button" alt="Загрузите в AppStore"/></a></div></div>', // html banner mark-up
            bannerHTML_android = '<div class="kinopoliten__wrapper"><img class="kinopoliten__logo-vmetro" src="'+ settings.staticHost +'/kinopoliten_bnr/images/vmetro-logo.png" width="117" height="101" alt="В МЕТРО" title="В МЕТРО"/><div class="kinopoliten__text-title">&laquo;Кинополитен&raquo; для Android</div><div class="kinopoliten__text-slogan">Покупайте билеты в кино без наценки!</div><img class="kinopoliten__poster" src="'+ settings.staticHost +'/kinopoliten_bnr/images/kinopoliten_android.png" alt="Билеты без наценки" title="Билеты без наценки"/><div class="kinopoliten__app-buttons"><a href="'+ settings.googlePlayLink +'"><img src="'+ settings.staticHost +'/kinopoliten_bnr/images/google_play_button.png" class="kinopoliten__app-button" alt="Загрузите в AppStore"/></a></div></div>', // html banner mark-up
            bannerHTML_both = '<div class="kinopoliten__wrapper"><img class="kinopoliten__logo-vmetro" src="'+ settings.staticHost +'/kinopoliten_bnr/images/vmetro-logo.png" width="117" height="101" alt="В МЕТРО" title="В МЕТРО"/><div class="kinopoliten__text-title">&laquo;Кинополитен&raquo; для iPhone и&nbsp;Android</div><div class="kinopoliten__text-slogan">Покупайте билеты в кино без наценки!</div><img class="kinopoliten__poster" src="'+ settings.staticHost +'/kinopoliten_bnr/images/kinopoliten.png" alt="Билеты без наценки" title="Билеты без наценки"/><div class="kinopoliten__app-buttons"><a href="'+ settings.appStoreLink +'"><img src="'+ settings.staticHost +'/kinopoliten_bnr/images/app_store.png" class="kinopoliten__app-button" alt="Загрузите в AppStore"/></a><a href="'+ settings.googlePlayLink +'"><img src="'+ settings.staticHost +'/kinopoliten_bnr/images/google_play.png" class="kinopoliten__app-button" alt="Загрузите на Google Play"/></a></div></div>', // html banner mark-up

            self = this;

        /**
         * @param target - original object
         * @param source - extension object
         * @returns {target}
         */
        function extend(target, source) {
            var a = Object.create(target);
            Object.keys(source).map(function (prop) {
                prop in a && (a[prop] = source[prop]);
            });
            return a;
        }

        /**
         * banner instance status
         * @type {{cssLoad: boolean, instance: boolean}}
         */
        this.status = {
            cssLoad: false,
            instance: false
        };

        /**
         * Detect mobile platform
         * @returns {string}
         */
        this.detectOS = function() {
            if (/Android/i.test(navigator.userAgent)) {
                return 'android';
            }

            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                return 'ios';
            }
        }

        /**
         * add banner to DOM
         */
        this.initHtml = function() {
            var os = this.detectOS();
            this.container = document.createElement('div');
            this.container.className = settings.classContainer;

            if (os === 'android') {
                this.container.innerHTML = bannerHTML_android;
            } else if (os === 'ios') {
                this.container.innerHTML = bannerHTML_iphone;
            } else {
                this.container.innerHTML = bannerHTML_both;
            }

            if (settings.canClose) {
                this.addCloseButton();
            }

            document.body.appendChild(this.container);
        };

        /**
         * remove banner from DOM
         */
        this.close = function() {
            if ( document.body.querySelector('.' + settings.classContainer) ) {
                document.body.removeChild(self.container);
                this.status.instance = false;
            } else {
                console.error('KinopolitenBnr not initialized yet. There is nothing to close!');
            }
        };

        /**
         * add close button to container
         */
        this.addCloseButton = function() {
            var closeButton = document.createElement('div');
            closeButton.className = 'kinopoliten__close-icon';
            closeButton.innerHTML = '&times;';
            this.container.querySelector('.kinopoliten__wrapper').appendChild(closeButton);

            closeButton.addEventListener('click', function() {
                self.close();
            });
        };

        /**
         * upload banners styles
         */
        this.initCss = function() {
            if (!this.status.cssLoad) {
                var bannerStyles = document.createElement('link');
                bannerStyles.type = 'text/css';
                bannerStyles.rel = 'stylesheet';
                bannerStyles.href = settings.staticHost + '/kinopoliten_bnr/css/kinopoliten_bnr.css';
                document.head.appendChild(bannerStyles);
                this.status.cssLoad = true;
            }
            return false;
        };

        /**
         * initialize banner
         */
        this.init = function() {
            if (!this.status.instance) {
                this.initCss();
                setTimeout(function() {
                    self.initHtml();
                }, 400);
                this.status.instance = true;
            }
            return false;
        };

        if (settings.autoInit) {
            window.onload = function(){
                self.init();
            }
        }

        // public banner api
        return {
            show: function() {
                self.init();
            },
            close: function() {
                self.close();
            }
        }
    };
})(window);