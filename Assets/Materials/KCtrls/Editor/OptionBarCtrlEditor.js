#pragma strict
@CustomEditor(OptionBarCtrl)
@CanEditMultipleObjects
class OptionBarCtrlEditor extends Editor {
	function OnInspectorGUI (){
		EditorGUILayout.HelpBox("-this script is created&edited by KCtrlRoot.js \n-variables should be edited within the KCtrlRoot.js above",MessageType.Info);
	}
}