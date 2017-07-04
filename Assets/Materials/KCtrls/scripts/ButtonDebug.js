#pragma strict
var useMessage:boolean = true;
private var stickArray:Array;
private var buttonArray:Array;
private var optionBarArray:Array;
private var itemArray:Array;
var mJoy:KCtrlRoot;
var mIndicator:DebugIndicator;
function Start () {
	mJoy = GameObject.Find("Button").GetComponent(KCtrlRoot);
	mIndicator = GameObject.Find("DebugObject").GetComponent(DebugIndicator);
	stickArray = mJoy.GetStickData();
	buttonArray = mJoy.GetButtonData();
	optionBarArray = mJoy.GetOptionBarData();
	itemArray = mIndicator.itemArray;
	if(!useMessage){
		if(buttonArray != null){
			Debug.Log("buttonArray.length = " + buttonArray.length);
			for(var output:ButtonDataOutput in buttonArray){
				mIndicator.AddDebugItem(output.localName,"");
			}
		}
	}
	else{
		if(buttonArray != null){
			Debug.Log("buttonArray.length = " + buttonArray.length);
			for(var output:ButtonDataOutput in buttonArray){
				mIndicator.AddDebugItem(output.localName,"");
				output.AddOnBeginMessage("onButtonTouch",gameObject);
				output.AddOnTouchMessage("onButtonTouch",gameObject);
				output.AddOnEndMessage("onButtonTouch",gameObject);
			}
		}
	}
}

function FixedUpdate () {
	var mIterm:DebugItem;
	var i:int;
	if(!useMessage){
		for(i= 0; i < buttonArray.length;i++){
			var mButtonData:ButtonDataOutput;
			mButtonData = buttonArray[i];
			mIterm = itemArray[i];
			mIterm.localName = mButtonData.localName;
			mIterm.localContent = mButtonData.touchStatus.ToString() + " statusName:" + mButtonData.statusName + " index:" + mButtonData.index.ToString();
		}
	}
}


function onButtonTouch(object:Object){
	var output:ButtonDataOutput = object;
	var mIterm:DebugItem = FindItemByName(output.localName);
	if(output.localName == "back"){
		Application.LoadLevel(0);
	}
	if(mIterm != null){
		mIterm.localContent = "Status:" + output.statusName + " Touch:" + output.touchStatus.ToString() + " Index:" + output.index.ToString();
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