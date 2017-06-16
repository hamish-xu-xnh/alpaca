using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BagManager : MonoBehaviour {
    public static GameObject bagPanel;
    private bool bagOpened;
    public Transform selectedItem, selectedSlot;
    public GameObject slotPrefab, itemPrefab;
    public Vector2 inventorySize = new Vector2 (4, 2);
    public float slotSize;
    public Vector2 windowSize;

    public void Awake()
    {
        bagPanel = this.gameObject;
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

    public void changeState()
    {
        bagOpened = !bagOpened;
        this.gameObject.SetActive(bagOpened);
    }
}
