#pragma strict
@CustomEditor(ButtonCtrl)
@CanEditMultipleObjects
class ButtonCtrlEditor extends Editor {
	function OnInspectorGUI (){
		EditorGUILayout.HelpBox("-this script is created&edited by KCtrlRoot.js \n-variables should be edited within the KCtrlRoot.js above",MessageType.Info);
	}
}