using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BagManager : MonoBehaviour {
    public static GameObject bagPanel;
    public GameObject winScreen;
    public bool craftMode;
    public GameObject slotPrefab;
    public Vector2 inventorySize = new Vector2 (4, 2);
    public float slotSize;
    public Vector2 windowSize;
    public Button bagButton;

    public void Awake()
    {
        bagPanel = this.gameObject;
        craftMode = false;

        //Create slots
        for (int x = 1; x <= inventorySize.x; x++)
        {
            for (int y = 1; y <= inventorySize.y; y++)
            {
                //Create a slot
                GameObject slot = Instantiate(slotPrefab) as GameObject;
                //Set the size of the slot
                slot.transform.localScale = new Vector3(slotSize / 50.0f, slotSize / 50.0f, 1f);
                //Set it to be the child of the Bag-Panel
                slot.transform.SetParent(this.transform);
                //Name the slot by its position
                slot.name = "slot_" + x + "_" + y;
                //Put the slot at the right position
                slot.GetComponent<RectTransform>().anchoredPosition = new Vector3(
                    (windowSize.x - windowSize.x / (inventorySize.x) + slotSize) / (inventorySize.x) * (x - 0.5f) + (windowSize.x / (inventorySize.x) - slotSize) / 2,
                    (windowSize.y - windowSize.y / (inventorySize.y) + slotSize) / (inventorySize.y) * (-y + 0.5f) - (windowSize.y / (inventorySize.y) - slotSize) / 2,
                    0);
            }
        }
        this.gameObject.SetActive(false);
    }
    public void Start()
    {
        
    }


    public void openBag()
    {
        this.gameObject.SetActive(true);
        bagButton.transform.GetChild(0).GetComponent<Text>().text = "Close";
    }
    public void closeBag()
    {
        this.gameObject.SetActive(false);
        bagButton.transform.GetChild(0).GetComponent<Text>().text = "Bag";
    }
    public void bagButtonClicked()
    {
        if (this.gameObject.activeSelf)
        {
            stopCraft();
            closeBag();
        }
        else
        {
            openBag();
        }
    }


    public void beginCraft()
    {
        craftMode = true;
        openBag();
    }
    public void stopCraft()
    {
        if(craftMode){
            closeBag();
            ClearSelection();
        }
        
        craftMode = false;
    }
    public bool inCraftMode()
    {
        return craftMode;
    }


    public void ClearSelection()
    {
        foreach (Transform slot in BagManager.bagPanel.transform)
        {
            if (slot.childCount == 0)
            {
                slot.GetComponent<SlotManager>().unselect();
            }
            else
            {
                slot.GetChild(0).GetComponent<ItemManager>().Unselect();
            }
        }
    }

    public GameObject findItem(string name)
    {
        foreach (Transform slot in bagPanel.transform)
        {
            //if there is no item in this slot
            if (slot.transform.childCount == 0)
            {
                continue;
            }
            //if item found
            if (slot.GetChild(0).gameObject.name == name)
            {
                return slot.GetChild(0).gameObject;
            }
        }
        //if item not found
        return null;
    }

    public void addItem(GameObject worldItem)
    {
        foreach (Transform slot in BagManager.bagPanel.transform)
        {
            if (slot.transform.childCount == 0)
            {
                GameObject itemIcon = Instantiate(worldItem.transform.GetComponent<Item_reference>().Item_UI_prefab) as GameObject;
                itemIcon.transform.SetParent(slot);
                itemIcon.GetComponent<RectTransform>().anchoredPosition = Vector3.zero;
                itemIcon.name = itemIcon.GetComponent<ItemManager>().itemName;
                return;
            }
        }
    }

    public void increaseItem(GameObject item)
    {
        string number = item.transform.Find("itemText").GetComponent<Text>().text;
        int amount = System.Int32.Parse(number) + 1;
        item.transform.Find("itemText").GetComponent<Text>().text = "" + amount;

        if (amount >= 3)
        {
            winScreen.SetActive(true);
        }
    }

    public void reduceItem(GameObject item)
    {
        string number = item.transform.Find("itemText").GetComponent<Text>().text;
        int amount = System.Int32.Parse(number) - 1;
        item.transform.Find("itemText").GetComponent<Text>().text = "" + amount;
        if (amount <= 0)
        {
            Destroy(item.transform.gameObject);
        }
    }
}
