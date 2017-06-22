using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Interact : MonoBehaviour
{
    //SphereCollider m_Collider;
    public Text NPCText;
    public bool craftEnabled;
    private bool actPressed;
    private bool pickPressed;
    private Transform target;
    private InteractableItem t_Item;
    public bool index_drop;

    private bool exchangeEnabled;
    private bool exchanged;

    // Use this for initialization
    void Start()
    {
        // initialize the button
        actPressed = false;
        pickPressed = false;

        exchangeEnabled = false;
        exchanged = false;
        index_drop = true;
    }

    public void disable_Act_function()
    {
        actPressed = false;
        if (exchangeEnabled)
        {
            exchanged = true;
        }
        if (craftEnabled) {
            if (BagManager.bagPanel.GetComponent<BagManager>().craftMode)
            {
                BagManager.bagPanel.GetComponent<BagManager>().craftItem();
            }
            else
            {
                BagManager.bagPanel.GetComponent<BagManager>().beginCraft();
                NPCText.text = "Craft new items by combining items";
            }
        }
    }

    public void disable_Pick_function()
    {
        pickPressed = false;
    }

    public void enable_Act_function()
    {
        actPressed = true;
    }

    public void enable_Pick_funtion()
    {
        pickPressed = true;
    }

    private void OnTriggerEnter(Collider other)
    {
        
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
        if (other.name != "NPC" && !other.gameObject.CompareTag("Floor"))
        {
            index_drop = false;
        }
        /*
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
                        BagManager.bagPanel.GetComponent<BagManager>().addItem(other.transform.GetComponent<Item_reference>().Item_UI_prefab);
                    }
                    else
                    {
                        BagManager.bagPanel.GetComponent<BagManager>().increaseItem(item);
                    }
                    exchanged = false;
                }

            }
        }
        */
        //if holding Act button
        if (actPressed)
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

        if (pickPressed)
        {
            if (other.gameObject.CompareTag("Item"))
            {
                /*
                GameObject item = BagManager.bagPanel.GetComponent<BagManager>().findItem(other.gameObject.name);
                if (item == null)
                {
                */
                BagManager.bagPanel.GetComponent<BagManager>().addItem(other.transform.GetComponent<Item_reference>().Item_UI_prefab, other.transform.GetComponent<Item_reference>().itemHP);
                index_drop = true;
                Destroy(other.gameObject); 
                /*
                }
                else
                {
                    BagManager.bagPanel.GetComponent<BagManager>().increaseItem(item);
                    return;
                }
                */

            }
            else if (other.gameObject.CompareTag("Damage"))
            {
                other.gameObject.SetActive(false);
                Temperature.temperature -= 0.3f;
            }
            else if (other.gameObject.CompareTag("Recovery"))
            {
                other.gameObject.SetActive(false);

                if (Temperature.temperature >= 0.6f)
                {
                    Temperature.temperature = 1f;
                }
                else
                {
                    Temperature.temperature += 0.4f;
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
}
