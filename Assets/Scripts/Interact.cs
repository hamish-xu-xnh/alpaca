using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Interact : MonoBehaviour
{
    //SphereCollider m_Collider;
    public GameObject win;
    public GameObject inventoryPanel;
    private bool buttonHeld;
    private Transform target;
    private InteractableItem t_Item;

    // Use this for initialization
    void Start()
    {
        //m_Collider = GetComponent<SphereCollider>();
        buttonHeld = false;
    }

    // Update is called once per frame
    void Update()
    {
    
    }

    public void pickingUp(string str)
    {
        buttonHeld = false;
    }

    public void puttingDown(string str)
    {
        buttonHeld = true;
    }


    private void OnTriggerStay(Collider other)
    {

        //if (Input.GetKey("u"))
        if (buttonHeld)
        {
            if (other.gameObject.CompareTag("Interactable"))
            {
                if (other.gameObject.transform.Find("BeforeInteracted").gameObject.activeSelf)
                {
                    //other.gameObject.transform.GetComponent<InteractableItem>().TakeDamage(50f);
                    other.gameObject.transform.GetComponent<InteractableItem>().Interacting();
                    //other.gameObject.transform.Find("Canvas").gameObject.SetActive(true);
                    //other.gameObject.transform.Find("BeforeInteracted").gameObject.SetActive(false);
                    //other.gameObject.transform.Find("AfterInteracted").gameObject.SetActive(true);
                }
            }
            if (other.gameObject.CompareTag("Item"))
            {
                other.gameObject.SetActive(false);
                foreach (Transform child in inventoryPanel.transform)
                {
                    //if item alread in inventory
                    if (child.gameObject.tag == other.gameObject.tag)
                    {
                        string c = child.Find("Text").GetComponent<Text>().text;
                        int tcount = System.Int32.Parse(c) + 1;
                        child.Find("Text").GetComponent<Text>().text = "" + tcount;

                        if (tcount >= 2)
                        {
                            win.SetActive(true);
                        }
                        return;
                    }
                }
            }
        }
        else
        {
            if (other.gameObject.CompareTag("Interactable"))
            {
                other.gameObject.transform.Find("Canvas").gameObject.SetActive(false);
                //gameObject.transform.GetComponent<InteractableItem>().InteractStoped();
            }
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.gameObject.CompareTag("Interactable"))
        {
            other.gameObject.transform.Find("Canvas").gameObject.SetActive(false);
            //gameObject.transform.GetComponent<InteractableItem>().InteractStoped();
        }
    }
}
