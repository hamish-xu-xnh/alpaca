﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class StarManager : MonoBehaviour {
    public static GameObject starPanel;
    //public GameObject winScreen;
    //public Image loseScreen;
    //public bool craftMode;
    public GameObject slotPrefab;
    public Vector2 inventorySize;
    public float slotSize;
    public Vector2 windowSize;
    //public Button bagButton;
    //public Button actButton;
    //public GameObject targetItem;
    

    //before start
    public void Awake()
    {
        starPanel = this.gameObject;
        //craftMode = false;

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
        //this.gameObject.SetActive(false);
    }
    
    //add a new item to the bag
    public void addStar(GameObject starPrefab,float hp)
    {
        foreach (Transform slot in StarManager.starPanel.transform)
        {
            if (slot.childCount == 0)
            {
                GameObject itemIcon = Instantiate(starPrefab) as GameObject;
                itemIcon.GetComponent<ItemManager>().itemHP = hp;
                itemIcon.transform.SetParent(slot);
				itemIcon.transform.localScale = new Vector3 (1, 1, 1);
                itemIcon.GetComponent<RectTransform>().anchoredPosition = Vector3.zero;
                itemIcon.name = itemIcon.GetComponent<ItemManager>().itemName;
                return;
            }
        }
    }
}
