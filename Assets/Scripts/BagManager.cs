using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BagManager : MonoBehaviour {
    private bool bagOpened;
	// Use this for initialization
	void Start () {
        //bagOpened = false;
	}
	
	// Update is called once per frame
	void Update () {
		
	}

    public void changeState()
    {
        bagOpened = !bagOpened;
        this.gameObject.SetActive(bagOpened);
    }
}
