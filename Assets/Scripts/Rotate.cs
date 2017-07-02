using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rotate : MonoBehaviour {
    public bool vertical;
	// Update is called once per frame
	void Update () {
        if (vertical)
        {
            this.transform.Rotate(Vector3.right, Time.deltaTime * 200);
        }
        else
        {
            this.transform.Rotate(Vector3.up, Time.deltaTime * 200);
        }

	}

}
