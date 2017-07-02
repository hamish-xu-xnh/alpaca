#pragma strict
class ButtonDataOutput extends MessageManager{
	var localName:String;
	var statusName:String;
	var nameArray:Array;
	var touchStatus:boolean = false;
	var index:int = 0;
	var buttonStatusNum:int = 1;
	private var lastTouchStatus:boolean = false;
	private var enableFlag:boolean = true;
	private class TouchMessage{
		var targetObject:GameObject;
		var targetMessage:String;
		function TouchMessage(message:String,object:GameObject){
			targetObject = object;
			targetMessage = message;
		}
	}
	function SetLastStatus(status:boolean){
		if(lastTouchStatus == false&&status == true){
			SendOnBeginMessages();
		}
		else if(lastTouchStatus == true&&status == false){
			index++;
			index = index%buttonStatusNum;
			statusName = nameArray[index];
			SendOnEndMessages();
		}
		else if(lastTouchStatus == true&&status == true) {
			SendOnTouchMessages();
		}
		lastTouchStatus = status;
	}
	function SetEnable(enable:boolean){
		enableFlag = enable;
		if(!enableFlag){
			touchStatus = false;
		}
	}
	function GetEnable():boolean{
		return enableFlag;
	}
}
class ButtonCtrl extends MonoBehaviour{
	var displayInfo:KDisplayInfo;
	var myOutput:ButtonDataOutput;
	
	var screenAlpha:float = 1.0f;
	
	var nameArray:Array;
	var texture:Texture;
	var currentTexCoord:Rect = Rect(0,0,1,1);
	var nameStrings:String = "\n";
	function Init(name:String){
		displayInfo = new KDisplayInfo();
		myOutput = new ButtonDataOutput();
		myOutput.localName = name;
		displayInfo.shapeType = ShapeType.round;
		nameArray = new Array();
	}
	function getCurrentTexCoord(){
		var step:float = 1.0f/myOutput.buttonStatusNum;
		currentTexCoord.y = step*(myOutput.buttonStatusNum -1 - myOutput.index);
		currentTexCoord.height = step;
	}
	function DrawGUI(){
		if(!myOutput.GetEnable()){
			return;
		}
		GUI.color.a = screenAlpha;
		GUI.DrawTextureWithTexCoords(displayInfo.screenRect,texture,currentTexCoord);
	}
	function IsTouched(mPoint:Vector2):boolean{
		if(!myOutput.GetEnable()){
			return false;
		}
		var localPoint:Vector2;
		if(displayInfo.shapeType == ShapeType.rectangle){
			localPoint.x = mPoint.x;
			localPoint.y = displayInfo.localResolution.y - mPoint.y;
			if(localPoint.x < displayInfo.screenRect.xMin||localPoint.x > displayInfo.screenRect.xMax||
					localPoint.y < displayInfo.screenRect.yMin||localPoint.y > displayInfo.screenRect.yMax){
				myOutput.touchStatus = false;
			}
			else{
				myOutput.touchStatus = true;
			}
		}
		else {
			localPoint.x = mPoint.x - displayInfo.screenRound.x;
			localPoint.y = displayInfo.localResolution.y - mPoint.y - displayInfo.screenRound.y;
			if(displayInfo.shapeType == ShapeType.ellipse){
				localPoint.y /= displayInfo.widthDHeight;
			}
			if((localPoint.x*localPoint.x + localPoint.y*localPoint.y) > displayInfo.squareRadius){
				myOutput.touchStatus = false;
			}
			else{
				myOutput.touchStatus = true;
			}
		}
		return myOutput.touchStatus;
	}
	function LoadData(){
		if(nameArray == null){
			nameArray = new Array();
		}
		LoadButtonNames();
	}
	#if UNITY_EDITOR
	function SaveData(){
		var tmpNames:String;
		var i:int;
		for(i = 0;i < myOutput.buttonStatusNum; i++){
			tmpNames += nameArray[i] + "\n";
		}
		nameStrings = tmpNames.Clone();
	}
	function SycData(){
		var i:int;
		var nameArraylength:int = nameArray.length;
		if(myOutput.buttonStatusNum > nameArraylength){
			for(i = 0;i < myOutput.buttonStatusNum - nameArraylength; i++){
				nameArray.Push("status" + (i + nameArraylength));
			}
		}
		else{
			for(i = 0;i < nameArraylength - myOutput.buttonStatusNum; i++){
				nameArray.Pop();
			}
		}
	}
	#endif
	function LoadButtonNames(){
		var tmpString:String;
		var tmpNum = 0;
		//Debug.Log("nameStrings = " + nameStrings);
		for(var i:int = 0; i < nameStrings.length;i++){
			if(nameStrings[i] != "\n"){
				tmpString = tmpString + nameStrings[i];
			}
			else{
				if(i == 0){
					nameArray.Push("status" + i);
				}
				else{
					nameArray[tmpNum] = tmpString.Clone();
				}
				tmpNum++;
				tmpString = "";
			}
		}
		myOutput.nameArray = nameArray;
	}
}

