#pragma strict
/*Array Section*/
var stickArray:Array;
var stickOutputArray:Array;
var buttonArray:Array;
var buttonOutputArray:Array;
var optionBarArray:Array;
var optionBarOutputArray:Array;
var displayInfoArray:Array;

var screenSize:int = 5;
var screenDPI:int = 0;
var targetResolution:Vector2 = Vector2.zero;

/*Flag Area*/
private var startFlag:boolean = false;
private var inputEnable:boolean = true;
private var displayEnable:boolean = true;
private var noTouchFlag:boolean = true;
private var outputInitFlag:boolean = false;

function OnEnable(){
	if(startFlag){
		return;
	}
	InitArrays();
	SycDisplayerCtrls();
	targetResolution.x = Screen.width;
	targetResolution.y = Screen.height;
	if(Screen.dpi!=0){
		screenDPI = Screen.dpi;
	}
	else{
		var tmp_float:float;
		tmp_float = Mathf.Sqrt(targetResolution.x*targetResolution.x + targetResolution.y*targetResolution.y);
		tmp_float = tmp_float/screenSize;
		screenDPI = tmp_float;
	}
	GetAllRects();
	ReCalculateSize();
	startFlag = true;
}
function OnGUI(){
	if(Event.current.type.Equals(EventType.Repaint)&&displayEnable){
		var alphaBackup:float = GUI.color.a;
		/*stick*/
		for(var mStick:StickCtrl in stickArray){
			mStick.DrawGUI();
		}
		/*button*/
		for(var mButton:ButtonCtrl in buttonArray){
			mButton.DrawGUI();
		}
		/*button*/
		for(var mOptionBar:OptionBarCtrl in optionBarArray){
			mOptionBar.DrawGUI();
		}
		GUI.color.a = alphaBackup;
	}
}

function FixedUpdate(){
	if(startFlag&&inputEnable){
		var i:int;
		if(Input.touchCount > 0){
			var touchPosition:Vector2;
			var touchPositionArray:Array = new Array();
			for(i = 0; i < Input.touchCount; i++){
				touchPositionArray.Push(Vector2(Input.GetTouch(i).position.x,Input.GetTouch(i).position.y));
			}
			/*stick*/
			for(var mStick:StickCtrl in stickArray){
				for(i = 0; i < touchPositionArray.length; i++){
					touchPosition = touchPositionArray[i];
					if(mStick.IsTouched(touchPosition)){
						touchPositionArray.RemoveAt(i);
						noTouchFlag = false;
						break;
					}
				}
				mStick.myOutput.SetLastStatus(mStick.myOutput.touchStatus);
			}
			/*button*/
			for(var mButton:ButtonCtrl in buttonArray){
				for(i = 0; i < touchPositionArray.length; i++){
					touchPosition = touchPositionArray[i];
					if(mButton.IsTouched(touchPosition)){
						touchPositionArray.RemoveAt(i);
						noTouchFlag = false;
						break;
					}
				}
				mButton.myOutput.SetLastStatus(mButton.myOutput.touchStatus);
				if(mButton.myOutput.touchStatus == false){
					mButton.getCurrentTexCoord();
				}
			}
			/*optionBar*/
			for(var mOptionBar:OptionBarCtrl in optionBarArray){
				for(i = 0; i < touchPositionArray.length; i++){
					touchPosition = touchPositionArray[i];
					if(mOptionBar.IsTouched(touchPosition)){
						touchPositionArray.RemoveAt(i);
						noTouchFlag = false;
						break;
					}
				}
				mOptionBar.myOutput.SetLastStatus(mOptionBar.myOutput.touchStatus);
			}
		}
		else if(Input.touchCount == 0&&noTouchFlag == false){
			/*stick*/
			for(var mStick:StickCtrl in stickArray){
				mStick.myOutput.touchStatus = false;
				mStick.myOutput.SetLastStatus(false);
				noTouchFlag = true;
			}
			/*button*/
			for(var mButton:ButtonCtrl in buttonArray){
				mButton.myOutput.touchStatus = false;
				mButton.myOutput.SetLastStatus(false);
				mButton.getCurrentTexCoord();
				noTouchFlag = true;
			}
			for(var mOptionBar:OptionBarCtrl in optionBarArray){
				mOptionBar.myOutput.touchStatus = false;
				mOptionBar.myOutput.SetLastStatus(false);
				noTouchFlag = true;
			}
		}
	}
}
function SetDisplayEnable(enable:boolean):boolean{
	displayEnable = enable;
	return displayEnable;
}
function GetDisplayEnable(enable:boolean):boolean{
	return displayEnable;
}
function SetInputEnable(enable:boolean):boolean{
	inputEnable = enable;
	return inputEnable;
}
function GetInputEnable(enable:boolean):boolean{
	return inputEnable;
}
function InitArrays(){
	stickArray = new Array();
	stickOutputArray = new Array();
	buttonArray = new Array();
	buttonOutputArray = new Array();
	optionBarArray = new Array();
	optionBarOutputArray = new Array();
	displayInfoArray = new Array();
}
function GetAllRects(){
	for(var mButton:ButtonCtrl in buttonArray){
		mButton.LoadData();
	}
	for(var mStick:StickCtrl in stickArray){
		mStick.ResetIndicator(screenDPI);
	}
	for(var mOptionBar:OptionBarCtrl in optionBarArray){
		mOptionBar.displayInfo.GetRectInPixel(screenDPI,targetResolution);
		mOptionBar.LoadData();
		mOptionBar.GetAllRects(screenDPI);
	}
	for(var mInfo:KDisplayInfo in displayInfoArray){
		mInfo.GetRectInPixel(screenDPI,targetResolution);
	}
}
function setAllScale(scale:float){
	for(var mCtrl:KDisplayInfo in displayInfoArray){
		mCtrl.reScale(scale);
	}
}
function SycDisplayerCtrls(){
	stickArray = gameObject.GetComponents.<StickCtrl>();
	buttonArray = gameObject.GetComponents.<ButtonCtrl>();
	optionBarArray = gameObject.GetComponents.<OptionBarCtrl>();
	
	displayInfoArray.Clear();
	for(var stick:StickCtrl in stickArray){
		displayInfoArray.Push(stick.displayInfo);
	}
	for(var button:ButtonCtrl in buttonArray){
		displayInfoArray.Push(button.displayInfo);
	}
}
function GetOptionBarData():Array{
	if(!outputInitFlag){
		/*stick*/
		for(var mCtrl:StickCtrl in stickArray){
			stickOutputArray.Push(mCtrl.myOutput);
		}
		/*button*/
		for(var mButton:ButtonCtrl in buttonArray){
			buttonOutputArray.Push(mButton.myOutput);
		}
		/*optionBar*/
		for(var mOptionBar:OptionBarCtrl in optionBarArray){
			optionBarOutputArray.Push(mOptionBar.myOutput);
		}
		outputInitFlag = true;
	}
	return optionBarOutputArray;
}
function GetStickData():Array{
	if(!outputInitFlag){
		/*stick*/
		for(var mCtrl:StickCtrl in stickArray){
			stickOutputArray.Push(mCtrl.myOutput);
		}
		/*button*/
		for(var mButton:ButtonCtrl in buttonArray){
			buttonOutputArray.Push(mButton.myOutput);
		}
		/*optionBar*/
		for(var mOptionBar:OptionBarCtrl in optionBarArray){
			optionBarOutputArray.Push(mOptionBar.myOutput);
		}
		outputInitFlag = true;
	}
	return stickOutputArray;
}
function GetButtonData():Array{
	if(!outputInitFlag){
		/*stick*/
		for(var mCtrl:StickCtrl in stickArray){
			stickOutputArray.Push(mCtrl.myOutput);
		}
		/*button*/
		for(var mButton:ButtonCtrl in buttonArray){
			buttonOutputArray.Push(mButton.myOutput);
		}
		/*optionBar*/
		for(var mOptionBar:OptionBarCtrl in optionBarArray){
			optionBarOutputArray.Push(mOptionBar.myOutput);
		}
		outputInitFlag = true;
	}
	return buttonOutputArray;
}
#if UNITY_EDITOR
function AddOptionBarCtrl(){
	var mOptionBar:OptionBarCtrl = gameObject.AddComponent(OptionBarCtrl);
	mOptionBar.Init("NewOptionBar" + optionBarArray.length);
	SycDisplayerCtrls();
}
function AddStickCtrl(){
	var mStick:StickCtrl = gameObject.AddComponent(StickCtrl);
	mStick.Init("NewStick" + stickArray.length);
	SycDisplayerCtrls();
}
function AddButtonCtrl(){
	var mStick:ButtonCtrl = gameObject.AddComponent(ButtonCtrl);
	mStick.Init("NewButton" + buttonArray.length);
	SycDisplayerCtrls();
}
#endif
function AddMessage(ctrlType:String,inputType:String,ctrlName:String,methodName:String,mGameObject:GameObject):boolean{
	if(!startFlag){
		return false;
	}
	switch(ctrlType){
		case "button":
			var mButton:ButtonDataOutput = null;
			for(var button:ButtonCtrl in buttonArray){
				if(button.myOutput.localName == ctrlName){
					mButton = button.myOutput;
					break;
				}
			}
			if(mButton == null){
				return false;
			}
			switch(inputType){
				case "begin":
					return mButton.AddOnBeginMessage(methodName,mGameObject);
				case "touch":
					return mButton.AddOnTouchMessage(methodName,mGameObject);
				case "end":
					return mButton.AddOnEndMessage(methodName,mGameObject);
				default:return false;
			}
			break;
		case "optionbar":
			var mOptionBar:OptionBarDataOutput = null;
			for(var optionBar:OptionBarCtrl in optionBarArray){
				if(optionBar.myOutput.localName == ctrlName){
					mOptionBar = optionBar.myOutput;
					break;
				}
			}
			if(mOptionBar == null){
				return false;
			}
			switch(inputType){
				case "begin":
					return mOptionBar.AddOnBeginMessage(methodName,mGameObject);
				case "touch":
					return mOptionBar.AddOnTouchMessage(methodName,mGameObject);
				case "end":
					return mOptionBar.AddOnEndMessage(methodName,mGameObject);
				default:return false;
			}
			break;
		case "stick":
			var mStick:StickDataOutput = null;
			for(var stick:StickCtrl in stickArray){
				if(stick.myOutput.localName == ctrlName){
					mStick = stick.myOutput;
					break;
				}
			}
			if(mStick == null){
				return false;
			}
			switch(inputType){
				case "begin":
					return mStick.AddOnBeginMessage(methodName,mGameObject);
				case "touch":
					return mStick.AddOnTouchMessage(methodName,mGameObject);
				case "end":
					return mStick.AddOnEndMessage(methodName,mGameObject);
				default:return false;
			}
			break;
		default:return false;
	}
}
function DelMessage(ctrlType:String,inputType:String,ctrlName:String,methodName:String,mGameObject:GameObject):boolean{
	if(!startFlag){
		return false;
	}
	switch(ctrlType){
		case "button":
			var mButton:ButtonDataOutput = null;
			for(var button:ButtonCtrl in buttonArray){
				if(button.myOutput.localName == ctrlName){
					mButton = button.myOutput;
					break;
				}
			}
			if(mButton == null){
				return false;
			}
			switch(inputType){
				case "begin":
					return mButton.DelOnBeginMessage(methodName,mGameObject);
				case "touch":
					return mButton.DelOnTouchMessage(methodName,mGameObject);
				case "end":
					return mButton.DelOnEndMessage(methodName,mGameObject);
				default:return false;
			}
			break;
		case "optionbar":
			var mOptionBar:OptionBarDataOutput = null;
			for(var optionBar:OptionBarCtrl in optionBarArray){
				if(optionBar.myOutput.localName == ctrlName){
					mOptionBar = optionBar.myOutput;
					break;
				}
			}
			if(mOptionBar == null){
				return false;
			}
			switch(inputType){
				case "begin":
					return mOptionBar.DelOnBeginMessage(methodName,mGameObject);
				case "touch":
					return mOptionBar.DelOnTouchMessage(methodName,mGameObject);
				case "end":
					return mOptionBar.DelOnEndMessage(methodName,mGameObject);
				default:return false;
			}
			break;
		case "stick":
			var mStick:StickDataOutput = null;
			for(var stick:StickCtrl in stickArray){
				if(stick.myOutput.localName == ctrlName){
					mStick = stick.myOutput;
					break;
				}
			}
			if(mStick == null){
				return false;
			}
			switch(inputType){
				case "begin":
					return mStick.DelOnBeginMessage(methodName,mGameObject);
				case "touch":
					return mStick.DelOnTouchMessage(methodName,mGameObject);
				case "end":
					return mStick.DelOnEndMessage(methodName,mGameObject);
				default:return false;
			}
			break;
		default:return false;
	}
}
function ClearMessage(ctrlType:String,inputType:String,ctrlName:String):boolean{
	if(!startFlag){
		return false;
	}
	switch(ctrlType){
		case "button":
			var mButton:ButtonDataOutput = null;
			for(var button:ButtonCtrl in buttonArray){
				if(button.myOutput.localName == ctrlName){
					mButton = button.myOutput;
					break;
				}
			}
			if(mButton == null){
				return false;
			}
			switch(inputType){
				case "begin":
					return mButton.ClearOnBeginMessage();
				case "touch":
					return mButton.ClearOnTouchMessage();
				case "end":
					return mButton.ClearOnEndMessage();
				default:return false;
			}
			break;
		case "optionbar":
			var mOptionBar:OptionBarDataOutput = null;
			for(var optionBar:OptionBarCtrl in optionBarArray){
				if(optionBar.myOutput.localName == ctrlName){
					mOptionBar = optionBar.myOutput;
					break;
				}
			}
			if(mOptionBar == null){
				return false;
			}
			switch(inputType){
				case "begin":
					return mOptionBar.ClearOnBeginMessage();
				case "touch":
					return mOptionBar.ClearOnTouchMessage();
				case "end":
					return mOptionBar.ClearOnEndMessage();
				default:return false;
			}
			break;
		case "stick":
			var mStick:StickDataOutput = null;
			for(var stick:StickCtrl in stickArray){
				if(stick.myOutput.localName == ctrlName){
					mStick = stick.myOutput;
					break;
				}
			}
			if(mStick == null){
				return false;
			}
			switch(inputType){
				case "begin":
					return mStick.ClearOnBeginMessage();
				case "touch":
					return mStick.ClearOnTouchMessage();
				case "end":
					return mStick.ClearOnEndMessage();
				default:return false;
			}
			break;
		default:return false;
	}
}

function ReCalculateSize(){
	for(var i:int = 0;i < displayInfoArray.length - 1; i++){
		for(var j:int = i+1;j < displayInfoArray.length; j++){
			var newLength:float;
			var localScale = 1.0f;
			var mCtrlI:KDisplayInfo = displayInfoArray[i];
			var mCtrlJ:KDisplayInfo = displayInfoArray[j];
			if(mCtrlI.reSizeAble == false&&mCtrlJ.reSizeAble == false){
				continue;
			}
			var distanceX:float = mCtrlI.screenRect.x + mCtrlI.screenRect.width/2 
									- mCtrlJ.screenRect.x - mCtrlJ.screenRect.width/2;
			distanceX = Mathf.Abs(distanceX);
			var distanceY:float = mCtrlI.screenRect.y + mCtrlI.screenRect.height/2 
									- mCtrlJ.screenRect.y - mCtrlJ.screenRect.height/2;
			distanceY = Mathf.Abs(distanceY);
			if(distanceY <= 1&&distanceX <= 1){
				continue;
			}
			var overlapLenX:float = (mCtrlI.screenRect.width + mCtrlJ.screenRect.width)/2 - distanceX;
			var overlapLenY:float = (mCtrlI.screenRect.height + mCtrlJ.screenRect.height)/2 - distanceY;
			
			/*both round shape*/
			if(mCtrlI.shapeType == ShapeType.round&&mCtrlJ.shapeType == ShapeType.round){
				var distanceXY:float =  Mathf.Sqrt(distanceX*distanceX + distanceY*distanceY);
				if(distanceXY < mCtrlI.screenRect.width/2 + mCtrlJ.screenRect.width/2){
					var overlapLenXY:float = (mCtrlI.screenRect.width + mCtrlJ.screenRect.width)/2 - distanceXY;
					if(mCtrlI.reSizeAble == false&&mCtrlJ.reSizeAble == true){
						localScale = (mCtrlJ.screenRect.width/2 - overlapLenXY)/(mCtrlJ.screenRect.width/2)*0.95f;
						if(localScale <= 0){
							localScale = 1.0f;
						}
					}
					else if(mCtrlJ.reSizeAble == false&&mCtrlI.reSizeAble == true){
						localScale = (mCtrlI.screenRect.width/2 - overlapLenXY)/(mCtrlI.screenRect.width/2)*0.95f;
						if(localScale <= 0){
							localScale = 1.0f;
						}
					}
					else{
						newLength = distanceXY*mCtrlI.screenRect.width/(mCtrlI.screenRect.width + mCtrlJ.screenRect.width);
						localScale = newLength/mCtrlI.screenRect.width*2*0.95;
						if(localScale <= 0){
							localScale = 1.0f;
						}
					}
				}
				setAllScale(localScale);
			}
			/*at least one is rectangle shape*/
			else if(overlapLenX >= 0&&overlapLenY >= 0){
				var xScale:float = 1.0f; 
				var yScale:float = 1.0f; 
				/*x overlap*/
				if(overlapLenX > 0){
					if(mCtrlI.reSizeAble == false&&mCtrlJ.reSizeAble == true){
						xScale = (mCtrlJ.screenRect.width/2 - overlapLenX)/(mCtrlJ.screenRect.width/2)*0.95;
						if(xScale <= 0){
							xScale = 1.0f;
						}
					}
					else if(mCtrlJ.reSizeAble == false&&mCtrlI.reSizeAble == true){
						xScale = (mCtrlI.screenRect.width/2 - overlapLenX)/(mCtrlI.screenRect.width/2)*0.95;
						if(xScale <= 0){
							xScale = 1.0f;
						}
					}
					else{
						newLength = distanceX*mCtrlI.screenRect.width/(mCtrlI.screenRect.width + mCtrlJ.screenRect.width);
						xScale = newLength/mCtrlI.screenRect.width*2*0.95;
						if(xScale <= 0){
							xScale = 1.0f;
						}
					}
				}
				/*y overlap*/
			    if(overlapLenY){
					if(mCtrlI.reSizeAble == false&&mCtrlJ.reSizeAble == true){
						yScale = (mCtrlJ.screenRect.height/2 - overlapLenY)/(mCtrlJ.screenRect.height/2)*0.95;
						if(yScale <= 0){
							yScale = 1.0f;
						}
					}
					else if(mCtrlJ.reSizeAble == false&&mCtrlI.reSizeAble == true){
						yScale = (mCtrlI.screenRect.height/2 - overlapLenY)/(mCtrlI.screenRect.height/2)*0.95;
						if(yScale <= 0){
							yScale = 1.0f;
						}
					}
					else{
						newLength = distanceY*mCtrlI.screenRect.height/(mCtrlI.screenRect.height + mCtrlJ.screenRect.height);
						yScale = newLength/mCtrlI.screenRect.height*2*0.95;
						if(yScale <= 0){
							yScale = 1.0f;
						}
					}
				}
				if(xScale == 1.0f){
					localScale = yScale;
				}
				else if(yScale == 1.0f){
					localScale = xScale;
				}
				else{
					if(yScale*mCtrlJ.screenRect.height > xScale*mCtrlJ.screenRect.width){
						localScale = yScale;
					}
					else {
						localScale = xScale;
					}
				}
				setAllScale(localScale);
			}
		}
	}
}
enum ShapeType{
	rectangle,
	round,
	ellipse,
}
class KDisplayInfo{
	var shapeType:ShapeType = ShapeType.rectangle;
	var localResolution:Vector2;
	var realShape:Rect = Rect(0,100,0,0);//members:ox,oy,rx,ry
	var screenRound:Rect;
	var screenRect:Rect;
	var reSizeAble:boolean = true;
	var squareRadius:float;
	var widthDHeight:float;
	function reScale(scale:float){
		if(true == reSizeAble){
			screenRound.width = screenRound.width*scale;
			screenRound.height = screenRound.height*scale;
			screenRect.x = screenRect.x + (screenRect.width/2*(1 - scale));
			screenRect.y = screenRect.y + (screenRect.height/2*(1 - scale));
			screenRect.width = screenRect.width*scale;
			screenRect.height = screenRect.height*scale;
		}
	}
	function GetRectInPixel (dpi:int,resolution:Vector2){
		/*convert a round shape to a rectangle shape*/
		localResolution = resolution;
		var tmpBack:float = 0;
		var border:float = resolution.x/20;
		if(resolution.x/20>resolution.y/20){
			border = resolution.y/20;
		}
		screenRect.width = realShape.width*dpi;
		screenRect.height = realShape.height*dpi;
		screenRect.x = resolution.x*realShape.x/100;
		screenRect.y = resolution.y*realShape.y/100;

		if((screenRect.x - screenRect.width/2) < border){
			screenRect.x = screenRect.width/2 + border;
		}
		if((screenRect.y - screenRect.height/2) < border){
			screenRect.y = screenRect.height/2 + border;
		}
		if((screenRect.x + screenRect.width/2) > resolution.x - border){
			screenRect.x = resolution.x - screenRect.width/2 - border;
		}
		if((screenRect.y + screenRect.height/2) > resolution.y - border){
			screenRect.y = resolution.y - screenRect.height/2 - border;
		}
		screenRect.x = screenRect.x - screenRect.width/2;
		screenRect.y = screenRect.y - screenRect.height/2;
		/*we don't need numbers after dot ~.~*/
		screenRect.x = Mathf.Floor(screenRect.x);
		screenRect.y = Mathf.Floor(screenRect.y);
		screenRect.width = Mathf.Floor(screenRect.width);
		screenRect.height = Mathf.Floor(screenRect.height);
		screenRound.x = screenRect.x + screenRect.width/2;
		screenRound.y = screenRect.y + screenRect.height/2;
		screenRound.width = screenRect.width/2;
		screenRound.height = screenRect.height/2;
		squareRadius = screenRound.width*screenRound.width;
		widthDHeight = screenRound.width/screenRound.height;
	}
}
class MessageManager{
	private var beginArray:Array;
	private var touchArray:Array;
	private var endArray:Array;
	private var arrayFlag:boolean = false;
	private class TouchMessage{
		var targetObject:GameObject;
		var targetMessage:String;
		function TouchMessage(message:String,object:GameObject){
			targetObject = object;
			targetMessage = message;
		}
	}
	private function CheckAdded(messageArray:Array,message:String,object:GameObject){
		for(var mMassage:TouchMessage in messageArray){
			if(mMassage.targetMessage == message&&mMassage.targetObject == object){
				return true;
			}
		}
		return false;
	}
	/*begin touch*/
	function AddOnBeginMessage(message:String,object:GameObject):boolean{
		if(!arrayFlag){
			beginArray = new Array();
			touchArray = new Array();
			endArray = new Array();
			arrayFlag = true;
		}
		if(CheckAdded(beginArray,message,object) == false){
			beginArray.Push(new TouchMessage(message,object));
			return true;
		}
		else{
			return false;
		}
	}
	function DelOnBeginMessage(message:String,object:GameObject):boolean{
		if(!arrayFlag){
			return false;
		}
		for(var mMassage:TouchMessage in beginArray){
			if(mMassage.targetMessage == message&&mMassage.targetObject == object){
				beginArray.Remove(mMassage);
				return true;
			}
		}
		return false;
	}
	function ClearOnBeginMessage():boolean{
		if(!arrayFlag){
			return false;
		}
		beginArray.Clear();
		return true;
	}
	function SendOnBeginMessages(){
		if(!arrayFlag){
			return false;
		}
		for(var mMassage:TouchMessage in beginArray){
			mMassage.targetObject.SendMessage(mMassage.targetMessage,this);
		}
	}
	/*still touch*/
	function AddOnTouchMessage(message:String,object:GameObject):boolean{
		if(!arrayFlag){
			beginArray = new Array();
			touchArray = new Array();
			endArray = new Array();
			arrayFlag = true;
		}
		if(CheckAdded(touchArray,message,object) == false){
			touchArray.Push(new TouchMessage(message,object));
			return true;
		}
		else{
			return false;
		}
	}
	function DelOnTouchMessage(message:String,object:GameObject):boolean{
		if(!arrayFlag){
			return false;
		}
		for(var mMassage:TouchMessage in touchArray){
			if(mMassage.targetMessage == message&&mMassage.targetObject == object){
				touchArray.Remove(mMassage);
				return true;
			}
		}
		return false;
	}
	function ClearOnTouchMessage():boolean{
		if(!arrayFlag){
			return false;
		}
		touchArray.Clear();
		return true;
	}
	function SendOnTouchMessages(){
		if(!arrayFlag){
			return false;
		}
		for(var mMassage:TouchMessage in touchArray){
			mMassage.targetObject.SendMessage(mMassage.targetMessage,this);
		}
	}
	/*end touch*/
	function AddOnEndMessage(message:String,object:GameObject):boolean{
		if(!arrayFlag){
			beginArray = new Array();
			touchArray = new Array();
			endArray = new Array();
			arrayFlag = true;
		}
		if(CheckAdded(endArray,message,object) == false){
			endArray.Push(new TouchMessage(message,object));
			return true;
		}
		else{
			return false;
		}
	}
	function DelOnEndMessage(message:String,object:GameObject):boolean{
		if(!arrayFlag){
			return false;
		}
		for(var mMassage:TouchMessage in endArray){
			if(mMassage.targetMessage == message&&mMassage.targetObject == object){
				endArray.Remove(mMassage);
				return true;
			}
		}
		return false;
	}
	function ClearOnEndMessage():boolean{
		if(!arrayFlag){
			return false;
		}
		endArray.Clear();
		return true;
	}
	function SendOnEndMessages(){
		if(!arrayFlag){
			return false;
		}
		for(var mMassage:TouchMessage in endArray){
			mMassage.targetObject.SendMessage(mMassage.targetMessage,this);
		}
	}
}