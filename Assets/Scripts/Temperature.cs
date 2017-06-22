using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Temperature : MonoBehaviour {
    public static float temperature;
    public float startingHitPoint;
    // Use this for initialization
    void Awake () {
        this.transform.GetComponent<Image>().fillAmount = startingHitPoint;
        temperature = startingHitPoint;
	}
	
	// Update is called once per frame
	void Update () {
        this.transform.GetComponent<Image>().fillAmount = temperature;
    }
}
