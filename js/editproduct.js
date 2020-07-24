Vue.component('editproduct', {
    template: `
<validation-observer v-slot="{ invalid }">    
    <form @submit.prevent="submitForm">    
        <div id="editproduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade"> <!--01-->
            <div role="document" class="modal-dialog modal-xl"> <!--02-->
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">   <!--03-->
                        <h5 id="exampleModalLabel" class="modal-title">
                            <span>{{ this.xtitle }}</span>
                        </h5>
                        <button type="button" data-dismiss="modal" aria-label="Close" class="close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>                                          <!--03-->

                    <div class="modal-body was-validated">    <!--04-->
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <validation-provider rules="required" v-slot="{ errors }">                    
                                        <label for="imageUrl">輸入圖片網址[imageUrl]</label>
                                        <input id="imageUrl" type="text" placeholder="請輸入圖片連結" required=""
                                            class="form-control" v-model="indata.imageUrl[0]" />
                                    <span v-if="errors[0]" class='text-danger'>{{ errors[0] }}</span>                            
                                    </ValidationProvider>
                                </div>
                                <img :src="indata.imageUrl[0]" alt="pic" class="img-fluid" />
                            </div>

                            <div class="col-sm-8">

                                <div class="form-group">
                                    <validation-provider rules="required|min:6" v-slot="{ errors }">
                                        <label for="title">標題[title]</label>
                                        <input id="title" type="text" placeholder="請輸入標題" required=""
                                        class="form-control" v-model="indata.title"/>
                                    <span v-if="errors[0]" class='text-danger'>{{ errors[0] }}</span>                            
                                    </ValidationProvider>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <validation-provider 
                                            rules="required|min:6|max:10" v-slot="{errors}">                                                            
                                            <label for="category">分類[category]</label>
                                            <input id="category" type="text" placeholder="請輸入分類" required=""
                                            class="form-control" v-model="indata.category" />
                                        <span v-if="errors[0]" class='text-danger'>{{ errors[0] }}</span>                            
                                        </ValidationProvider>                            
                                    </div>

                                    <div class="form-group col-md-6">
                                        <validation-provider rules="required|min:2|max:6" v-slot="{ errors }">                                  
                                            <label for="price">單位[unit]</label>
                                            <input id="unit" type="unit" placeholder="請輸入單位" required=""
                                            class="form-control" v-model="indata.unit" />
                                        <span v-if="errors[0]" class='text-danger'>{{ errors[0] }}</span>                            
                                        </ValidationProvider>                            
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <validation-provider rules="required|integer" v-slot="{ errors }">                           
                                            <label for="origin_price">原價[origin_price]</label>
                                            <input id="origin_price" type="number" placeholder="請輸入原價" required=""
                                            class="form-control" v-model="indata.origin_price" />
                                        <span v-if="errors[0]" class='text-danger'>{{ errors[0] }}</span>                            
                                        </ValidationProvider>                                       
                                    </div>

                                    <div class="form-group col-md-6">
                                        <validation-provider rules="required|integer" v-slot="{ errors }">                          
                                            <label for="price">售價[price]</label>
                                            <input id="price" type="number" placeholder="請輸入售價" required=""
                                                class="form-control" v-model="indata.price" />
                                        <span v-if="errors[0]" class='text-danger'>{{ errors[0] }}</span>                            
                                        </ValidationProvider>               
                                    </div>
                                </div>

                                <hr />

                                <div class="form-group">
                                    <validation-provider rules="required|max:80" v-slot="{ errors }">                                              
                                        <label for="description">產品描述[description]</label>
                                        <textarea id="description" type="text" placeholder="請輸入產品描述" required=""
                                            class="form-control" v-model="indata.description"></textarea>
                                    <span v-if="errors[0]" class='text-danger'>{{ errors[0] }}</span>                            
                                    </ValidationProvider>                                 
                                </div>

                                <div class="form-group">
                                    <validation-provider rules="required|max:80" v-slot="{ errors }">    
                                        <label for="content">說明內容[content]</label>
                                        <textarea id="description" type="text" placeholder="請輸入說明內容" required=""
                                            class="form-control" v-model="indata.content"></textarea>
                                        <span v-if="errors[0]" class='text-danger'>{{ errors[0] }}</span>                            
                                    </ValidationProvider>                                  
                                </div>

                                <div class="form-group">
                                    <div class="form-check">
                                        <input id="is_enabled" type="checkbox" class="form-check-input"
                                            v-model="indata.enabled"  />
                                        <label for="is_enabled" class="form-check-label">是否啟用[is_enabled]</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                      <!--04-->

                    <div class="modal-footer">  <!--05-->
                        <button type="button" data-dismiss="modal" class="btn btn-outline-secondary">
                            取消
                        </button>
                        <button type="button" class="btn btn-primary" @click="updatedata" :disabled="invalid">
                            確認
                        </button>
                    </div>                      <!--05-->
                </div>
            </div>  <!--02-->
        </div> <!--01-->
    </form>
</validation-observer>
`,
    data() {
        return {
            indata: {
                imageUrl: [],
            },
            xtitle: '',
        };
    },
    props: {
        tranpacka: {},
    },
    mounted() {
        console.log(`******** editproduct.js(mounted) ******`);
    },
    methods: {
        dorefresh() {
            this.xtitle = this.tranpacka.edittype=='edit' ? '修改產品' : '新增產品';
            if (this.xtitle == '修改產品') {
                let api = `${this.tranpacka.apipath}${this.tranpacka.uuid}/admin/ec/product/${this.tranpacka.pid}`;
                // 帶入 token
                axios.defaults.headers.common.Authorization = `Bearer ${this.tranpacka.token}`;
                axios
                    .get(api)
                    .then((res) => {
                        $('#editproduct').modal('show');
                        this.indata = res.data.data;
                    })
                    .catch((error) => {
                        console.log(`******** editproduct.js(dorefresh) ERR ******`);
                    });
            } else {
                this.indata= { };
                this.indata.imageUrl= [];
                $('#editproduct').modal('show');
            }
        },

        updatedata() {
            let httpMethod = this.tranpacka.edittype=='edit' ? 'patch' : 'post';
            let api = '';
            if (httpMethod=='patch') {
                api = `${this.tranpacka.apipath}${this.tranpacka.uuid}/admin/ec/product/${this.tranpacka.pid}`;
            }
            else 
            {
                api = `${this.tranpacka.apipath}${this.tranpacka.uuid}/admin/ec/product`;
            }
            axios.defaults.headers.common.Authorization = `Bearer ${this.tranpacka.token}`;
            axios[httpMethod](api,this.indata)
                .then(() => {
                    $('#editproduct').modal('hide');
                    console.log(
                        `******** editproduct.js(updatedata) this.tranpacka.pages.current_page 
                        ${this.tranpacka.pages.current_page}  ******`
                    );
                    this.$emit('editproductupdate', this.tranpacka.pages.current_page);
                    console.log(`******** editproduct.js(updatedata) OKAY   ******`);
                })
                .catch((error) => {
                    console.log(`******** editproduct.js(updatedata) ERR  ******`);
                });
        },
    },
});
