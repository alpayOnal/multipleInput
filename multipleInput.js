/**
 * @author Alpay Onal <alpayonal@gmail.com>
 * */
function multipleInput(){
	this.delImg='img/common/minpDel.png';
	this.delImg='img/common/minpDel.png';
	this.baseInput;
	this.separator='|>';
	this.initialize();
	
	if(arguments.length>0)
		this.createInputs(arguments[0]);
}

var _minpt=multipleInput.prototype;

_minpt.initialize=function(){
	
	mInp=this;
}

	/**
	 * ilk input oluşturluyor
	 * 
	 * */
_minpt.createInputs=function(inputObj){
	
	this.baseInput=inputObj;
	
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
	if (inputObj.value.indexOf(mInp.separator)>0){
		defaultValue=defaultValue.split(mInp.separator);
		
		for (i=0;i<defaultValue.length;i++) 
			mInp.createSubSI(mDiv,defaultValue[i]);	
			
			
	}else if (defaultValue.length>0) mInp.createSubSI(mDiv,defaultValue);
	

	// var olan input kaldırılıyor
	formParent=inputObj.parentNode;
	formParent.removeChild(inputObj);
	
	var obj=null;
	mInp.createSubSI(mDiv,'',true);
	mInp.createResetSpan(mDiv);	
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
_minpt.createSubSI=function(obj,Objvalue,lastSpan) {
	
	var divParent=obj.parentNode.parentNode;
				
	var sSpan = document.createElement('span');
	
	if (obj.tagName!='DIV'  || lastSpan==true)
	sSpan.setAttribute('class','cLastItem');
	
	var sInput= document.createElement('input');
	sInput.setAttribute('type','text');
	sInput.setAttribute('value',Objvalue);
	sInput.setAttribute('onMouseOver','mInp.mMouseOver(this)');
	sInput.setAttribute('onMouseOut','mInp.mMouseOut(this)');
	sInput.setAttribute('onDblClick','mInp.mDblClick(this)');
	sInput.setAttribute('onKeyUp','mInp.mKeyup(this)');	
	sInput.setAttribute('class',this.baseInput.getAttribute('class'));
	sSpan.appendChild(sInput);
	
	if (obj.tagName=='DIV') obj.appendChild(sSpan);
	else divParent.appendChild(sSpan);	
	
	
}

	/**
	* inputların keydown olayı kontrol ediliyor
	* son inputda tuşa basıldığında yeni span ve input oluşturuluyor.
	* 
	* */
_minpt.mKeyup=function(obj){
	
	if (obj.parentNode.getAttribute('class')=='cLastItem'){
		if (obj.value!=''){
			mInp.createSubSI(obj,'');
			obj.parentNode.removeAttribute('class');
		}
	}
	
	mInp.createResetSpan(obj);
	mInp.inputsJoin(obj);
}

	/**
	* mouse input üzerine gelindiğinde sil iconu çıkıyor
	* 
	* */
_minpt.mMouseOver=function(obj){
	
	if (obj.parentNode.childNodes[1]==null)	{
		var sDelSpan = document.createElement('span');
		sDelSpan.setAttribute('class','minptDelSpan');
		sDelSpan.setAttribute('onmousedown','mInp.mDblClick(this)');
		obj.parentNode.appendChild(sDelSpan);
	}
}

	/**
	* mouse input üzerine ayrıldığına sil iconu kaldırılıyor
	* 
	* */
_minpt.mMouseOut=function(obj){
	var sDelSpan=obj.parentNode.childNodes[1];
	obj.parentNode.removeChild(sDelSpan);
}

	/**
	 * inputlara çift tıklama olayı kontrol ediliyor.çift tıkladığında
	 * siliniyor
	 * 
	 * */
_minpt.mDblClick=function(obj){
	
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
	
}

	/**
	 * div içindeki tüm inputlardaki değerler birleştiriliyor 
	 * 
	 * */
_minpt.inputsJoin=function(obj) {

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
_minpt.createResetSpan=function (obj){
	
	if (obj.tagName!='DIV') var divParent=obj.parentNode.parentNode;
	else var divParent=obj;
	
		var spans=divParent.getElementsByTagName('span');
		for (i=0;i<spans.length;i++)
			if(divParent.childNodes[i].getAttribute('class')=='minptResetSpan')
				{divParent.removeChild(divParent.childNodes[i]);break;}
	
	var sResetSpan = document.createElement('span');
	sResetSpan.setAttribute('class','xResetSpan');
	sResetSpan.setAttribute('title','başlangıç değerine geridön');
	sResetSpan.setAttribute('onMouseDown','mInp.resetSpanClick(this)');
	sResetSpan.setAttribute('class','minptResetSpan');
	
	
	
	divParent.appendChild(sResetSpan);	
	
}

_minpt.resetSpanClick=function (obj){
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
	
}

_minpt.htmlEntityDecode=function(str){

	var  tarea=document.createElement('textarea');
	tarea.innerHTML = str; return tarea.value;
	tarea.parentNode.removeChild(tarea);
}

