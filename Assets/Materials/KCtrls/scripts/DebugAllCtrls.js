#pragma strict
private var stickArray:Array;
private var buttonArray:Array;
private var optionBarArray:Array;
private var itemArray:Array;
var useMessage:boolean = true;
var mJoy:KCtrlRoot;
var mIndicator:DebugIndicator;
function Start () {
	mJoy = GameObject.Find("AllCtrls").GetComponent(KCtrlRoot);
	mIndicator = GameObject.Find("DebugObject").GetComponent(DebugIndicator);
	stickArray = mJoy.GetStickData();
	buttonArray = mJoy.GetButtonData();
	optionBarArray = mJoy.GetOptionBarData();
	itemArray = mIndicator.itemArray;
	if(!useMessage){
		if(buttonArray != null){
			for(var output:ButtonDataOutput in buttonArray){
				mIndicator.AddDebugItem(output.localName,"");
			}
		}
		if(stickArray != null){
			for(var output:StickDataOutput in stickArray){
				mIndicator.AddDebugItem(output.localName,"");
			}
		}
		if(optionBarArray != null){
			for(var output:OptionBarDataOutput in optionBarArray){
				mIndicator.AddDebugItem(output.localName,"");
			}
		}
	}
	else{
		if(buttonArray != null){
			for(var output:ButtonDataOutput in buttonArray){
				mIndicator.AddDebugItem(output.localName,"");
				mJoy.AddMessage("button","begin",output.localName,"onButtonTouch",gameObject);
				mJoy.AddMessage("button","touch",output.localName,"onButtonTouch",gameObject);
				mJoy.AddMessage("button","end",output.localName,"onButtonTouch",gameObject);
			}
		}
		if(stickArray != null){
			for(var output:StickDataOutput in stickArray){
				mIndicator.AddDebugItem(output.localName,"");
				Debug.Log(output.localName);
				mJoy.AddMessage("stick","begin",output.localName,"onStickTouch",gameObject);
				mJoy.AddMessage("stick","touch",output.localName,"onStickTouch",gameObject);
				mJoy.AddMessage("stick","end",output.localName,"onStickTouch",gameObject);
			}
		}
		if(optionBarArray != null){
			for(var output:OptionBarDataOutput in optionBarArray){
				mIndicator.AddDebugItem(output.localName,"");
				mJoy.AddMessage("optionbar","begin",output.localName,"onOptionBarTouch",gameObject);
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
			mIterm = FindItemByName(mButtonData.localName);
			mIterm.localName = mButtonData.localName;
			mIterm.localContent = mButtonData.touchStatus.ToString() + " statusName:" + mButtonData.statusName + " index:" + mButtonData.index.ToString();
			mIndicator.ShowItem(mIterm);
		}
		for(i= 0; i < stickArray.length;i++){
			var mStickData:StickDataOutput;
			mStickData = stickArray[i];
			mIterm = FindItemByName(mStickData.localName);
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
		for(i= 0; i < optionBarArray.length;i++){
			var mOptionBarData:OptionBarDataOutput;
			mOptionBarData = optionBarArray[i];
			mIterm = FindItemByName(mOptionBarData.localName);
			mIterm.localName = mOptionBarData.localName;
			mIterm.localContent = "Select:" + mOptionBarData.itemName + " index:" + mOptionBarData.index.ToString();
			mIndicator.ShowItem(mIterm);
		}
	}
}


function onButtonTouch(object:Object){
	var output:ButtonDataOutput = object;
	var mIterm:DebugItem = FindItemByName(output.localName);
	if(mIterm != null){
		mIterm.localContent = "Status:" + output.statusName + " Touch:" + output.touchStatus.ToString() + " Index:" + output.index.ToString();
		mIndicator.ShowItem(mIterm);
	}
}
function onStickTouch(object:Object){
	var output:StickDataOutput = object;
	var mIterm:DebugItem = FindItemByName(output.localName);
	mIndicator.ShowItem(mIterm);
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
function onOptionBarTouch(object:Object){
	Application.LoadLevel(0);
}
function FindItemByName(name:String):DebugItem{
	for(var mItem:DebugItem in itemArray){
		if(mItem.localName == name){
			return mItem;
		}
	}
	return null;
}