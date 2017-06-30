using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class tSensitiveObjs : MonoBehaviour {
    public float highTemperature;
    public float lowTemperature;

	// Update is called once per frame
	void Update () {
        if (GameManager.temperature < highTemperature && GameManager.temperature > lowTemperature)
        {
            if (gameObject.GetComponent<BoxCollider>() != null)//ice wall and fire wall
            {
                this.gameObject.GetComponent<BoxCollider>().enabled = true;
                //this.gameObject.GetComponent<MeshRenderer>().enabled = true;
                if (transform.childCount > 0)
                {
                    transform.GetChild(0).gameObject.SetActive(true);
                }
            }
            else//environment change
            {
                this.gameObject.GetComponent<MeshRenderer>().enabled = true;
            }
            //this.gameObject.GetComponent<MeshRenderer>().enabled = true;
            if (transform.childCount > 0)
            {
                transform.GetChild(0).gameObject.SetActive(true);
            }
        }
        else
        {
            if (gameObject.GetComponent<BoxCollider>() != null)
            {
                this.gameObject.GetComponent<BoxCollider>().enabled = false;
                //this.gameObject.GetComponent<MeshRenderer>().enabled = false;
                if (transform.childCount > 0)
                {
                    transform.GetChild(0).gameObject.SetActive(false);
                }
            }
            else//environment change
            {
                this.gameObject.GetComponent<MeshRenderer>().enabled = false;
            }
        }
        if (GameManager.GhostFlag)
        {
            if (gameObject.GetComponent<BoxCollider>() != null)//ice wall and fire wall
            {
                this.gameObject.GetComponent<BoxCollider>().enabled = false;
            }
        }
    }
}
