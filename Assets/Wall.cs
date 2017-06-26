using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Wall : MonoBehaviour {
    public float highTemperature;
    public float lowTemperature;

	// Update is called once per frame
	void Update () {
        if (Temperature.temperature < highTemperature && Temperature.temperature > lowTemperature)
        {
            this.gameObject.GetComponent<BoxCollider>().enabled = true;
            this.gameObject.GetComponent<MeshRenderer>().enabled = true;
        }
        else
        {
            this.gameObject.GetComponent<BoxCollider>().enabled = false;
            this.gameObject.GetComponent<MeshRenderer>().enabled = false;
        }

    }
}
