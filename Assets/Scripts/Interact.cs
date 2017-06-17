using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Interact : MonoBehaviour
{
    //SphereCollider m_Collider;
    public GameObject winScreen;
    public Image SandValue;
    public Text NPCText;
    public bool craftEnabled;
    private bool buttonHeld;
    private bool PI;
    private Transform target;
    private InteractableItem t_Item;
    public bool index_drop;

    private bool exchanged;
    private bool npcInteractable;

    // Use this for initialization
    void Start()
    {
        // initialize the button
        buttonHeld = false;
        PI = false;
        exchanged = false;
        npcInteractable = false;
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
            npcInteractable = true;
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
                    string c = item.transform.Find("itemText").GetComponent<Text>().text;
                    int tcount = System.Int32.Parse(c) - 1;
                    item.transform.Find("itemText").GetComponent<Text>().text = "" + tcount;
                    NPCText.text = "Mission 1 completed";
                    if (tcount <= 0)
                    {
                        Destroy(item.transform.gameObject);
                    }

                    //add a new item to the bag;
                    item = BagManager.bagPanel.GetComponent<BagManager>().findItem("Item3");
                    if (item == null)
                    {
                        foreach (Transform slotNew in BagManager.bagPanel.transform)
                        {
                            if (slotNew.transform.childCount == 0)
                            {
                                GameObject itemIcon = Instantiate(other.transform.GetComponent<npcExchange>().Item_UI_prefab) as GameObject;
                                itemIcon.transform.SetParent(slotNew);
                                itemIcon.GetComponent<RectTransform>().anchoredPosition = new Vector3(0, 0, 0);
                                itemIcon.name = "Item3";
                                exchanged = false;
                                return;
                            }
                        }
                    }
                    else
                    {
                        string cc = item.transform.Find("itemText").GetComponent<Text>().text;
                        int tcountNew = System.Int32.Parse(cc) + 1;
                        item.transform.Find("itemText").GetComponent<Text>().text = "" + tcountNew;
                        exchanged = false;
                        return;
                    }
                }

            }
        }
        //if (Input.GetKey("u"))
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
                other.gameObject.transform.Find("Canvas").gameObject.SetActive(false);
                //gameObject.transform.GetComponent<InteractableItem>().InteractStoped();
            }
        }

        if (PI)
        {
            if (other.gameObject.CompareTag("Item"))
            {
                //other.gameObject.transform.GetComponent<InteractableItem>().TakeDamage(50f);
                other.gameObject.SetActive(false);
                GameObject item = BagManager.bagPanel.GetComponent<BagManager>().findItem(other.gameObject.name);
                if (item == null)
                {
                    foreach (Transform slot in BagManager.bagPanel.transform)
                    {
                        if (slot.transform.childCount == 0)
                        {
                            GameObject itemIcon = Instantiate(other.transform.GetComponent<Item_reference>().Item_UI_prefab) as GameObject;
                            itemIcon.transform.SetParent(slot);
                            itemIcon.GetComponent<RectTransform>().anchoredPosition = new Vector3(0, 0, 0);
                            itemIcon.name = other.name;
                            return;
                        }
                    }
                }
                else
                {
                    string c = item.transform.Find("itemText").GetComponent<Text>().text;
                    int tcount = System.Int32.Parse(c) + 1;
                    item.transform.Find("itemText").GetComponent<Text>().text = "" + tcount;

                    if (tcount >= 3)
                    {
                        winScreen.SetActive(true);
                    }
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
            other.gameObject.transform.Find("Canvas").gameObject.SetActive(false);
            //gameObject.transform.GetComponent<InteractableItem>().InteractStoped();
        }
        if (other.gameObject.CompareTag("Exchange"))
        {
            NPCText.text = "";
            npcInteractable = false;
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
        if (npcInteractable)
        {
            exchanged = true;
        }
    }
}
