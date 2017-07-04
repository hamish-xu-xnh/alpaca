#pragma strict
private class DebugItem{
	var localName:String;
	var localContent:String;
	var activeFlag:boolean;
	function DebugItem(mName:String,mContent:String){
		localName = mName;
		localContent = mContent;
	}
}
var showLength:int = 5;
var fontSizeBy_cm:float = 0.3f;
var debugAlpha:float = 1.0f;
var fontColor:Color;
var activeColor:Color;
var itemArray:Array;
private var currentPos:int;
private var fontSize:int;
private var fontSizeLabelBackup:int;
private var fontSizeBoxBackup:int;
private var backgroundColorAlphaBackup:float;
private var fontColorBackup:Color;
private var startFlag:boolean = true;
private var showArray:Array;


function Awake () {
	itemArray = new Array(typeof(DebugItem));
	itemArray.Clear();
	showArray = new Array(typeof(DebugItem));
	showArray.Clear();
}
function Start () {
	if(0!=Screen.dpi){
		fontSize = Screen.dpi*fontSizeBy_cm/2.54f;
	}
	else {
		fontSize = Screen.height/20;
	}
	currentPos = 0;
}
function OnGUI(){
	if(startFlag){
		backgroundColorAlphaBackup = GUI.backgroundColor.a;
		activeColor.a = fontColor.a = debugAlpha;
		fontSizeBoxBackup = GUI.skin.box.fontSize;
		fontSizeLabelBackup = GUI.skin.label.fontSize;
		fontColorBackup = GUI.color;
		GUI.backgroundColor.a = 0.2;
		GUI.skin.box.fontSize = fontSize;
		GUI.skin.label.fontSize = fontSize;
		for(var i:int = 0; i < showArray.length;i++){
			var mIterm:DebugItem = showArray[i];
			if(mIterm.activeFlag){
				GUI.color = activeColor;
			}
			else{
				GUI.color = fontColor;
			}
			GUI.Box(Rect(Screen.width*0.025,(fontSize*1.5f)*i,Screen.width*0.15,fontSize*1.5f),mIterm.localName);
			GUI.Box(Rect(Screen.width*0.20f,(fontSize*1.5f)*i,Screen.width*0.7f,fontSize*1.5f),mIterm.localContent);
		}
		GUI.backgroundColor.a = backgroundColorAlphaBackup;
		GUI.skin.label.fontSize = fontSizeLabelBackup;
		GUI.skin.box.fontSize = fontSizeBoxBackup;
		GUI.color = fontColorBackup;
	}
}
function ShowItem(item:DebugItem){
	if(!FindItemByName(item)){
		showArray.Unshift(item);
		if(showArray.length > showLength){
			showArray.Pop();
		}
	}
	for(var mItem:DebugItem in showArray){
		mItem.activeFlag = false;
	}
	item.activeFlag = true;
}
function FindItemByName(item:DebugItem):boolean{
	for(var mItem:DebugItem in showArray){
		if(mItem == item){
			return true;
		}
	}
	return false;
}
function debugOn(on:boolean){
	startFlag = on;
}
function AddDebugItem(mName:String,mContent:String):DebugItem{
	var mIterm:DebugItem = new DebugItem(mName,mContent);
	itemArray.Add(mIterm);
	return mIterm;
}
function RemoveIterm(mName:String){
	for(var i:int = 0;i < itemArray.length; i++){
		var mIterm:DebugItem = itemArray[i];
		if(mName == mIterm.localName){
			itemArray.RemoveAt(i);
		}
	}
}
function RemoveIterm(item:Object){
	for(var i:int = 0;i < itemArray.length; i++){
		var mIterm:DebugItem = itemArray[i];
		if(mIterm == item){
			itemArray.RemoveAt(i);
		}
	}
}
