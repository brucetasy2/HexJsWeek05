
Vue.component('dropproduct', {
    template:
        `
<div id="dropproduct" tabindex="-1" role="dialog" 
    aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade">
    <div role="document" class="modal-dialog">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 id="exampleModalLabel" class="modal-title">
                    <span>刪除產品</span>
                </h5>
                <button type="button" data-dismiss="modal" aria-label="Close" class="close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>

            <div class="modal-body">是否刪除 
                <strong class="text-danger" > {{ ptitle }}</strong> 商品(刪除後將無法恢復)。
            </div>

            <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn btn-outline-secondary">
                    取消
                </button>
                <button type="button" class="btn btn-danger" @click="delprduct">
                    確認刪除
                </button>
            </div>
        </div>
    </div>
</div>
`,
    data() {
        return {
            // indata: {
            //     imageUrl: [],
            // },
            ptitle:'',
        };
    },
    props: {
        tranpacka: {},
    },
    mounted() {
        console.log(`******** dropproduct.js(mounted) ******`);
    },
    methods: {
        dorefresh() {
            console.log(`******** dropproduct.js(dorefresh) ******`);
            $('#dropproduct').modal('show');
            this.ptitle=this.tranpacka.ptitle;
        },
        delprduct() {  
            let httpMethod = 'delete';
            let api = `${this.tranpacka.apipath}${this.tranpacka.uuid}/admin/ec/product/${this.tranpacka.pid}`;
            axios.defaults.headers.common.Authorization = `Bearer ${this.tranpacka.token}`;
            axios[httpMethod](api)
                .then(() => {
                    $('#dropproduct').modal('hide');
                     this.$emit('dropproductupdate', this.tranpacka.pages.current_page);
                    console.log(`******** dropproduct.js(delprduct) OKAY ${this.tranpacka.pid}  ******`);
                })
                .catch((error) => {
                    console.log(`******** dropproduct.js(delprduct) ERR  ******`);
                });

        },
    },
});