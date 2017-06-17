using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Interact : MonoBehaviour
{
    //SphereCollider m_Collider;
    public Image SandValue;
    public Text NPCText;
    public bool craftEnabled;
    private bool buttonHeld;
    private bool PI;
    private Transform target;
    private InteractableItem t_Item;
    public bool index_drop;

    private bool exchangeEnabled;
    private bool exchanged;

    // Use this for initialization
    void Start()
    {
        // initialize the button
        buttonHeld = false;
        PI = false;

        exchangeEnabled = false;
        exchanged = false;
        index_drop = true;
    }

    public void disable_RESHAPE_function()
    {
        buttonHeld = false;
        if (craftEnabled) {
            BagManager.bagPanel.GetComponent<BagManager>().beginCraft();
        }
    }

    public void disable_PICK_function()
    {
        PI = false;
    }

    public void enable_RESHAPE_function()
    {
        buttonHeld = true;
    }

    public void enable_PICK_funtion()
    {
        PI = true;
    }

    private void OnTriggerEnter(Collider other)
    {
        if(other.name != "NPC"){
            index_drop = false;
        }
        if (other.gameObject.CompareTag("Exchange"))
        {
            exchangeEnabled = true;
        }
        if (other.gameObject.CompareTag("Craft"))
        {
            craftEnabled = true;
        }
    }

    private void OnTriggerStay(Collider other)
    {
        
        if (other.gameObject.CompareTag("Exchange"))
        {

            if (exchanged)
            {
                //Search through the bag for the target item;
                GameObject item = BagManager.bagPanel.GetComponent<BagManager>().findItem("Item1");
                if (item == null)
                {
                    NPCText.text = "Item1 needed";
                }
                else
                {
                    BagManager.bagPanel.GetComponent<BagManager>().reduceItem(item);
                    NPCText.text = "Mission 1 completed";

                    //add a new item to the bag;
                    item = BagManager.bagPanel.GetComponent<BagManager>().findItem("Item3");
                    if (item == null)
                    {
                        BagManager.bagPanel.GetComponent<BagManager>().addItem(other.gameObject);
                    }
                    else
                    {
                        BagManager.bagPanel.GetComponent<BagManager>().increaseItem(item);
                    }
                    exchanged = false;
                }

            }
        }
        //if holding RS button
        if (buttonHeld)
        {
            if (other.gameObject.CompareTag("Interactable"))
            {
                if (other.gameObject.transform.Find("BeforeInteracted").gameObject.activeSelf)
                {
                    other.gameObject.transform.GetComponent<InteractableItem>().Interacting();
                }
            }
        }
        else
        {
            if (other.gameObject.CompareTag("Interactable"))
            {
                other.gameObject.transform.GetComponent<InteractableItem>().InteractStoped();
            }
        }

        if (PI)
        {
            if (other.gameObject.CompareTag("Item"))
            {
                other.gameObject.SetActive(false);
                GameObject item = BagManager.bagPanel.GetComponent<BagManager>().findItem(other.gameObject.name);
                if (item == null)
                {
                    BagManager.bagPanel.GetComponent<BagManager>().addItem(other.gameObject);
                }
                else
                {
                    BagManager.bagPanel.GetComponent<BagManager>().increaseItem(item);
                    return;
                }

            }
            else if (other.gameObject.CompareTag("Damage"))
            {
                other.gameObject.SetActive(false);
                SandValue.fillAmount -= 0.3f;
            }
            else if (other.gameObject.CompareTag("Recovery"))
            {
                other.gameObject.SetActive(false);

                if (SandValue.fillAmount >= 0.6f)
                {
                    SandValue.fillAmount = 1f;
                }
                else
                {
                    SandValue.fillAmount += 0.4f;
                }

            }
        }

    }

    private void OnTriggerExit(Collider other)
    {
        index_drop = true;
        if (other.gameObject.CompareTag("Interactable"))
        {
            other.gameObject.transform.GetComponent<InteractableItem>().InteractStoped();
        }
        if (other.gameObject.CompareTag("Exchange"))
        {
            exchangeEnabled = false;
            exchanged = false;
        }
        if (other.gameObject.CompareTag("Craft"))
        {
            craftEnabled = false;
            BagManager.bagPanel.GetComponent<BagManager>().stopCraft();
        }
    }

    public void NPCExchange()
    {
        if (exchangeEnabled)
        {
            exchanged = true;
        }
    }
}
