function XInputs(){
	
	
	this.separator='|>';
	this.initialize();
	
}

var _xip=XInputs.prototype;

_xip.initialize=function(){
	
	XInp=this;
}

	/**
	 * ilk input oluşturluyor
	 * 
	 * */
_xip.createInputs=function(inputObj){
		
	var mDiv = document.createElement('div');
	mDiv.setAttribute('style','display:inline-block;');
	inputObj.parentNode.insertBefore(mDiv, inputObj.nextSibling);
	
	// ilk span ve input oluşturuluyor ve gizleniyor,

	var mSpan = document.createElement('span');
	mSpan.setAttribute('class','firstInput');
	mInput = document.createElement('input');
	mInput.setAttribute('id',inputObj.id);
	mInput.setAttribute('name',inputObj.name);
	mInput.setAttribute('value',inputObj.value);
	mInput.setAttribute('style','display:none');
	mSpan.appendChild(mInput);
	mDiv.appendChild(mSpan);
	
	
	// var olan input içindeki değer alınıyor
	defaultValue=inputObj.value;
	
	// default değerlerin saklanması için span oluşturuluyor
	var defaultSpan = document.createElement('span');	
	defaultSpan.innerHTML=defaultValue;
	defaultSpan.setAttribute('class','defaultValue');
	defaultSpan.setAttribute('style','display:none');
	mDiv.appendChild(defaultSpan);
	
	// var olan input içindeki  parse ediliyor.
	if (inputObj.value.indexOf(XInp.separator)>0){
		defaultValue=defaultValue.split(XInp.separator);
		
		for (i=0;i<defaultValue.length;i++) 
			XInp.createSubSI(mDiv,defaultValue[i]);	
			
			
	}else if (defaultValue.length>0) XInp.createSubSI(mDiv,defaultValue);
	

	// var olan input kaldırılıyor
	formParent=inputObj.parentNode;
	formParent.removeChild(inputObj);
	
	var obj=null;
	XInp.createSubSI(mDiv,'',true);
	XInp.createResetSpan(mDiv);	
}	
	
	/**
	* yeni span ve inputlar oluşturuluyor
	* obj	method ilk çağırıldığında div, 
	* 			inputlardan çağrıldığında ise input nesnesi gönderiliyor
	* Objvalue	method ilk çağrıldığında var olan input içindeki değeri alıyor
	* lastSpan	spanlar oluşturulurken en son eklenen spana class verilip
	* 			verilmeyeceğini kontrol ediyor.
	* 
	* */
_xip.createSubSI=function(obj,Objvalue,lastSpan) {
	
	var divParent=obj.parentNode.parentNode;
				
	var sSpan = document.createElement('span');
	
	if (obj.tagName!='DIV'  || lastSpan==true)
	sSpan.setAttribute('class','cLastItem');
	
	var sInput= document.createElement('input');
	sInput.setAttribute('type','text');
	sInput.setAttribute('value',Objvalue);
	sInput.setAttribute('onMouseOver','XInp.mMouseOver(this)');
	sInput.setAttribute('onMouseOut','XInp.mMouseOut(this)');
	sInput.setAttribute('onDblClick','XInp.mDblClick(this)');
	sInput.setAttribute('onKeyUp','XInp.mKeyup(this)');	
	
	sSpan.appendChild(sInput);
	
	if (obj.tagName=='DIV') obj.appendChild(sSpan);
	else divParent.appendChild(sSpan);	
	
	
}

	/**
	* inputların keydown olayı kontrol ediliyor
	* son inputda tuşa basıldığında yeni span ve input oluşturuluyor.
	* 
	* */
_xip.mKeyup=function(obj){
	
	if (obj.parentNode.getAttribute('class')=='cLastItem'){
		if (obj.value!=''){
			XInp.createSubSI(obj,'');
			obj.parentNode.removeAttribute('class');
		}
	}
	
	XInp.createResetSpan(obj);
	XInp.inputsJoin(obj);
}

	/**
	* mouse input üzerine gelindiğinde sil iconu çıkıyor
	* 
	* */
_xip.mMouseOver=function(obj){
	
	if (obj.parentNode.childNodes[1]==null)	{
		var sDelSpan = document.createElement('span');
		sDelSpan.setAttribute('style','background:url("delete.png")\
1px top no-repeat;width:11px;height:14px;padding-left:0;margin:0;display:inline-block;cursor:pointer;');
		sDelSpan.setAttribute('onmousedown','XInp.mDblClick(this)');
		obj.parentNode.appendChild(sDelSpan);
	}
}

	/**
	* mouse input üzerine ayrıldığına sil iconu kaldırılıyor
	* 
	* */
_xip.mMouseOut=function(obj){
	var sDelSpan=obj.parentNode.childNodes[1];
	obj.parentNode.removeChild(sDelSpan);
}

	/**
	 * inputlara çift tıklama olayı kontrol ediliyor.çift tıkladığında
	 * siliniyor
	 * 
	 * */
_xip.mDblClick=function(obj){
	
	var divParent=obj.parentNode.parentNode;
	
	if (divParent.childNodes.length>3) {
		
		if (obj.parentNode.getAttribute('class')=='cLastItem') {
			
			var inputs= divParent.getElementsByTagName('input');
			
			if (inputs[inputs.length-2].parentNode.getAttribute('class')==null){
				inputs[inputs.length-2].parentNode.setAttribute('class','cLastItem');
				obj.value='';
				XInp.inputsJoin(obj);	
				divParent.removeChild(obj.parentNode);
			}else alert("En az birtane giriş alanı kalmalıdır !");			
		}
		else {
		obj.value='';
		XInp.inputsJoin(obj);	
		divParent.removeChild(obj.parentNode);	
		}
	}else alert("En az birtane giriş alanı kalmalıdır !");
	
}

	/**
	 * div içindeki tüm inputlardaki değerler birleştiriliyor 
	 * 
	 * */
_xip.inputsJoin=function(obj) {

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
	
}	

	/**
	 * inputların sonunda resetleme ikonu oluşturuluyor.
	 * 
	 * */
_xip.createResetSpan=function (obj){
	
	if (obj.tagName!='DIV') var divParent=obj.parentNode.parentNode;
	else var divParent=obj;
	
		var spans=divParent.getElementsByTagName('span');
		for (i=0;i<spans.length;i++)
			if(divParent.childNodes[i].getAttribute('class')=='xResetSpan')
				{divParent.removeChild(divParent.childNodes[i]);break;}
	
	var sResetSpan = document.createElement('span');
	sResetSpan.setAttribute('class','xResetSpan');
	sResetSpan.setAttribute('title','başlangıç değerine geridön');
	sResetSpan.setAttribute('onMouseDown','XInp.resetSpanClick(this)');
	sResetSpan.setAttribute('style','background:url("reset.png")\
no-repeat;width:16px;height:16px;padding:0;margin:0 0 0 5px;display:inline-block;cursor:pointer');
	
	divParent.appendChild(sResetSpan);	
	
}

_xip.resetSpanClick=function (obj){
	var divParent=obj.parentNode;
	var spans=divParent.getElementsByTagName('span');
	var slength=spans.length;
	for (var i=0;i<slength;i++){
		if(divParent.childNodes[i].getAttribute('class')!='firstInput' && divParent.childNodes[i].getAttribute('class')!='defaultValue'){
			divParent.removeChild(divParent.childNodes[i]);slength-=1;i-=1;
		}
	}
	
	var inputs=divParent.getElementsByTagName('input');		
	inputs[0].setAttribute("value",XInp.htmlEntityDecode(spans[1].innerHTML));
	defaultValue=inputs[0].value;
	
	//  input içindeki değer parse ediliyor.
	if (inputs[0].value.indexOf(XInp.separator)>0){
		defaultValue=defaultValue.split(XInp.separator);
		
		for (i=0;i<defaultValue.length;i++) 
			XInp.createSubSI(divParent,defaultValue[i]);	
			
			
	}else if (defaultValue.length>0) XInp.createSubSI(divParent,defaultValue);
	defaultValue='';
	XInp.createSubSI(divParent,defaultValue,true);
	XInp.createResetSpan(divParent);	
	
}

_xip.htmlEntityDecode=function(str){

	var  tarea=document.createElement('textarea');
	tarea.innerHTML = str; return tarea.value;
	tarea.parentNode.removeChild(tarea);
}

