Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        innerText: {
            type: String,
            value: 'default value',
        }
    },
    data: {
        content: '',
        desc: '',
        keyboardVal: [1, 2, 3, '今天', 4, 5, 6, '+', 7, 8, 9, '-', '·', 0, '<', '完成']
    },
    methods: {
        handleDesc: function(e) {
            this.setData({
                desc: e.detail.value
            });
        },
        confirm: function () {
            const { desc, content } = this.data;
            //触发事件
            var myEventDetail = {content, desc} // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('myevent', myEventDetail, myEventOption)
        },
        inputMoney: function (e) {
            var { content, balance, recommendFlag, isEmpty } = this.data;
            console.log('inputMoney', this.data);
            var val = '' + e.target.dataset.money;
            // var content = this.data.content;
            var len = content.length;
            // var recommendFlag = this.data.recommendFlag;
            var index_point = content.indexOf('.');
            if (val.indexOf('¥') !== -1) {
                content = val;
                // balance += Number(content.replace('¥', '')); 
                recommendFlag = true;
            } else if (val === '<') {
                content = content.substr(0, len - 1);
            } else if (val === '·') {
                if (content.indexOf('.') === -1) {
                    content += '.';
                    len === 0 && (content = '0.');
                } else {
                    return;
                }
            } else if (val === '完成') {
                this.confirm();
            } else {
                if (recommendFlag === true) {
                    content = val;
                    recommendFlag = false;
                } else {
                    //控制小数点后只有两位
                    if (index_point === -1 || (len - index_point) < 3) {
                        content += val
                        // balance += Number(content.replace('¥', '')); 
                    }
                };
            }
            content = content.replace(' ', '');
            isEmpty = !!!content;
            // balance += Number(content.replace('¥', '')); 
            console.log('content', content);
            this.setData({
                content: content,
                recommendFlag: recommendFlag,
                isEmpty: isEmpty
                // balance: balance
            })
        }
    }
})