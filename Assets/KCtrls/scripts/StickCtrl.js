#pragma strict
class StickDataOutput extends MessageManager{
	//do not change veriables in this class Just read them
	var localName:String;
	var touchStatus:boolean = false;
	var localPosition:Vector2;
	private var lastTouchStatus:boolean = false;
	private var lastLocalPosition:Vector2;
	private var enableFlag:boolean = true;
	
	function SetLastStatus(status:boolean){
		if(lastTouchStatus == false&&status == true){
			SendOnBeginMessages();
		}
		else if(lastTouchStatus == true&&status == false){
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
class StickCtrl extends MonoBehaviour{
	/*Array section*/
	var displayInfo:KDisplayInfo;
	var myOutput:StickDataOutput;

	var texture:Texture;
	var screenAlpha:float = 1.0f;

	/*indicator section*/
	var hasTouchIndicator:boolean = false;
	var IndicatorInOrigin:boolean = false;
	var touchIndicatorDiameter:float;
	var touchRect:Rect;
	var touchTexture:Texture;
	var touchAlpha:float = 0.5f;
	var touchOriginRect:Rect;
	function Init(name:String){
		displayInfo = new KDisplayInfo();
		myOutput = new StickDataOutput();
		myOutput.localName = name;
		displayInfo.shapeType = ShapeType.round;
	}
	function ResetIndicator(dpi:int){
		touchOriginRect.width = touchOriginRect.height = touchRect.width = touchRect.height = touchIndicatorDiameter*dpi;
		touchOriginRect.x = displayInfo.screenRound.x - touchOriginRect.width/2;
		touchOriginRect.y = displayInfo.screenRound.y - touchOriginRect.height/2;
	}
	function DrawGUI () {
		if(!myOutput.GetEnable()){
			return;
		}
		GUI.color.a = screenAlpha;
		GUI.DrawTexture(displayInfo.screenRect,texture);
		if(myOutput.touchStatus&&hasTouchIndicator){	
			GUI.color.a = touchAlpha;
			GUI.DrawTexture(touchRect,touchTexture);
		}
		else if(myOutput.touchStatus == false&&IndicatorInOrigin){	
			GUI.color.a = touchAlpha;
			GUI.DrawTexture(touchOriginRect,touchTexture);
		}
	}
	function IsTouched(mPoint:Vector2):boolean{
		if(!myOutput.GetEnable()){
			return false;
		}
		var localPoint:Vector2;
		localPoint.x = mPoint.x - displayInfo.screenRound.x;
		localPoint.y = displayInfo.localResolution.y - mPoint.y - displayInfo.screenRound.y;
		if((localPoint.x*localPoint.x + localPoint.y*localPoint.y) > displayInfo.squareRadius){
		myOutput.touchStatus = false;
		}
		else{
			myOutput.localPosition.x = localPoint.x/displayInfo.screenRound.width;
			myOutput.localPosition.y = -localPoint.y/displayInfo.screenRound.width;
			touchRect.x = mPoint.x - touchRect.width/2;
			touchRect.y = (displayInfo.localResolution.y - mPoint.y) - touchRect.height/2;
			myOutput.touchStatus = true;
		}
		return myOutput.touchStatus;
	}
}
