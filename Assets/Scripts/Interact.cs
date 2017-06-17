using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Interact : MonoBehaviour
{
    //SphereCollider m_Collider;
    public GameObject winScreen;
    public Image SandValue;
    public GameObject bagPanel;
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
            bagPanel.GetComponent<BagManager>().beginCraft();
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
                foreach (Transform slot in bagPanel.transform)
                {
                    //if there is no item in this slot
                    if (slot.transform.childCount == 0)
                    {
                        continue;
                    }
                    //if target item in inventory
                    if (slot.GetChild(0).gameObject.name == "Item1")
                    {
                        string c = slot.GetChild(0).Find("itemText").GetComponent<Text>().text;
                        int tcount = System.Int32.Parse(c) - 1;
                        slot.GetChild(0).Find("itemText").GetComponent<Text>().text = "" + tcount;
                        NPCText.text = "Mission 1 completed";
                        if (tcount <= 0)
                        {
                            Destroy(slot.GetChild(0).gameObject);
                        }

                        //add a new item to the bag;
                        bool itemFound = false;
                        foreach (Transform slotNew in bagPanel.transform)
                        {
                            //if there is no item in this slot
                            if (slotNew.transform.childCount == 0)
                            {
                                continue;
                            }
                            //if item alread in inventory
                            if (slotNew.GetChild(0).gameObject.name == "Item3")
                            {
                                itemFound = true;
                                string cc = slotNew.GetChild(0).Find("itemText").GetComponent<Text>().text;
                                int tcountNew = System.Int32.Parse(cc) + 1;
                                slotNew.GetChild(0).Find("itemText").GetComponent<Text>().text = "" + tcountNew;
                                exchanged = false;
                                return;
                            }

                        }
                        if (!itemFound)
                        {
                            foreach (Transform slotNew in bagPanel.transform)
                            {
                                if (slotNew.transform.childCount == 0)
                                {
                                    GameObject item = Instantiate(other.transform.GetComponent<npcExchange>().Item_UI_prefab) as GameObject;
                                    item.transform.SetParent(slotNew);
                                    item.GetComponent<RectTransform>().anchoredPosition = new Vector3(0, 0, 0);
                                    item.name = "Item3";
                                    exchanged = false;
                                    return;
                                }
                            }
                        }

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
                    //other.gameObject.transform.GetComponent<InteractableItem>().TakeDamage(50f);
                    other.gameObject.transform.GetComponent<InteractableItem>().Interacting();
                    //other.gameObject.transform.Find("Canvas").gameObject.SetActive(true);
                    //other.gameObject.transform.Find("BeforeInteracted").gameObject.SetActive(false);
                    //other.gameObject.transform.Find("AfterInteracted").gameObject.SetActive(true);
                }
            }

 /*           if (other.gameObject.CompareTag("Item"))
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
            }*/
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
                bool itemFound = false;
                foreach (Transform slot in bagPanel.transform)
                {
                    //if there is no item in this slot
                    if(slot.transform.childCount == 0)
                    {
                        continue;
                    }
                    //if item alread in inventory
                    if (slot.GetChild(0).gameObject.name == other.gameObject.name)
                    {
                        itemFound = true;
                        string c = slot.GetChild(0).Find("itemText").GetComponent<Text>().text;
                        int tcount = System.Int32.Parse(c) + 1;
                        slot.GetChild(0).Find("itemText").GetComponent<Text>().text = "" + tcount;

                        if (tcount >= 3)
                        {
                            winScreen.SetActive(true);
                        }
                        return;
                    }
                    
                }
                if (!itemFound)
                {
                    foreach(Transform slot in bagPanel.transform)
                    {
                        if (slot.transform.childCount == 0)
                        {
                            GameObject item = Instantiate(other.transform.GetComponent<Item_reference>().Item_UI_prefab) as GameObject;
                            item.transform.SetParent(slot);
                            item.GetComponent<RectTransform>().anchoredPosition = new Vector3(0, 0, 0);
                            item.name = other.name;
                            return;
                        }
                    }
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
            bagPanel.GetComponent<BagManager>().stopCraft();
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
