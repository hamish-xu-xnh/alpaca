using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlayerCollide : MonoBehaviour {
    public Text NPCText;
    //trigger NPC
    private void Start()
    {
        NPCText.text = "";
    }
    void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.CompareTag("NPC"))
        {
            if (other.transform.GetChild(0).CompareTag("Exchange"))
            {
                NPCText.text = "Hey! Let's trade!";
            }
            if (other.transform.GetChild(0).CompareTag("Craft"))
            {
                NPCText.text = "Hello, wanna make something new?";
            }
        }
        else if (other.gameObject.CompareTag("Trap"))
        {
            BagManager.bagPanel.GetComponent<BagManager>().decreseSlot();
        }
        else if (other.name == "Exit" && StarManager.starPanel.transform.GetChild(0).childCount > 0)
        {
            //win.SetActive(true);
        }
    }
    void OnTriggerStay(Collider other)
    {

    }
    void OnTriggerExit(Collider other)
    {
        if (other.gameObject.CompareTag("NPC"))
        {
            NPCText.text = "";
        }
    }
}
