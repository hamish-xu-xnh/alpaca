#pragma strict
@CustomEditor(KCtrlRoot)
@CanEditMultipleObjects
class KCtrlRootEditor extends Editor {
	var stickFoldout:boolean = false;
	var buttonFoldout:boolean = false;
	var optionBarFoldout:boolean = false;
	var stickFoldoutArray:boolean[];
	var buttonFoldoutArray:boolean[];
	var buttonTextureFoldoutArray:boolean[];
	var optionBarFoldoutArray:boolean[];
	var optionBarItemFoldoutArray:boolean[];
	var optionBarRootFoldoutArray:boolean[];
	var priviewFoldout:boolean = false;
	var rooter:KCtrlRoot;
	var previewString : String = "preview option";
	var refreshTime:float = 0;
	function OnEnable () {
		rooter = target;
		rooter.InitArrays();
		rooter.SycDisplayerCtrls();
		stickFoldoutArray = new boolean[rooter.stickArray.length];
		buttonFoldoutArray = new boolean[rooter.buttonArray.length];
		buttonTextureFoldoutArray = new boolean[rooter.buttonArray.length];
		optionBarFoldoutArray = new boolean[rooter.optionBarArray.length];
		optionBarItemFoldoutArray = new boolean[rooter.optionBarArray.length];
		optionBarRootFoldoutArray = new boolean[rooter.optionBarArray.length];
	}
	function OnSceneGUI(){
		var sceneCamObj:GameObject = GameObject.Find( "SceneCamera" );
		var currentSceneWidth:int = sceneCamObj.GetComponent.<Camera>().pixelRect.width;
		var currentSceneHeight:int = sceneCamObj.GetComponent.<Camera>().pixelRect.height;
		var previewWindowWidth:int = currentSceneWidth;
		var previewWindowHeight:int = currentSceneHeight;
		if(rooter.targetResolution.x!=0&&rooter.targetResolution.y!=0&&rooter.screenSize!=0){
			previewWindowWidth = currentSceneWidth*80/100;
			previewWindowHeight = previewWindowWidth*rooter.targetResolution.y/rooter.targetResolution.x;
			if(previewWindowHeight>currentSceneHeight){
				previewWindowHeight = currentSceneHeight*80/100;
				previewWindowWidth = previewWindowHeight*rooter.targetResolution.x/rooter.targetResolution.y;
			}
			var tmp_float:float;
			tmp_float = Mathf.Sqrt(rooter.targetResolution.y*rooter.targetResolution.y + rooter.targetResolution.x*rooter.targetResolution.x);
			tmp_float = tmp_float/rooter.screenSize;
			rooter.screenDPI = tmp_float;
			rooter.GetAllRects();
			rooter.ReCalculateSize();
		}
		
		Handles.BeginGUI();
		var mTexture:Texture2D = new Texture2D(previewWindowWidth+6,previewWindowHeight+4);
		var previewWindowRect = new Rect((currentSceneWidth - previewWindowWidth)/2,(currentSceneHeight - previewWindowHeight)/2,previewWindowWidth,previewWindowHeight);
		var previewWindowRectFit = new Rect(previewWindowRect);
		previewWindowRectFit.x = previewWindowRectFit.x - 2;
		previewWindowRectFit.y = previewWindowRectFit.y - 2;
		previewWindowRectFit.width = previewWindowRectFit.width + 6;
		previewWindowRectFit.height = previewWindowRectFit.height + 4;
		GUI.Label(previewWindowRectFit,mTexture);
		var previewRect:Rect;
		var alphaBackup:float = GUI.color.a;
		for(var displayer:StickCtrl in rooter.stickArray){
			if(null!=displayer.texture){
				previewRect.x = displayer.displayInfo.screenRect.x*previewWindowWidth/rooter.targetResolution.x + (currentSceneWidth - previewWindowWidth)/2;
				previewRect.y = displayer.displayInfo.screenRect.y*previewWindowHeight/rooter.targetResolution.y + (currentSceneHeight - previewWindowHeight)/2;
				previewRect.width = displayer.displayInfo.screenRect.width*previewWindowWidth/rooter.targetResolution.x;
				previewRect.height = displayer.displayInfo.screenRect.height*previewWindowHeight/rooter.targetResolution.y;
				GUI.color.a = displayer.screenAlpha;
				GUI.DrawTexture(previewRect,displayer.texture);
				if(displayer.IndicatorInOrigin){
					GUI.color.a = displayer.touchAlpha;
					previewRect.x = displayer.touchOriginRect.x*previewWindowWidth/rooter.targetResolution.x + (currentSceneWidth - previewWindowWidth)/2;
					previewRect.y = displayer.touchOriginRect.y*previewWindowHeight/rooter.targetResolution.y + (currentSceneHeight - previewWindowHeight)/2;
					previewRect.width = displayer.touchOriginRect.width*previewWindowWidth/rooter.targetResolution.x;
					previewRect.height = displayer.touchOriginRect.height*previewWindowHeight/rooter.targetResolution.y;
					GUI.DrawTexture(previewRect,displayer.touchTexture);
				}
			}
		}
		
		for(var displayer:ButtonCtrl in rooter.buttonArray){
			if(displayer.texture!=null){
				previewRect.x = displayer.displayInfo.screenRect.x*previewWindowWidth/rooter.targetResolution.x + (currentSceneWidth - previewWindowWidth)/2;
				previewRect.y = displayer.displayInfo.screenRect.y*previewWindowHeight/rooter.targetResolution.y + (currentSceneHeight - previewWindowHeight)/2;
				previewRect.width = displayer.displayInfo.screenRect.width*previewWindowWidth/rooter.targetResolution.x;
				previewRect.height = displayer.displayInfo.screenRect.height*previewWindowHeight/rooter.targetResolution.y;
				GUI.color.a = displayer.screenAlpha;
				GUI.DrawTextureWithTexCoords(previewRect,displayer.texture,displayer.currentTexCoord);
			}
		}
		
		for(var displayer:OptionBarCtrl in rooter.optionBarArray){
			var Pivot:Vector2;
			Pivot.x = displayer.rootPoint.x*previewWindowWidth/rooter.targetResolution.x + (currentSceneWidth - previewWindowWidth)/2;
			Pivot.y = displayer.rootPoint.y*previewWindowHeight/rooter.targetResolution.y + (currentSceneHeight - previewWindowHeight)/2;
			if(displayer.backgroundTexture!=null){
				GUIUtility.RotateAroundPivot(displayer.rotateAngle,Pivot);
				previewRect.x = displayer.displayInfo.screenRect.x*previewWindowWidth/rooter.targetResolution.x + (currentSceneWidth - previewWindowWidth)/2;
				previewRect.y = displayer.displayInfo.screenRect.y*previewWindowHeight/rooter.targetResolution.y + (currentSceneHeight - previewWindowHeight)/2;
				previewRect.width = displayer.displayInfo.screenRect.width*previewWindowWidth/rooter.targetResolution.x;
				previewRect.height = displayer.displayInfo.screenRect.height*previewWindowHeight/rooter.targetResolution.y;
				GUI.color.a = displayer.backgroundAlpha;
				GUI.DrawTexture(previewRect,displayer.backgroundTexture);
				GUIUtility.RotateAroundPivot(-displayer.rotateAngle,Pivot);
			}
			var previewWH:Vector2;
			previewWH.x = previewWindowWidth;
			previewWH.y = previewWindowHeight;
			var sceneWH:Vector2;
			sceneWH.x = currentSceneWidth;
			sceneWH.y = currentSceneHeight;
			if(displayer.rootTexture!=null){
				if(displayer.rootRotate){
					GUIUtility.RotateAroundPivot(displayer.rotateAngle,Pivot);
				}
				GUI.color.a = displayer.rootAlpha;
				previewRect = GetPreviewRect(displayer.rootRect,previewWH,sceneWH);
				GUI.DrawTexture(previewRect,displayer.rootTexture);
				if(displayer.rootRotate){
					GUIUtility.RotateAroundPivot(-displayer.rotateAngle,Pivot);
				}
			}
			if(displayer.itemsTexture!=null){
				GUI.color.a = displayer.itemAlpha;
				for(var j:int = 0; j < displayer.myOutput.itemNum; j++){
					var mRect = displayer.itemRectArray[j];
					var mTextureRect = displayer.itemTextureRectArray[j];
					previewRect = GetPreviewRect(mRect,previewWH,sceneWH);
					GUI.DrawTextureWithTexCoords(previewRect,displayer.itemsTexture,mTextureRect);
				}
			}
		}
		GUI.color.a = alphaBackup;
		Handles.EndGUI();
	}
	private function GetPreviewRect(mRect:Rect,previewWH:Vector2,sceneWH:Vector2):Rect{
		var previewRect:Rect;
		previewRect.x = mRect.x*previewWH.x/rooter.targetResolution.x + (sceneWH.x - previewWH.x)/2;
		previewRect.y = mRect.y*previewWH.y/rooter.targetResolution.y + (sceneWH.y - previewWH.y)/2;
		previewRect.width = mRect.width*previewWH.x/rooter.targetResolution.x;
		previewRect.height = mRect.height*previewWH.y/rooter.targetResolution.y;
		return previewRect;
	}
	function OnInspectorGUI (){
		refreshTime += Time.deltaTime;
		if(Event.current.type == EventType.KeyUp){
			if(stickFoldout||buttonFoldout){
				rooter.GetAllRects();
				rooter.ReCalculateSize();
				SceneView.RepaintAll();
			}
			refreshTime = 0;
		}
		var guiIndentLeverBackup;
		EditorGUIUtility.LookLikeControls();
        EditorGUI.indentLevel--;
        EditorGUILayout.LabelField("--Options--",GUILayout.Width(Screen.width));
        EditorGUI.indentLevel++;
        EditorGUI.indentLevel++;
		priviewFoldout = EditorGUILayout.Foldout(priviewFoldout,previewString);
		if(priviewFoldout){
			EditorGUILayout.BeginHorizontal();
        	EditorGUILayout.LabelField("width(pixel):",GUILayout.Width(Screen.width/4));
        	EditorGUILayout.LabelField("height(pixel):",GUILayout.Width(Screen.width/4));
        	EditorGUILayout.LabelField("size(inch):",GUILayout.Width(Screen.width/4));
        	EditorGUILayout.EndHorizontal(); 
        	EditorGUILayout.BeginHorizontal();
        	rooter.targetResolution.x = EditorGUILayout.IntField(rooter.targetResolution.x,GUILayout.Width(Screen.width/4));
        	rooter.targetResolution.y = EditorGUILayout.IntField(rooter.targetResolution.y,GUILayout.Width(Screen.width/4));
        	rooter.screenSize = EditorGUILayout.FloatField(rooter.screenSize,GUILayout.Width(Screen.width/4));
        	EditorGUILayout.EndHorizontal();
        	EditorGUILayout.HelpBox("Note: \nsetup a preview of what these controls will look like by a certain Resolution%Size",MessageType.Info);
		}
		EditorGUI.indentLevel--;
		stickFoldout = EditorGUILayout.Foldout(stickFoldout,"JoyStick");
		if(stickFoldout){
			StickEditor();
		}
		var i:int;
		buttonFoldout = EditorGUILayout.Foldout(buttonFoldout,"Button");
		for(i = 0; i < rooter.buttonArray.length; i++){
        	var mButton:ButtonCtrl = rooter.buttonArray[i];
      		mButton.LoadData();
      	}
		if(buttonFoldout){
			ButtonEditor();
		}
		
		optionBarFoldout = EditorGUILayout.Foldout(optionBarFoldout,"OptionBar");
		for(i = 0; i < rooter.optionBarArray.length; i++){
        	var mOptionBar:OptionBarCtrl = rooter.optionBarArray[i];
      		mOptionBar.LoadData();
      	}
		if(optionBarFoldout){
			OptionBarEditor();
		}
	}
	/*Option Bar*/
	function AddOptionBar(){
		rooter.AddOptionBarCtrl();
		optionBarFoldoutArray = new boolean[rooter.optionBarArray.length];
		optionBarItemFoldoutArray = new boolean[rooter.optionBarArray.length];
		optionBarRootFoldoutArray = new boolean[rooter.optionBarArray.length];
	}
	function OptionBarEditor(){
		var removeIndex:int = -1; 
		EditorGUI.indentLevel++;
		if(GUILayout.Button("NewOptionBar")) {
            AddOptionBar();
        }
        for(var i:int = 0; i < rooter.optionBarArray.length; i++){
        	var displayer:OptionBarCtrl = rooter.optionBarArray[i];
        	optionBarFoldoutArray[i] = EditorGUILayout.Foldout(optionBarFoldoutArray[i], displayer.myOutput.localName);
        	if(optionBarFoldoutArray[i]){
        		displayer.myOutput.localName = EditorGUILayout.TextField("Name",displayer.myOutput.localName);
        		displayer.myOutput.fadeFlag = EditorGUILayout.Toggle("Fade", displayer.myOutput.fadeFlag);
        		if(displayer.myOutput.fadeFlag){
        			EditorGUI.indentLevel++;
        			displayer.myOutput.fadeTime = EditorGUILayout.FloatField("FadeTime",displayer.myOutput.fadeTime);
        			EditorGUI.indentLevel--;
        		}
        		displayer.rotateAngle = EditorGUILayout.FloatField("rotateAngle",displayer.rotateAngle);
        		/*Coordinates*/
        		var shapeStrings:String[];
        		shapeStrings = new Array("CX(ScreenW%)","CY(ScreenH%)","Width(inch)","Height(inch)");
        		var xPixels = EditorGUILayout.FloatField(shapeStrings[0],displayer.displayInfo.realShape.x);
        		displayer.displayInfo.realShape.x = xPixels;
        		var yPixels:float = 100 - displayer.displayInfo.realShape.y;
        		yPixels = EditorGUILayout.FloatField(shapeStrings[1],yPixels);
        		displayer.displayInfo.realShape.y = 100 - yPixels;
        		displayer.displayInfo.realShape.width = EditorGUILayout.FloatField(shapeStrings[2],displayer.displayInfo.realShape.width);
        		if(displayer.displayInfo.shapeType != ShapeType.round){ 
        			displayer.displayInfo.realShape.height = EditorGUILayout.FloatField(shapeStrings[3],displayer.displayInfo.realShape.height);
        		}
        		else{
        			displayer.displayInfo.realShape.height = displayer.displayInfo.realShape.width;
        		}
        		EditorGUI.indentLevel++;
        		optionBarRootFoldoutArray[i] = EditorGUILayout.Foldout(optionBarRootFoldoutArray[i], "Edit root");
        		if(optionBarRootFoldoutArray[i]){
        			displayer.rootShape = EditorGUILayout.EnumPopup("Shape type",displayer.rootShape);
        			displayer.rootAlpha = EditorGUILayout.FloatField("alpha",displayer.rootAlpha);
        			displayer.rootRotate = EditorGUILayout.Toggle("Rotate texture",displayer.rootRotate);
        			displayer.rootPosition.x = EditorGUILayout.FloatField("CX",displayer.rootPosition.x);
        			/*
        			var tmpY:float = displayer.resolution.y - displayer.rootPosition.y;
        			tmpY = EditorGUILayout.FloatField("CY",tmpY);
        			displayer.rootPosition.y = displayer.resolution.y - tmpY;
        			*/
        			displayer.rootPosition.y = EditorGUILayout.FloatField("CY",displayer.rootPosition.y);
        			displayer.rootPosition.z = EditorGUILayout.FloatField("Widh",displayer.rootPosition.z);
        			displayer.rootPosition.w = EditorGUILayout.FloatField("Height",displayer.rootPosition.w);
        			displayer.rootTexture = EditorGUILayout.ObjectField("Texture",displayer.rootTexture, Texture);
        		}
        		optionBarItemFoldoutArray[i] = EditorGUILayout.Foldout(optionBarItemFoldoutArray[i], "Edit items");
        		if(optionBarItemFoldoutArray[i]){
        			displayer.itemtShape = EditorGUILayout.EnumPopup("Shape type",displayer.itemtShape);
        			displayer.itemAlpha = EditorGUILayout.FloatField("alpha",displayer.itemAlpha);
        			displayer.itemLayoutType = EditorGUILayout.EnumPopup("Item layout",displayer.itemLayoutType);
        			displayer.firstDistance = EditorGUILayout.FloatField("firstDistance",displayer.firstDistance);
        			if(displayer.itemLayoutType == LayoutType.line){
        				displayer.itemDistance = EditorGUILayout.FloatField("Item distance",displayer.itemDistance);
        			}
        			else{
        				displayer.itemDistance = EditorGUILayout.FloatField("Item angle",displayer.itemDistance);
        			}
        			displayer.itemSize.x = EditorGUILayout.FloatField("Widh",displayer.itemSize.x);
        			displayer.itemSize.y = EditorGUILayout.FloatField("Height",displayer.itemSize.y);
        			displayer.myOutput.itemNum = EditorGUILayout.IntField("Item num",displayer.myOutput.itemNum);
        			if(displayer.myOutput.itemNum < 1){
        				displayer.myOutput.itemNum = 1;
        			}
        			if(displayer.myOutput.index < 0){
        				displayer.myOutput.index = 0;
        			}
        			if(displayer.myOutput.index >= displayer.myOutput.itemNum){
        				displayer.myOutput.index = displayer.myOutput.itemNum -1;
        			}
        			displayer.SycData();
        			for(var j:int = 0; j < displayer.myOutput.itemNum; j++){
        				var tmpName:String = displayer.nameArray[j];
        				displayer.nameArray[j] = EditorGUILayout.TextField("ItemName_" + j,tmpName);
        			}
        			displayer.itemsTexture = EditorGUILayout.ObjectField("Texture",displayer.itemsTexture, Texture);
        			displayer.SaveData();
        		}
        		EditorGUI.indentLevel--;
				EditorGUILayout.LabelField("Background resolution: " + displayer.resolution.x + "x" + displayer.resolution.y);
				displayer.backgroundAlpha = EditorGUILayout.FloatField("Background alpha",displayer.backgroundAlpha);
        		displayer.backgroundTexture = EditorGUILayout.ObjectField("Background texture",displayer.backgroundTexture, Texture,GUILayout.MaxWidth(Screen.width/0.8f));
        		if(GUILayout.Button("Remove")) {
					removeIndex = i;
				}
        	}
        }
        if(removeIndex >= 0){
			DestroyImmediate(rooter.optionBarArray[removeIndex]);
			removeIndex = -1;
			rooter.SycDisplayerCtrls();
			optionBarItemFoldoutArray = new boolean[rooter.optionBarArray.length];
			optionBarRootFoldoutArray = new boolean[rooter.optionBarArray.length];
			stickFoldoutArray = new boolean[rooter.optionBarArray.length];
		}
		EditorGUI.indentLevel--;
	}
	
	/*Button*/
	function AddButton(){
		rooter.AddButtonCtrl();
		buttonFoldoutArray = new boolean[rooter.buttonArray.length];
		buttonTextureFoldoutArray = new boolean[rooter.buttonArray.length];
	}
	function ButtonEditor(){
		var removeIndex:int = -1; 
		EditorGUI.indentLevel++;
		if(GUILayout.Button("NewButton")) {
            AddButton();
        }
        for(var i:int = 0; i < rooter.buttonArray.length; i++){
        	var displayer:ButtonCtrl = rooter.buttonArray[i];
        	buttonFoldoutArray[i] = EditorGUILayout.Foldout(buttonFoldoutArray[i], displayer.myOutput.localName);
    		if(buttonFoldoutArray[i]){
        		displayer.myOutput.localName = EditorGUILayout.TextField("Name",displayer.myOutput.localName);
        		displayer.displayInfo.shapeType = EditorGUILayout.EnumPopup("Shape type",displayer.displayInfo.shapeType);
        		displayer.screenAlpha = EditorGUILayout.FloatField("alpha",displayer.screenAlpha);
        		/*Coordinates*/
        		var shapeStrings:String[];
        		if(displayer.displayInfo.shapeType == ShapeType.rectangle){
        			shapeStrings = new Array("CX(ScreenW%)","CY(ScreenH%)","Width(inch)","Height(inch)");
        		}
        		else if(displayer.displayInfo.shapeType == ShapeType.ellipse){ 
        			shapeStrings = new Array("0X(ScreenW%)","OY(ScreenH%)","DiameterX(inch)","DiameterY(inch)");
        		}
        		else{ 
        			shapeStrings = new Array("0X(ScreenW%)","OY(ScreenH%)","Diameter(inch)");
        		}
        		var xPixels = EditorGUILayout.FloatField(shapeStrings[0],displayer.displayInfo.realShape.x);
        		displayer.displayInfo.realShape.x = xPixels;
        		var yPixels:float = 100 - displayer.displayInfo.realShape.y;
        		yPixels = EditorGUILayout.FloatField(shapeStrings[1],yPixels);
        		displayer.displayInfo.realShape.y = 100 - yPixels;
        		displayer.displayInfo.realShape.width = EditorGUILayout.FloatField(shapeStrings[2],displayer.displayInfo.realShape.width);
        		if(displayer.displayInfo.shapeType != ShapeType.round){ 
        			displayer.displayInfo.realShape.height = EditorGUILayout.FloatField(shapeStrings[3],displayer.displayInfo.realShape.height);
        		}
        		else{
        			displayer.displayInfo.realShape.height = displayer.displayInfo.realShape.width;
        		}
        		displayer.displayInfo.reSizeAble = EditorGUILayout.Toggle("reSizeAble", displayer.displayInfo.reSizeAble);
        		
        		EditorGUI.indentLevel++;
        		buttonTextureFoldoutArray[i] = EditorGUILayout.Foldout(buttonTextureFoldoutArray[i], "Edit status");
        		if(buttonTextureFoldoutArray[i]){
        			displayer.myOutput.buttonStatusNum = EditorGUILayout.IntField("Status num",displayer.myOutput.buttonStatusNum);
        			if(displayer.myOutput.buttonStatusNum < 1){
        				displayer.myOutput.buttonStatusNum = 1;
        			}
        			displayer.getCurrentTexCoord();
        			displayer.myOutput.index = EditorGUILayout.FloatField("previewStatus",displayer.myOutput.index);
        			if(displayer.myOutput.index < 0){
        				displayer.myOutput.index = 0;
        			}
        			if(displayer.myOutput.index >= displayer.myOutput.buttonStatusNum){
        				displayer.myOutput.index = displayer.myOutput.buttonStatusNum -1;
        			}
        			displayer.SycData();
        			for(var j:int = 0; j < displayer.myOutput.buttonStatusNum; j++){
        				var tmpName:String = displayer.nameArray[j];
        				displayer.nameArray[j] = EditorGUILayout.TextField("IndexName_" + j,tmpName);
        			}
        			displayer.SaveData();
        		}
        		EditorGUI.indentLevel--;
        		displayer.texture = EditorGUILayout.ObjectField("Texture",displayer.texture, Texture);
        		if(GUILayout.Button("Remove")) {
					removeIndex = i;
				}
        	}   	
        }
        if(removeIndex >= 0){
			DestroyImmediate(rooter.buttonArray[removeIndex]);
			removeIndex = -1;
			rooter.SycDisplayerCtrls();
			stickFoldoutArray = new boolean[rooter.buttonArray.length];
			buttonTextureFoldoutArray = new boolean[rooter.buttonArray.length];
		}
		EditorGUI.indentLevel--;
    }
	/*Stick*/
	function AddStick(){
		rooter.AddStickCtrl();
		stickFoldoutArray = new boolean[rooter.stickArray.length];
	}
	function StickEditor(){
		var removeIndex:int = -1; 
		EditorGUI.indentLevel++;
		if(GUILayout.Button("NewJoyStick")) {
            AddStick();
        }
		for(var i:int = 0; i < rooter.stickArray.length; i++){
    		var displayer:StickCtrl = rooter.stickArray[i];
    		stickFoldoutArray[i] = EditorGUILayout.Foldout(stickFoldoutArray[i], displayer.myOutput.localName);
    		if(stickFoldoutArray[i]){
    			var tmpWidth:int = Screen.width;
    			
        		displayer.myOutput.localName = EditorGUILayout.TextField ("Name",displayer.myOutput.localName);
        		
        		displayer.screenAlpha = EditorGUILayout.FloatField("alpha",displayer.screenAlpha);
        		if(displayer.screenAlpha > 1.0f){
        			displayer.screenAlpha = 1.0f;
        		}
        		if(displayer.screenAlpha < 0.0f){
        			displayer.screenAlpha = 0.0f;
        		}
        		
        		var shapeStrings:String[];
        		if(displayer.displayInfo.shapeType == ShapeType.rectangle){
        			shapeStrings = new Array("CenterX","CenterY","Width","Height");
        		}
        		else{
        			shapeStrings = new Array("0X(ScreenW%)","OY(ScreenW%)","Diameter(inch)");
        		}
        		
        		var xPixels = EditorGUILayout.FloatField(shapeStrings[0],displayer.displayInfo.realShape.x);
        		displayer.displayInfo.realShape.x = xPixels;
        		
        		
        		var yPixels:float = 100 - displayer.displayInfo.realShape.y;
        		yPixels = EditorGUILayout.FloatField(shapeStrings[1],yPixels);
        		displayer.displayInfo.realShape.y = 100 - yPixels;

        		
        		displayer.displayInfo.realShape.width = EditorGUILayout.FloatField(shapeStrings[2],displayer.displayInfo.realShape.width);
        		displayer.displayInfo.realShape.height = displayer.displayInfo.realShape.width;
        		
        		displayer.displayInfo.reSizeAble = EditorGUILayout.Toggle("reSizeAble", displayer.displayInfo.reSizeAble);
        		
				displayer.texture = EditorGUILayout.ObjectField("Texture",displayer.texture, Texture);
				
        		displayer.hasTouchIndicator = EditorGUILayout.Toggle("Show an indicator", displayer.hasTouchIndicator);
        		if(displayer.hasTouchIndicator){
        			EditorGUI.indentLevel++;
        			displayer.IndicatorInOrigin = EditorGUILayout.Toggle("Always display", displayer.IndicatorInOrigin);
        			displayer.touchAlpha = EditorGUILayout.FloatField("Alpha", displayer.touchAlpha);
        			EditorGUILayout.BeginHorizontal();
        			EditorGUILayout.LabelField("Diameter",GUILayout.Width(tmpWidth/3));
        			displayer.touchIndicatorDiameter = EditorGUILayout.FloatField(displayer.touchIndicatorDiameter,GUILayout.Width(tmpWidth/3));
        			EditorGUILayout.LabelField("inch",GUILayout.Width(tmpWidth/3));
        			EditorGUILayout.EndHorizontal();
					displayer.touchTexture = EditorGUILayout.ObjectField("Texture",displayer.touchTexture, Texture);
					EditorGUI.indentLevel--;
        		}
        		else{
        			displayer.IndicatorInOrigin = false;
        		}
				if(GUILayout.Button("Remove")) {
				removeIndex = i;
         	  	}
			}
		}
		if(removeIndex>=0){
			DestroyImmediate(rooter.stickArray[removeIndex]);
			removeIndex = -1;
			rooter.SycDisplayerCtrls();
			stickFoldoutArray = new boolean[rooter.stickArray.length];
		}
		EditorGUI.indentLevel--;
	}
}