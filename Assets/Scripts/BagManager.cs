using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BagManager : MonoBehaviour {
    private bool bagOpened;

    public void changeState()
    {
        bagOpened = !bagOpened;
        this.gameObject.SetActive(bagOpened);
    }
}
