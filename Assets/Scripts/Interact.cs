using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Interact : MonoBehaviour
{
    SphereCollider m_Collider;
    private bool buttonHeld;
    private Transform target;
    private InteractableItem t_Item;

    // Use this for initialization
    void Start()
    {
        m_Collider = GetComponent<SphereCollider>();
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
