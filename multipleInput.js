(function($) {
	
	function multipleInput(inputObj,options) {
		
		this.baseInput=$(inputObj);
		this.defaultvalue=$(inputObj).attr('value');
		if (options) 
			this.separator=options.separator;
		else
			this.separator='>';
		this.options=options;
		this.initialize(inputObj);
	}
  
	$.fn.multipleInput = function(options) {
		this.each( function() {
			new multipleInput(this,options);
		});
	}
	
	multipleInput.prototype = {
		initialize:function(inputObj){
			var mInp=this;
			this.createInputs(inputObj);
		},
		/**
		* ilk input oluşturluyor
		* 
		* */
		createInputs:function(inputObj){
			var mInp=this;
			var formParent=$(inputObj).parent();
			var mDiv = document.createElement('div');
			mDiv.setAttribute('style','display:inline-block;');
			$(inputObj).before(mDiv);
			
			// ilk span ve input oluşturuluyor ve gizleniyor

			var mSpan = document.createElement('span');
			mSpan.setAttribute('class','firstInput');
			mInput = document.createElement('input');
			mInput.setAttribute('id',$(inputObj).attr('id'));
			mInput.setAttribute('name',$(inputObj).attr('name'));
			mInput.setAttribute('value',$(inputObj).attr('value'));
			mInput.setAttribute('style','display:none');
			mSpan.appendChild(mInput);
			mDiv.appendChild(mSpan);
				
			
			// default değerlerin saklanması için span oluşturuluyor
			var defaultSpan = document.createElement('span');	
			defaultSpan.innerHTML=mInp.defaultvalue;
			defaultSpan.setAttribute('class','defaultValue');
			defaultSpan.setAttribute('style','display:none');
			mDiv.appendChild(defaultSpan);
			
			// var olan input içindeki  parse ediliyor.
			var vInput=mInp.defaultvalue;
			if (vInput.indexOf(mInp.separator)>0){
				vInput=vInput.split(mInp.separator);
				
				for (i=0;i<vInput.length;i++) 
					mInp.createSubSI(mDiv,vInput[i]);	
					
					
			}else if (vInput.length>0) mInp.createSubSI(mDiv,vInput);
			

			// var olan input kaldırılıyor
			$(inputObj,formParent).remove();
			
			var obj=null;
			this.createSubSI(mDiv,'',true);
			this.createResetSpan(mDiv);	
		},
		/**
		* yeni span ve inputlar oluşturuluyor
		* obj	method ilk çağırıldığında div, 
		* 			inputlardan çağrıldığında ise input nesnesi gönderiliyor
		* Objvalue	method ilk çağrıldığında var olan input içindeki değeri alıyor
		* lastSpan	spanlar oluşturulurken en son eklenen spana class verilip
		* 			verilmeyeceğini kontrol ediyor.
		* 
		* */
		createSubSI:function(obj,Objvalue,lastSpan) {
			var mInp=this;
			
			if (obj.tagName!='DIV') 
				var divParent=obj.parentNode.parentNode;
						
			var sSpan = document.createElement('span');
			
			if (obj.tagName!='DIV'  || lastSpan==true)
				sSpan.setAttribute('class','cLastItem');
			
			var sInput= document.createElement('input');
			sInput.setAttribute('type','text');
			sInput.setAttribute('value',Objvalue);
				
			$(sInput).mouseout(function(){ 
				mInp.mMouseOut(this)
			}).dblclick(function(){ 
				mInp.mDblClick(this)
			}).keyup(function(){ 
				mInp.mKeyup(this)
			}).mouseover(function(){ 
				mInp.mMouseOver(this);
			});
			
			$(sInput).attr('class',$(this.baseInput).attr('class'))
			
			sSpan.appendChild(sInput);
			
			if (obj.tagName=='DIV') obj.appendChild(sSpan);
			else divParent.appendChild(sSpan);	
			
			
		},
		/**
		* inputların keydown olayı kontrol ediliyor
		* son inputda tuşa basıldığında yeni span ve input oluşturuluyor.
		* 
		* */
		mKeyup:function(obj){
			var mInp=this;
			if (obj.parentNode.getAttribute('class')=='cLastItem'){
				if (obj.value!=''){
					mInp.createSubSI(obj,'');
					obj.parentNode.removeAttribute('class');
				}
			}

			mInp.createResetSpan(obj);
			mInp.inputsJoin(obj);
		},
		/**
		* mouse input üzerine gelindiğinde sil iconu çıkıyor
		* 
		* */
		mMouseOver:function(obj){
			var mInp=this;
			if (obj.parentNode.childNodes[1]==null)	{
				var sDelSpan = document.createElement('span');
				sDelSpan.setAttribute('class','minptDelSpan');
				sDelSpan.setAttribute('onmousedown','mInp.mDblClick(this)');
				obj.parentNode.appendChild(sDelSpan);
			}
		},
		/**
		* mouse input üzerine ayrıldığına sil iconu kaldırılıyor
		* 
		* */
		mMouseOut:function(obj){
			var mInp=this;
			var sDelSpan=obj.parentNode.childNodes[1];
			obj.parentNode.removeChild(sDelSpan);
		},
		/**
		 * inputlara çift tıklama olayı kontrol ediliyor.çift tıkladığında
		 * siliniyor
		 * 
		 * */
		mDblClick:function(obj){
			var mInp=this;
			var divParent=obj.parentNode.parentNode;
			
			if (divParent.childNodes.length>3) {
				
				if (obj.parentNode.getAttribute('class')=='cLastItem') {
					
					var inputs= divParent.getElementsByTagName('input');
					
					if (inputs[inputs.length-2].parentNode.getAttribute('class')==null){
						inputs[inputs.length-2].parentNode.setAttribute('class','cLastItem');
						obj.value='';
						mInp.inputsJoin(obj);	
						divParent.removeChild(obj.parentNode);
					}else alert("En az birtane giriş alanı kalmalıdır !");			
				}
				else {
				obj.value='';
				mInp.inputsJoin(obj);	
				divParent.removeChild(obj.parentNode);	
				}
			}else alert("En az birtane giriş alanı kalmalıdır !");
			
		},
		/**
		 * div içindeki tüm inputlardaki değerler birleştiriliyor 
		 * 
		 * */
		inputsJoin:function(obj) {
			var mInp=this;
			var divParent=obj.parentNode.parentNode;
			var inputs=divParent.getElementsByTagName('input');
			var mInputValue='';
			for (var i=1;i<inputs.length;i++) {
				if (inputs[i].value!='' && i>1)
					mInputValue+=this.separator+inputs[i].value;
				else if (inputs[i].value!='' && i==1) 
					mInputValue=inputs[i].value;	
			}		
			inputs[0].setAttribute("value",mInputValue);

		},
		/**
		 * inputların sonunda resetleme ikonu oluşturuluyor.
		 * 
		 * */
		createResetSpan:function (obj){
			var mInp=this;
			if (obj.tagName!='DIV') var divParent=obj.parentNode.parentNode;
			else var divParent=obj;
			
				var spans=divParent.getElementsByTagName('span');
				for (i=0;i<spans.length;i++)
					if($(divParent.childNodes[i]).attr('class')=='minptResetSpan')
						{divParent.removeChild(divParent.childNodes[i]);break;}
			
			var sResetSpan = document.createElement('span');
			sResetSpan.setAttribute('class','xResetSpan');
			sResetSpan.setAttribute('title','başlangıç değerine geridön');
			$(sResetSpan).mousedown(function(){ 
				mInp.resetSpanClick(this)
			});
			$(sResetSpan).attr('class','minptResetSpan');			
			divParent.appendChild(sResetSpan);				
		},
		resetSpanClick:function (obj){
			var mInp=this;
			var divParent=obj.parentNode;
			var spans=divParent.getElementsByTagName('span');
			var slength=spans.length;
			for (var i=0;i<slength;i++){
				if(divParent.childNodes[i].getAttribute('class')!='firstInput' && divParent.childNodes[i].getAttribute('class')!='defaultValue'){
					divParent.removeChild(divParent.childNodes[i]);slength-=1;i-=1;
				}
			}
			
			var inputs=divParent.getElementsByTagName('input');		
			inputs[0].setAttribute("value",mInp.htmlEntityDecode(spans[1].innerHTML));
			defaultValue=inputs[0].value;
			
			//  input içindeki değer parse ediliyor.
			if (inputs[0].value.indexOf(mInp.separator)>0){
				defaultValue=defaultValue.split(mInp.separator);
				
				for (i=0;i<defaultValue.length;i++) 
					mInp.createSubSI(divParent,defaultValue[i]);	
					
					
			}else if (defaultValue.length>0) mInp.createSubSI(divParent,defaultValue);
			defaultValue='';
			mInp.createSubSI(divParent,defaultValue,true);
			mInp.createResetSpan(divParent);	
			
		},
		htmlEntityDecode:function(str){
			var  tarea=document.createElement('textarea');
			tarea.innerHTML = str; return tarea.value;
			tarea.parentNode.removeChild(tarea);
		}	
	}
	
})(jQuery);
