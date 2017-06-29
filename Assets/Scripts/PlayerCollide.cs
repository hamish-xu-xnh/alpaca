using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class PlayerCollide : MonoBehaviour {
    /*
    public Text NPCText;
    //trigger NPC
    private void Start()
    {
        NPCText.text = "";
    }
    */
    void OnTriggerEnter(Collider other)
    {
        /*
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
        else */if (other.gameObject.CompareTag("Trap"))
        {
            StarManager.starPanel.GetComponent<StarManager>().reduceStar();
        }
        else if (other.name == "Exit" && StarManager.starPanel.transform.GetChild(0).childCount > 0)
        {
            SceneManager.LoadScene("Win");
        }
    }
    /*
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
    */
}
