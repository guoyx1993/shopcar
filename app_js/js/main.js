window.onload = function(){
	(function(){
	    //兼容IEgetElementsByClassName
	    if(!document.getElementsByClassName){
	    	document.getElementsByClassName = function(cls){
                var ret = [],
                    els = document.getElementsByTagName('*');
                for(var i = 0;i<els.length;i++){
                	if(els[i].className ===  cls || els[i].className.indexOf(cls+' ') >=0 || els[i].className.indexOf(' '+cls+' ') >= 0 || els.className.indexOf(' ' +cls) >=0){
                		ret.push(els[i]);
                	}
                }
                return ret;
	    	}
	    }
        
        //获取需要的DOM
        var checkallTop = document.getElementById('checkall'),
            checkallDottom = document.getElementById('checkall'),
            deleteAll = document.getElementById('delete'),
            goodsNum = document.getElementById('goods_count_num'),
            priceAll = document.getElementById('pirce_count'),
            checkone = document.getElementsByClassName('check-one'),
            deleteOne =  document.getElementsByClassName('delete-one'),
            priceOne = document.getElementsByClassName('price'),
            priceCount = document.getElementsByClassName('color'),
            reduce = document.getElementsByClassName('reduce'),
            add = document.getElementsByClassName('add'),
            inputNum = document.getElementsByClassName('goods_num'),
            //获取行
            tableDom = document.getElementById('shopcar_table'),
            //事件代理加在tr上
            tr = tableDom.children[0].children[1].rows;
	    
	    function main(){
			console.log(tr[1].getElementsByClassName('add'));
			addNum();		
			checkGoods();
			deleteGoods();
		}
        
		//计算
		//点击加减增加
		////次函数要用点击事件来触发
		
		//加减
		function addNum(){
			for(var i = 0;i<tr.length;i++){
				add[i].onclick = function(){
					//var that = this.previousSibling.value;
					this.previousSibling.value = parseInt(this.previousSibling.value) + 1;
					countPrice();                 
				}
				reduce[i].onclick = function(){
					//var that = this.nextSibling.value;
					if(this.nextSibling.value > 1){
						this.nextSibling.value = parseInt(this.nextSibling.value) - 1;					
					}
					countPrice();
				}
			}

		}
       	
		//全选
		function checkGoods(){
           for(var i = 0;i<checkone.length;i++){
           	checkone[i].onclick = function(){
               
               if(this.id === 'checkall' || this.id === 'checkall-bottom'){
               	    //如果二次用到之前遍历的Dom.不能直接取i，要重新遍历
               	    for(var j=0;j<checkone.length;j++){
               	    	checkone[j].checked = this.checked;
               	    }
               }
               //此函数放在全选之后
               countPrice();
           	}
           }
		}
		//删除
		function deleteGoods(){
			//注意遍历的所取的长度，注意里面和外面是否一样
            for(var i = 0;i<deleteOne.length;i++){
            	deleteOne[i].onclick = function(){
            		//下面全部删除按钮
            	    if(this.id === 'delete'){
                        for(var i = 0;i<tr.length;i++){
                        	var checkInp = tr[i].getElementsByTagName('input')[0];
                        	if(checkInp.checked){
                        		//删除节点后，注意索引会变化,所以i --;
                        		tr[i].parentNode.removeChild(tr[i]);
                        		i--;
                        	}
                        }
            	    }else{           	    	
	            		var parent = this.parentNode.parentNode.parentNode,
	            		    child = this.parentNode.parentNode;
	            		if(confirm('确定要删除吗')){
	            		    parent.removeChild(child);
	            	    }
            	    }
            	    countPrice();
            	}
            }

		}
		//总商品数，总价格，单独写出来，方便多次使用的时候调用
		function countPrice(){
            var num=0,price=0;
            for(var i = 0;i<tr.length;i++){
            	//操作同一行tr中DOM，在tr下面找，不能直接遍历取下标.
            	//次函数要用点击事件来触发
            	if(tr[i].getElementsByTagName('input')[0].checked){
                    num += parseInt(tr[i].getElementsByTagName('input')[1].value);
                    price += parseFloat(tr[i].cells[4].innerText)
            	}
            }
            goodsNum.innerText = num;
            priceAll.innerText = price.toFixed(2);
            console.log(num+','+price);
		}
		main();
	})()
}