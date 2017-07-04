#pragma strict
var useMessage:boolean = true;
private var stickArray:Array;
private var itemArray:Array;
var mJoy:KCtrlRoot;
var mIndicator:DebugIndicator;
function Start () {
	mJoy = GameObject.Find("JoyStick").GetComponent(KCtrlRoot);
	mIndicator = GameObject.Find("DebugObject").GetComponent(DebugIndicator);
	stickArray = mJoy.GetStickData();
	itemArray = mIndicator.itemArray;
	if(!useMessage){
		if(stickArray != null){
			Debug.Log("stickArray.length = " + stickArray.length);
			for(var output:StickDataOutput in stickArray){
				mIndicator.AddDebugItem(output.localName,"");
			}
		}
	}
	else{
		if(stickArray != null){
			Debug.Log("stickArray.length = " + stickArray.length);
			for(var output:StickDataOutput in stickArray){
				mIndicator.AddDebugItem(output.localName,"");
				output.AddOnBeginMessage("onStickTouch",gameObject);
				output.AddOnTouchMessage("onStickTouch",gameObject);
				output.AddOnEndMessage("onStickTouch",gameObject);
			}
		}
	}
}

function FixedUpdate () {
	var mIterm:DebugItem;
	var i:int;
	if(!useMessage){
		for(i= 0; i < stickArray.length;i++){
			var mStickData:StickDataOutput;
			mStickData = stickArray[i];
			mIterm = itemArray[i];
			mIterm.localContent = "";
			if(mIterm.localName == "LeftJoy"){
				if(mStickData.localPosition.x < 0.5&&mStickData.localPosition.x > -0.5){
					if(mStickData.localPosition.y > 0.5){
						mIterm.localContent = " Direction: up";
					}
					else if(mStickData.localPosition.y < -0.5){
						mIterm.localContent = " Direction: down";
					}
				}
				if(mStickData.localPosition.y < 0.5&&mStickData.localPosition.y > -0.5){
					if(mStickData.localPosition.x > 0.5){
						mIterm.localContent = " Direction: right";
					}
					else if(mStickData.localPosition.x < -0.5){
						mIterm.localContent = " Direction: left";
					}
				}
				mIterm.localContent = mIterm.localContent + " Touch:" + mStickData.touchStatus.ToString();
			}
			else{
				mIterm.localContent = " Position:" + mStickData.localPosition.ToString();
			}
			mIterm.localContent = " Touch:" + mStickData.touchStatus.ToString() + mIterm.localContent;
			mIndicator.ShowItem(mIterm);
		}
	}
}

function onStickTouch(object:Object){
	var output:StickDataOutput = object;
	var mIterm:DebugItem = FindItemByName(output.localName);
	if(output.localName == "back"){
		Application.LoadLevel(0);
	}
	if(mIterm != null){
		if(mIterm.localName == "LeftJoy"){
			mIterm.localContent = "";
			if(output.localPosition.x < 0.5&&output.localPosition.x > -0.5){
				if(output.localPosition.y > 0.5){
					mIterm.localContent = " Direction: up";
				}
				else if(output.localPosition.y < -0.5){
					mIterm.localContent = " Direction: down";
				}
			}
			if(output.localPosition.y < 0.5&&output.localPosition.y > -0.5){
				if(output.localPosition.x > 0.5){
					mIterm.localContent = " Direction: right";
				}
				else if(output.localPosition.x < -0.5){
					mIterm.localContent = " Direction: left";
				}
			}
		}
		else{
			mIterm.localContent = " Position:" + output.localPosition.ToString();
		}
		mIterm.localContent = " Touch:" + output.touchStatus.ToString() + mIterm.localContent;
		mIndicator.ShowItem(mIterm);
	}
}
function FindItemByName(name:String):DebugItem{
	for(var mItem:DebugItem in itemArray){
		if(mItem.localName == name){
			return mItem;
		}
	}
	return null;
}