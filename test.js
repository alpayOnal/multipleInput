var mDivID='div_CatX';

	/**
	 * inputların yerleştirileceği div oluşturuluyor.
	 * 
	 * */
function createCatX(obj,title,parent){
	
	var mDiv = document.createElement('div');
	
	mDiv.setAttribute('id',mDivID);
	
	if (parent=='body')	
		document.body.appendChild(mDiv);
	else {
		document.getElementById(parent).appendChild(mDiv);	
	} 	
	
	createMasterInput(obj,title);	
}


	/**
	* ilk input oluşturuluyor ve özellikleri tanımlanıyor 
	* 
	* */
function createMasterInput(obj,title) {
	
	mDiv=document.getElementById(mDivID);
	
	var mSpan = document.createElement('span');
	var mLabel = document.createElement('label');
	
	mLabel.innerHTML=title+' : ';
	mSpan.appendChild(mLabel);
	
	mInput = document.createElement('input');
	mInput.setAttribute('id',obj);
	mInput.setAttribute('name',obj);
	mInput.setAttribute('style','display:none');
	
	mSpan.appendChild(mInput);
	mDiv.appendChild(mSpan);
	
	createSubSI();
}
	/**
	* yeni span ve inputlar oluşturuluyor
	* 
	* */
function createSubSI() {
	
	mDiv=document.getElementById(mDivID);
	
	var sSpan = document.createElement('span');
	sSpan.setAttribute('class','cLastItem');
	
	var sInput= document.createElement('input');
	sInput.setAttribute('type','text');
	sInput.setAttribute('onMouseOver','mMouseOver(this)');
	sInput.setAttribute('onMouseOut','mMouseOut(this)');
	sInput.setAttribute('onDblClick','mDblClick(this)');
	sInput.setAttribute('onkeyup','mKeydown(this)');
	
	sSpan.appendChild(sInput);
	mDiv.appendChild(sSpan);
	
}

function mMouseOver(objInput){
	
	if (objInput.parentNode.childNodes[1]==null)	{
		var sDelImg = document.createElement('label');
		sDelImg.setAttribute('style','background:url("delete.png") \
		 no-repeat;width:10px;height:14px;display:inline-block;');
		sDelImg.setAttribute('onmousedown','mDblClick(this)');
		objInput.parentNode.appendChild(sDelImg);
	}
}



function mMouseOut(objInput){
	var sDelImg=objInput.parentNode.childNodes[1];
	//objInput.parentNode.removeChild(sDelImg);

}
	/**
	* inputların keydown olayı kontrol ediliyor
	* son inputda tuşa basıldığında yeni span ve input oluşturuluyor.
	* 
	* */
function mKeydown(objInput){
	
	if (objInput.parentNode.getAttribute('class')=='cLastItem'){
		if (objInput.value!=''){
			createSubSI();
			objInput.parentNode.removeAttribute('class');
		}
	}
	inputsJoin();
}


	/**
	 * inputlara çift tıklama olayı kontrol ediliyor.çift tıkladığında
	 * siliniyor
	 * 
	 * */
function mDblClick(objInput){
	
	mDiv=document.getElementById(mDivID);
	
	if (mDiv.childNodes.length>2) {
		
		if (objInput.parentNode.getAttribute('class')=='cLastItem') {
			
			var inputs= mDiv.getElementsByTagName('input');
			inputs[inputs.length-2].parentNode.setAttribute('class','cLastItem');
			mDiv.removeChild(objInput.parentNode);
			
		}
		else{
		mDiv.removeChild(objInput.parentNode);	
		}
	}
inputsJoin();	
}

	
	/**
	 * div içindeki tüm inputlardaki değerler birleştiriliyor 
	 * 
	 * */
function inputsJoin() {

	mDiv=document.getElementById(mDivID);
	var mInputValue='';
	
	var inputs= mDiv.getElementsByTagName('input');

	for (var i=1;i<inputs.length;i++) 
		if (inputs[i].value!=null)
			mInputValue+='|'+inputs[i].value;
		
	inputs[0].setAttribute("value",mInputValue);
	
}	

