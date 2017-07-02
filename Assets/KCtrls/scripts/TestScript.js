#pragma strict
var useMessage:boolean = true;
private var stickArray:Array;
private var buttonArray:Array;
private var optionBarArray:Array;
private var itemArray:Array;
var mJoy:KCtrlRoot;
function Start () {
	mJoy = GameObject.Find("JoyStick").GetComponent(KCtrlRoot);
	var mIndicator:DebugIndicator = GameObject.Find("DebugObject").GetComponent(DebugIndicator);
	stickArray = mJoy.GetStickData();
	buttonArray = mJoy.GetButtonData();
	optionBarArray = mJoy.GetOptionBarData();
	itemArray = mIndicator.itemArray;
	if(!useMessage){
		mIndicator.AddDebugItem("stickQ","");
		mIndicator.AddDebugItem("buttonQ","");
		mIndicator.AddDebugItem("optionQ","");
	}
	else{
		if(stickArray != null){
			mIndicator.AddDebugItem("stickM","");
			Debug.Log("stickArray.length = " + stickArray.length);
			for(var output:StickDataOutput in stickArray){
				output.AddOnBeginMessage("onStickTouch",gameObject);
				output.AddOnTouchMessage("onStickTouch",gameObject);
				output.AddOnEndMessage("onStickTouch",gameObject);
			}
		}
		if(buttonArray != null){
			mIndicator.AddDebugItem("buttonM","");
			Debug.Log("buttonArray.length = " + buttonArray.length);
			for(var output:ButtonDataOutput in buttonArray){
				output.AddOnBeginMessage("onButtonTouch",gameObject);
				output.AddOnTouchMessage("onButtonTouch",gameObject);
				output.AddOnEndMessage("onButtonTouch",gameObject);
			}
		}
		if(optionBarArray != null){
			Debug.Log("optionBarArray.length = " + optionBarArray.length);
			mIndicator.AddDebugItem("optionBarM","");
			for(var output:OptionBarDataOutput in optionBarArray){
				output.AddOnBeginMessage("onOptionBarTouch",gameObject);
				output.AddOnTouchMessage("onOptionBarTouch",gameObject);
				output.AddOnEndMessage("onOptionBarTouch",gameObject);
			}
		}
	}
}

function FixedUpdate () {
	var mIterm:DebugItem;
	var i:int;
	if(!useMessage){
		for(i = 0; i < stickArray.length;i++){
			var mStickData:StickDataOutput;
			mStickData = stickArray[i];
			mIterm = itemArray[0];
			mIterm.localName = mStickData.localName;
			if(mStickData.touchStatus){
				mIterm.localContent = mStickData.localName + " " + mStickData.touchStatus.ToString() + " " + mStickData.localPosition.ToString();
			}	
		}
		for(i= 0; i < buttonArray.length;i++){
			var mButtonData:ButtonDataOutput;
			mButtonData = buttonArray[i];
			mIterm = itemArray[1];
			mIterm.localName = mButtonData.localName;
			mIterm.localContent = mButtonData.touchStatus.ToString() + " statusName:" + mButtonData.statusName + " index:" + mButtonData.index.ToString();
		}
		for(i= 0; i < optionBarArray.length;i++){
			var mOptionBarData:OptionBarDataOutput;
			mOptionBarData = optionBarArray[i];
			mIterm = itemArray[2];
			mIterm.localName = mOptionBarData.localName;
			mIterm.localContent = "index:" + mOptionBarData.index.ToString() + " itemNum:" + mOptionBarData.itemNum.ToString();
		}
	}
}
function onStickTouch(object:Object){
	var mIterm:DebugItem;
	mIterm = itemArray[0];
	var output:StickDataOutput = object;
	mIterm.localContent = output.localName + " " + output.touchStatus.ToString() + " " + output.localPosition.ToString();
}

function onButtonTouch(object:Object){
	var mIterm:DebugItem;
	mIterm = itemArray[1];
	var output:ButtonDataOutput = object;
	mIterm.localContent = output.touchStatus.ToString() + " statusName:" + output.statusName + " index:" + output.index.ToString();
}
function onOptionBarTouch(object:Object){
	var mIterm:DebugItem = itemArray[2];
	var output:OptionBarDataOutput = object;
	mIterm.localContent = "index:" + output.index.ToString() + " itemNum:" + output.itemNum.ToString();
}