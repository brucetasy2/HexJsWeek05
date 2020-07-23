
// 引入驗證套件
// import zh from 'zh_TW.js';

// 自定義設定檔案，錯誤的 className
VeeValidate.configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid',
    },
});

// // 載入自訂規則包
// VeeValidate.localize('tw', zh);

// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

// // 載入自訂規則包
// VeeValidate.localize('tw', zh_tw);

var app = new Vue({
    el: '#app',
    data: {
        uuid: 'd952d084-2b40-40c3-9758-1aef7c7aa9e6',
        apipath: 'https://course-ec-api.hexschool.io/api/',
        token: '',      // created 時取出存在的token
        products: [],
        pages: [],      // 頁數資訊
        tranpacka: {
            // 封裝參數傳入 editprduct
        },
    },

    methods: {
        // 取的產品
        getData(page = 1) {
            const api = `https://course-ec-api.hexschool.io/api/${this.uuid}/admin/ec/products?page=${page}`;
            // 帶入 token
            axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
            axios.get(api).then((response) => {
                this.products = response.data.data;         // 取得產品資料
                this.pages = response.data.meta.pagination; // 取得頁數資料
            });
        },

        /**
        * 開啟 開啟工作(視窗)
        * @param editType 判斷目前是否為新增(true)或是編輯(false)
        */
        DoEditProduct(editType, product) {
            console.log(`******** all.js(DoEditProduct) 開啟工作面板 editType= ${editType} ******`);
            this.tranpacka.edittype = editType;
            this.tranpacka.uuid = this.uuid;
            this.tranpacka.apipath = this.apipath;
            this.tranpacka.token = this.token;
            this.tranpacka.pages = this.pages;

            switch (editType) {
                case 'new': // 新增模式
                    this.tranpacka.pid = '';
                    this.$refs.editproduct.dorefresh();
                    break;
                case 'edit': //修改模式
                    this.tranpacka.pid = product.id;
                    this.$refs.editproduct.dorefresh();
                    break;
                case 'delete': //刪除模式
                    this.tranpacka.pid = product.id;
                    this.tranpacka.ptitle = product.title;
                    this.$refs.dropproduct.dorefresh();
                    break;
                default:
                    break;
            }
        },
    },

    created() {
        // 取得 token 的 cookies  https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 若無法取得 token 則返回 Login 頁面
        if (this.token === '') {
            window.location = 'index.html';
        }
    },

    mounted() {
        console.log(`******** all.js(mounted) ${this.token} ******`);
        this.getData(); // 初始資料載入
    },
});
