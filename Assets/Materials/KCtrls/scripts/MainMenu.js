#pragma strict
var useMessage:boolean = true;
private var optionBarArray:Array;
var mJoy:KCtrlRoot;
function Start () {
	mJoy = GameObject.Find("MainMenu").GetComponent(KCtrlRoot);
	optionBarArray = mJoy.GetOptionBarData();
	if(optionBarArray != null){
			Debug.Log("optionBarArray.length = " + optionBarArray.length);
			for(var output:OptionBarDataOutput in optionBarArray){
				output.AddOnBeginMessage("onOptionBarTouch",gameObject);
			}
		}
}
function onOptionBarTouch(object:Object){
	var output:OptionBarDataOutput = object;
	if(output.index == 4){
		Application.Quit();
	}
	Application.LoadLevel(output.index + 1);
}