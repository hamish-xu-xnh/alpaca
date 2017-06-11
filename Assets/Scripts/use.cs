using System.Collections;
using UnityEngine.UI;
using UnityEngine;

public class use : MonoBehaviour {

    public GameObject Text;
    public Image SandValue;

    public void useMe()
	{
		if (System.Int32.Parse (Text.GetComponent<Text> ().text) >= 1) {
			int tcount = System.Int32.Parse (Text.GetComponent<Text> ().text) - 1;
            Text.GetComponent<Text> ().text = "" + tcount;

            if (SandValue.fillAmount >= 0.6f)
            {
                SandValue.fillAmount = 1f;
            }
            else
            {
                SandValue.fillAmount += 0.4f;
            }
        }
        //else
			//Destroy (this.gameObject);
	}
}
