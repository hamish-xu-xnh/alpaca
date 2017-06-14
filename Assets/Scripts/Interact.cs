using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Interact : MonoBehaviour
{
    //SphereCollider m_Collider;
    public GameObject itemPrefab;
    public GameObject winScreen;
    public GameObject bagPanel;
    private bool buttonHeld;
    private bool PI;
    private Transform target;
    private InteractableItem t_Item;
    public Image SandValue;

    // Use this for initialization
    void Start()
    {
        // initialize the button
        buttonHeld = false;
        PI = false;
    }

    public void disable_RESHAPE_function()
    {
        buttonHeld = false;
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
            else if (other.gameObject.CompareTag("DAMAGE"))
            {
                other.gameObject.SetActive(false);
                SandValue.fillAmount -= 0.3f;
            }
            else if (other.gameObject.CompareTag("RECOVERY"))
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
        if (other.gameObject.CompareTag("Interactable"))
        {
            other.gameObject.transform.Find("Canvas").gameObject.SetActive(false);
            //gameObject.transform.GetComponent<InteractableItem>().InteractStoped();
        }
    }
}
