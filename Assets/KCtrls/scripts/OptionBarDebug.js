#pragma strict
var useMessage:boolean = true;
private var optionBarArray:Array;
private var itemArray:Array;
var mJoy:KCtrlRoot;
var mIndicator:DebugIndicator;
function Start () {
	mJoy = GameObject.Find("OptionBar").GetComponent(KCtrlRoot);
	mIndicator = GameObject.Find("DebugObject").GetComponent(DebugIndicator);
	optionBarArray = mJoy.GetOptionBarData();
	itemArray = mIndicator.itemArray;
	if(!useMessage){
		if(optionBarArray != null){
			Debug.Log("optionBarArray.length = " + optionBarArray.length);
			for(var output:OptionBarDataOutput in optionBarArray){
				mIndicator.AddDebugItem(output.localName,"");
			}
		}
	}
	else{
		if(optionBarArray != null){
			Debug.Log("optionBarArray.length = " + optionBarArray.length);
			for(var output:OptionBarDataOutput in optionBarArray){
				mIndicator.AddDebugItem(output.localName,"");
				output.AddOnBeginMessage("onOptionBarTouch",gameObject);
			}
		}
	}
}

function FixedUpdate () {
	var mIterm:DebugItem;
	var i:int;
	if(!useMessage){
		for(i= 0; i < optionBarArray.length;i++){
			var mOptionBarData:OptionBarDataOutput;
			mOptionBarData = optionBarArray[i];
			mIterm = itemArray[i];
			mIterm.localName = mOptionBarData.localName;
			mIterm.localContent = "Select:" + mOptionBarData.itemName + " index:" + mOptionBarData.index.ToString();
		}
	}
}


function onOptionBarTouch(object:Object){
	var output:OptionBarDataOutput = object;
	var mIterm:DebugItem = FindItemByName(output.localName);
	if(output.localName == "back"){
		Application.LoadLevel(0);
	}
	if(mIterm != null){
		mIterm.localContent = "Select:" + output.itemName + " Index:" + output.index.ToString();
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