using System.Collections;
using UnityEngine.UI;
using UnityEngine;

public class use : MonoBehaviour {

    public GameObject Text;
	public void useMe()
	{
		if (System.Int32.Parse (Text.GetComponent<Text> ().text) >= 1) {
			int tcount = System.Int32.Parse (Text.GetComponent<Text> ().text) - 1;
            Text.GetComponent<Text> ().text = "" + tcount;
		}
        //else
			//Destroy (this.gameObject);
	}
}
