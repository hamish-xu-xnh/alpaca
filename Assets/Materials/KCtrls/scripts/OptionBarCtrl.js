#pragma strict
class OptionBarDataOutput extends MessageManager{
	var localName:String;
	var itemName:String;
	var index:int = 0;
	var itemNum:int = 1;
	var nameArray:Array;
	var touchStatus:boolean = false;
	var optionBarStatus:OptionBarStatus;
	var fadeFlag:boolean = false;
	var fadeTime:float = 0.5f;
	var fadingTime:float = 0.0f;
	var fadePositive:float = 1.0f;
	private var lastTouchStatus:boolean = false;
	private var enableFlag:boolean = true;
	function SetLastStatus(status:boolean){
		if(lastTouchStatus == false&&status == true){
			if(optionBarStatus == OptionBarStatus.on){
				if(fadeFlag){
					fadingTime = fadeTime;
					fadePositive = -1.0f;
					optionBarStatus = OptionBarStatus.animate;
				}
				else{
					optionBarStatus = OptionBarStatus.off;
				}
			}
			else{
				if(fadeFlag){
					fadingTime = 0.0f;
					fadePositive = 1.0f;
					optionBarStatus = OptionBarStatus.animate;
				}
				else{
					optionBarStatus = OptionBarStatus.on;
				}
			}
			if(index != itemNum){
				itemName = nameArray[index];
				SendOnBeginMessages();
			}
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
enum LayoutType{
	line = 0,
	ring = 1,
}
enum OptionBarStatus{
	off = 0,
	animate = 1,
	on = 2,
}
class OptionBarCtrl extends MonoBehaviour{
	/*Layout paramenters*/
	var resolution:Vector2;
	var rootPosition:Vector4;
	var rootPoint:Vector2;
	var rotateAngle:float;
	var displayInfo:KDisplayInfo;
	var firstDistance:float;
	var myOutput:OptionBarDataOutput;
	
	var itemSize:Vector2;
	var itemDistance:float;
	var itemLayoutType:LayoutType;

	/*alpha*/
	var rootAlpha:float = 1.0f;
	var backgroundAlpha:float = 1.0f;
	var itemAlpha:float = 1.0f;
	
	/*shapeType*/
	var rootShape:ShapeType = ShapeType.round;
	var itemtShape:ShapeType = ShapeType.round;
	
	/*texture*/
	var rootTexture:Texture;
	var backgroundTexture:Texture;
	var itemsTexture:Texture;
	
	/*array*/
	var itemRectArray:Array;
	var itemTextureRectArray:Array;
	var nameArray:Array;
	var itemInfoArray:Array;
	
	var rootRotate:boolean = false;
	var rootRect:Rect;
	var nameStrings:String = "\n";
	private var originPoint:Vector2;
	private var xScale:float;
	private var yScale:float;
	
	var testPoint:Vector2;
	#if UNITY_EDITOR
	function Init(name:String){
		displayInfo = new KDisplayInfo();
		myOutput = new OptionBarDataOutput();
		myOutput.localName = name;
		displayInfo.shapeType = ShapeType.rectangle;
		displayInfo.reSizeAble = false;
		nameArray = new Array();
		itemRectArray = new Array();
		itemTextureRectArray = new Array();
	}
	#endif
	function DrawGUI(){
		var i:int;
		var mItemRect:Rect;
		var mTextureRect:Rect;
		if(myOutput.optionBarStatus == OptionBarStatus.on){
			GUI.color.a = backgroundAlpha;
			GUIUtility.RotateAroundPivot(rotateAngle,rootPoint);
			GUI.DrawTexture(displayInfo.screenRect,backgroundTexture);
			GUI.color.a = rootAlpha;
			if(rootRotate){
				GUI.DrawTexture(rootRect,rootTexture);
				GUIUtility.RotateAroundPivot(-rotateAngle,rootPoint);
			}
			else{
				GUIUtility.RotateAroundPivot(-rotateAngle,rootPoint);
				GUI.DrawTexture(rootRect,rootTexture);
			}
			
			GUI.color.a = itemAlpha;
			for(i = 0; i < myOutput.itemNum; i++){
				mItemRect = itemRectArray[i];
				mTextureRect = itemTextureRectArray[i];
				GUI.DrawTextureWithTexCoords(mItemRect,itemsTexture,mTextureRect);
			}
		}
		else if(myOutput.optionBarStatus == OptionBarStatus.off){
			GUI.color.a = rootAlpha;
			if(rootRotate){
				GUIUtility.RotateAroundPivot(rotateAngle,rootPoint);
				GUI.DrawTexture(rootRect,rootTexture);
				GUIUtility.RotateAroundPivot(-rotateAngle,rootPoint);
			}
			else{
				GUI.DrawTexture(rootRect,rootTexture);
			}
			
		}
		else{
			myOutput.fadingTime += Time.fixedDeltaTime*myOutput.fadePositive;
			var fadeCoefficient:float = myOutput.fadingTime/myOutput.fadeTime;
			if(myOutput.fadingTime >= myOutput.fadeTime){
				myOutput.optionBarStatus = OptionBarStatus.on;
				fadeCoefficient = 1.0f;
			}
			else if(myOutput.fadingTime <= 0){
				myOutput.optionBarStatus = OptionBarStatus.off;
				fadeCoefficient = 0;
			}
			GUI.color.a = backgroundAlpha*fadeCoefficient;
			GUIUtility.RotateAroundPivot(rotateAngle,rootPoint);
			GUI.DrawTexture(displayInfo.screenRect,backgroundTexture);
			GUI.color.a = rootAlpha;
			if(rootRotate){
				GUI.DrawTexture(rootRect,rootTexture);
				GUIUtility.RotateAroundPivot(-rotateAngle,rootPoint);
			}
			else{
				GUIUtility.RotateAroundPivot(-rotateAngle,rootPoint);
				GUI.DrawTexture(rootRect,rootTexture);
			}
			GUI.color.a = itemAlpha*fadeCoefficient;
			for(i = 0; i < myOutput.itemNum; i++){
				mItemRect = itemRectArray[i];
				mTextureRect = itemTextureRectArray[i];
				GUI.DrawTextureWithTexCoords(mItemRect,itemsTexture,mTextureRect);
			}
		}
	}
	function IsTouched(mPoint:Vector2):boolean{
		if(!myOutput.GetEnable()){
			return false;
		}
		var i:int;
		var mItemRect:Rect;
		if(myOutput.optionBarStatus == OptionBarStatus.on){
			if(rootShape == ShapeType.rectangle){
				if(WithinRect(mPoint,rootRect)){
					myOutput.index = myOutput.itemNum;
					return true;
				}
			}
			else{
				if(WithinRound(mPoint,rootRect)){
					myOutput.index = myOutput.itemNum;
					return true;
				}
			}
			if(itemtShape == ShapeType.rectangle){
				for(i = 0; i < myOutput.itemNum; i++){
					mItemRect = itemRectArray[i];
					if(WithinRect(mPoint,mItemRect)){
						myOutput.index = i;
						return true;
					}
				}
			}
			else{
				for(i = 0; i < myOutput.itemNum; i++){
					mItemRect = itemRectArray[i];
					if(WithinRound(mPoint,mItemRect)){
						myOutput.index = i;
						return true;
					}
				}
			}
			myOutput.touchStatus = false;
			return false;
		}
		else if(myOutput.optionBarStatus == OptionBarStatus.off){
			if(rootShape == ShapeType.rectangle){
				if(WithinRect(mPoint,rootRect)){
					myOutput.index = myOutput.itemNum;
					return true;
				}
			}
			else{
				if(WithinRound(mPoint,rootRect)){
					myOutput.index = myOutput.itemNum;
					return true;
				}
			}
			myOutput.touchStatus = false;
			return false;
		}
		else{
			return false;
		}
	}
	private function WithinRect(point:Vector2,rect:Rect):boolean{
		var localPoint:Vector2;
		localPoint.x = point.x;
		localPoint.y = displayInfo.localResolution.y - point.y;
		if(localPoint.x < rect.xMin||localPoint.x > rect.xMax||
			localPoint.y < rect.yMin||localPoint.y > rect.yMax){
			myOutput.touchStatus = false;
		}
		else{
			myOutput.touchStatus = true;
		}
		return myOutput.touchStatus;
	}
	private function WithinRound(point:Vector2,round:Rect):boolean{
		Debug.Log("round = " + round);
		var localPoint:Vector2;
		var mRect:Rect = round;
		mRect.x = mRect.x + round.width/2;
		mRect.y = mRect.y + round.height/2;
		mRect.width /= 2;
		mRect.height /= 2;
		Debug.Log("mRect = " + mRect);
		var squareRadius:int = mRect.width*mRect.width;
		localPoint.x = point.x - mRect.x;
		localPoint.y = displayInfo.localResolution.y - point.y - mRect.y;
		localPoint.y /= (round.width/round.height);
		Debug.Log("localPoint = " + localPoint);
		if((localPoint.x*localPoint.x + localPoint.y*localPoint.y) > squareRadius){
			myOutput.touchStatus = false;
		}
		else{
			myOutput.touchStatus = true;
		}
		Debug.Log("myOutput.touchStatus = " + myOutput.touchStatus.ToString());
		return myOutput.touchStatus;
	}
	private function getItemTexCoord(index:int):Rect{
		var mRect:Rect;
		var step:float = 1.0f/myOutput.itemNum;
		mRect.x = 0;
		mRect.y = step*(myOutput.itemNum -1 - index);
		mRect.width = 1.0f;
		mRect.height = step;
		return mRect;
	}
	private function BackToScreenPoint(mPoint:Vector2):Vector2{
		var point:Vector2;
		point.x = (mPoint.x - resolution.x/2)*xScale + originPoint.x;
		point.y = (mPoint.y - resolution.y/2)*yScale + originPoint.y;
		return point;
	}
	private function GetItemRectByCenteraAndWH(center:Vector2,width:int,height:int):Rect{
		var mRect:Rect;
		var mPoint:Vector2;
		mRect.width = width*xScale;
		mRect.height = height*yScale;
		mPoint = BackToScreenPoint(center);
		mRect.x = mPoint.x - mRect.width/2;
		mRect.y = mPoint.y - mRect.height/2;
		return mRect;
	}
	private function RotatePoint(point:Vector2,origin:Vector2,angle:float):Vector2{
		var vector:Vector2 = origin - point;
		vector.y = -vector.y;
		var point3:Vector3 = Vector3.zero;
		point3.x = vector.x;
		point3.y = vector.y;
		var m:Matrix4x4 = Matrix4x4.identity;
		var sin:float = Mathf.Sin(Mathf.Deg2Rad*angle);
		var cos:float = Mathf.Cos(Mathf.Deg2Rad*angle);
		var row:Vector4 = m.GetRow(0);
		row.x = cos;
		row.y = sin*(-1.0f);
		m.SetRow(0,row);
		row = m.GetRow(1);
		row.x = sin;
		row.y = cos;
		m.SetRow(1,row);
		point3 = m.MultiplyPoint3x4(point3);
		vector.x = point3.x;
		vector.y = point3.y;
		vector = vector + origin;
		return vector;
	}
	function GetAllRects(dpi:int){
		var origin:Vector2;
		origin.x = rootPosition.x;
		origin.y = rootPosition.y;
		rootPoint = BackToScreenPoint(origin);
		rootRect = GetItemRectByCenteraAndWH(origin,rootPosition.z,rootPosition.w);
		var firstItemCenter:Vector2 = origin;
		firstItemCenter.y += firstDistance;
		var mRect:Rect; 
		var tmpPoint:Vector2;
		var i:int;
		if(itemLayoutType == LayoutType.ring){
			for(i = 0; i < myOutput.itemNum; i++){
				tmpPoint = RotatePoint(firstItemCenter,origin,(itemDistance*i + rotateAngle));
				mRect = GetItemRectByCenteraAndWH(tmpPoint,itemSize.x,itemSize.y);
				itemRectArray[i] = mRect;
				itemTextureRectArray[i] = getItemTexCoord(i);
			}
		}
		else{
			for(i = 0; i < myOutput.itemNum; i++){
				tmpPoint.x = origin.x;
				tmpPoint.y = origin.y + firstDistance + itemDistance*i;
				tmpPoint = RotatePoint(tmpPoint,origin,rotateAngle);
				mRect = GetItemRectByCenteraAndWH(tmpPoint,itemSize.x,itemSize.y);
				itemRectArray[i] = mRect;
				itemTextureRectArray[i] = getItemTexCoord(i);
			}
		}
	}
	function LoadData(){
		var i:int;
		if(itemRectArray == null){
			itemRectArray = new Array();
			for(i = 0;i < myOutput.itemNum; i++){
				itemRectArray.Push(Rect(0,0,0,0));
			}
		}
		if(itemTextureRectArray == null){
			itemTextureRectArray = new Array();
			for(i = 0;i < myOutput.itemNum; i++){
				itemTextureRectArray.Push(Rect(0,0,0,0));
			}
		}
		if(nameArray == null){
			nameArray = new Array();
		}
		LoadOptionBarNames();
		if(backgroundTexture!=null){
			resolution.x = backgroundTexture.width;
			resolution.y = backgroundTexture.height;
		}
		else{
			resolution.x = 100;
			resolution.y = 100;
		}
		originPoint.x = displayInfo.screenRect.x + displayInfo.screenRect.width/2;
		originPoint.y = displayInfo.screenRect.y + displayInfo.screenRect.height/2;
		xScale = displayInfo.screenRect.width/resolution.x;
		yScale = displayInfo.screenRect.height/resolution.y;
	}
	#if UNITY_EDITOR
	function SaveData(){
		var tmpNames:String;
		var i:int;
		for(i = 0;i < myOutput.itemNum; i++){
			tmpNames += nameArray[i] + "\n";
		}
		nameStrings = tmpNames.Clone();
	}
	function SycData(){
		var i:int;
		var Arraylength:int = nameArray.length;
		if(myOutput.itemNum > Arraylength){
			for(i = 0;i < myOutput.itemNum - Arraylength; i++){
				nameArray.Push("status" + (i + Arraylength));
			}
		}
		else{
			for(i = 0;i < Arraylength - myOutput.itemNum; i++){
				nameArray.Pop();
			}
		}
		Arraylength = itemRectArray.length;
		if(myOutput.itemNum > Arraylength){
			for(i = 0;i < myOutput.itemNum - Arraylength; i++){
				itemRectArray.Push(Rect(0,0,0,0));
			}
		}
		else{
			for(i = 0;i < Arraylength - myOutput.itemNum; i++){
				itemRectArray.Pop();
			}
		}
		Arraylength = itemTextureRectArray.length;
		if(myOutput.itemNum > Arraylength){
			for(i = 0;i < myOutput.itemNum - Arraylength; i++){
				itemTextureRectArray.Push(Rect(0,0,0,0));
			}
		}
		else{
			for(i = 0;i < Arraylength - myOutput.itemNum; i++){
				itemTextureRectArray.Pop();
			}
		}
	}
	#endif
	function LoadOptionBarNames(){
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