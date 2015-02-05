(function($) {

    var CountdownTimer = function(elem, timeLimit) {
        this.initialize.apply(this, arguments);
    }

    CountdownTimer.prototype =  {

        /**
         * Constructor
         */
        initialize: function(elem, timeLimit) {
            this.elem = elem;
            this.timeLimit = timeLimit;
        },

        /**
         * カウントダウン
         */
        countDown : function()  {
            var timer;
            var today = new Date()
            var days = Math.floor((this.timeLimit - today) / (24 * 60 * 60 * 1000));
            var hours = Math.floor(((this.timeLimit - today) % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            var mins = Math.floor(((this.timeLimit - today) % (24 * 60 * 60 * 1000)) / (60 * 1000)) % 60;
            var secs = Math.floor(((this.timeLimit - today) % (24 * 60 * 60 * 1000)) / 1000) % 60 % 60;
            var milis = Math.floor(((this.timeLimit - today) % (24 * 60 * 60 * 1000)) / 10) % 100;
            var me = this;

            if (days !== undefined && days > 0) {
                timer = days + '日' + hours + '時間' + this.addZero(mins) + '分' + this.addZero(secs) + '秒'  + this.addZero(milis);
            } else { 
                timer = hours + '時間' + this.addZero(mins) + '分' + this.addZero(secs) + '秒'  + this.addZero(milis);
            }
            if ((this.timeLimit - today) >= 0) {
                this.elem.html(timer);
                tid = setTimeout( function() { me.countDown(); }, 10);
            } else {
                timer = '0時間00分00秒00';
                this.elem.html(timer);
            }
        },

        /**
         * ゼロを付与
         */
        addZero : function(num) {
            num = '00' + num;
            str = num.substring( num.length - 2, num.length);
            return str;
        }
    }

    $.fn.countdown = function(options) {

        var tommorow = new Date();
        tommorow.setDate(tommorow.getDate() + 1);
        tommorow.setHours(0);
        tommorow.setMinutes(0);
        tommorow.setSeconds(0);

        var settings = $.extend({
            d: tommorow
        }, options);

        var timeLimit = settings.d;

        var timer = new CountdownTimer(this, timeLimit);
        timer.countDown();  
    };

})(jQuery);

