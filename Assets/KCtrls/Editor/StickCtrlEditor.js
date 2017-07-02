#pragma strict
@CustomEditor(StickCtrl)
@CanEditMultipleObjects
class StickCtrlEditor extends Editor {
	function OnInspectorGUI (){
		EditorGUILayout.HelpBox("-this script is created&edited by KCtrlRoot.js \n-variables should be edited within the KCtrlRoot.js above",MessageType.Info);
	}
}