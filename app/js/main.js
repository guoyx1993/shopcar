var app = new Vue({
	el:'#app',
	data:{
		totalMoney:0,
    totalQ:0,
		checked:false,
    a:'checked',
    b:'notCheck',
    deleteProdunct:'',
		produntList:[
         {
         	"productId":"600100002115",
         	"productName":"相机单反",
         	"productPrice":19000,
         	"productQuentity":1,
         	"productImage":"images/2.jpg",
         	"price":[
               {
               	 "partsId":"10001",
               	 "partsName":"打火机"
               }
         	]
         },
         {
         	"productId":"600100002120",
         	"productName":"卡片相机",
         	"productPrice":800,
         	"productQuentity":5,
         	"productImage":"images/3.jpg",
         	"price":[
               {
               	 "partsId":"20001",
               	 "partsName":"吸管"
               }
         	]
         },
         {
         	"productId":"600100002120",
         	"productName":"加多宝",
         	"productPrice":563,
         	"productQuentity":5,
         	"productImage":"images/1.jpg",
         	"price":[
               {
               	 "partsId":"20001",
               	 "partsName":"吸管"
               }
         	]
         },
         {
         	"productId":"600100002120",
         	"productName":"拍立得产品",
         	"productPrice":823,
         	"productQuentity":5,
         	"productImage":"images/4.jpg",
         	"price":[
               {
               	 "partsId":"20001",
               	 "partsName":"吸管"
               }
         	]
         }
		]
		
	},
	//生命周期，钩子
	mounted:function(){
		this.cartView();
  },
  methods:{
    //get请求data中json数据，渲染在视图中
        cartView:function(){

        },
        //减商品
        reduceProductQ:function(item){
            item.productQuentity -= 1;
            if(item.productQuentity < 2){
               item.productQuentity = 1;
            }
            this.selectedProdunt(item);
        },
        //加商品
        addProductQ:function(item){
            item.productQuentity += 1;
            this.selectedProdunt(item);
        },

        //选择商品，总数量总价格加减
        selectedProdunt:function(item){
          //遍历之前，把总价清零
            this.totalMoney=0;
            this.totalQ = 0;
            //先为每条商品加上checked属性，来判断是否被选中
            //每点击一次，遍历一次，每个商品checked是否点击为true
            for(var i= 0;i<this.produntList.length;i++){
                if(typeof this.produntList[i].checked === "undefind"){
                    this.$set(this.produntList[i],"checked");
                }
                if(this.produntList[i].checked){
                    this.totalMoney += this.produntList[i].productQuentity*this.produntList[i].productPrice;
                    this.totalQ += this.produntList[i].productQuentity;
               }
               else{
                    this.checked = false;
               }
            }
        },
        //全选
        selectedAll:function(){

            this.totalMoney=0;
            this.totalQ = 0;
            for(var i =0;i<this.produntList.length;i++){
                if(typeof this.produntList[i].checked === "undefind"){
                  this.$set(this.produntList[i],"checked");
                }   
                this.produntList[i].checked = this.checked; 

                if(this.produntList[i].checked){
                  this.totalMoney += this.produntList[i].productQuentity*this.produntList[i].productPrice;
                  this.totalQ += this.produntList[i].productQuentity;
               }                           
            }
           // this.selectedProdunt();
        },
        //删除
        deleteP:function(item){
            this.deleteProdunct = item;
            var index = this.produntList.indexOf(this.deleteProdunct);
            var newP = this.produntList.splice(index,1);
            //调用商品加减
            this.selectedProdunt(item);
            console.log(newP.length+","+this.produntList.length);
        },
        //全删
        deleteAll:function(){
            for(var i=0;i<this.produntList.length;i++){
                if(this.produntList[i].checked){
                    this.produntList.splice(i,1);
                    //让索引减一
                    i--;
                    this.selectedProdunt();
                    console.log(i+","+this.produntList.length);
                }
            }
        }
	},
  //过滤器
	filters:{
		addMoney:function(value){
            return "￥"+value.toFixed(2)
		},
		money:function(value){
	        return "￥"+value.toFixed(2) + "元";
        }
	}
});

/*
//全局过滤器
Vue.filter("money",function(value,type){
	return "￥"+value.toFixed(2) + type;
})
*/