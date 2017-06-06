using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class pickup : MonoBehaviour
{
    public GameObject win;
    public GameObject inventoryPanel;
    public GameObject[] inventoryIcons;

    void OnCollisionEnter(Collision collision)
    {
        foreach (Transform child in inventoryPanel.transform)
        {
            //if item alread in inventory
            if (child.gameObject.tag == collision.gameObject.tag)
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


        /*
        GameObject i;
        if (collision.gameObject.tag == "red")
        {
            i = Instantiate(inventoryIcons[0]);
            i.transform.SetParent(inventoryPanel.transform);
        }
        else if (collision.gameObject.tag == "silver")
        {
            i = Instantiate(inventoryIcons[1]);
            i.transform.SetParent(inventoryPanel.transform);
        }
        else if (collision.gameObject.tag == "white")
        {
            i = Instantiate(inventoryIcons[2]);
            i.transform.SetParent(inventoryPanel.transform);
        }
        */
    }
}
