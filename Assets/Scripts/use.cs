using System.Collections;
using UnityEngine.UI;
using UnityEngine;

public class use : MonoBehaviour {

    public GameObject Text;
    public GameObject icon_chosen;
    public GameObject obj;
    private bool bag_lock;

    public void Start()
    {
        bag_lock = false;
    }

    public void SelectMe()
    {
        bag_lock = !bag_lock;
        if (bag_lock)
        {
            foreach (Transform slot in BagManager.bagPanel.transform)
            {
                
                if(slot.transform.childCount == 0)
                {
                    slot.gameObject.SetActive(false);
                }
                else if (slot.GetChild(0).gameObject.name != icon_chosen.gameObject.name)
                {
                    slot.gameObject.SetActive(false);
                }
                else
                {
                    slot.GetChild(0).GetChild(1).gameObject.SetActive(bag_lock);
                    slot.GetChild(0).GetChild(2).gameObject.SetActive(bag_lock);
                }
            }
        }
        else
        {
            foreach (Transform slot in BagManager.bagPanel.transform)
            {
                if (slot.transform.childCount == 0)
                {
                    slot.gameObject.SetActive(true);
                }
                else if(slot.GetChild(0).gameObject.name != icon_chosen.gameObject.name)
                {
                    slot.gameObject.SetActive(true);
                }
                else
                {
                    slot.GetChild(0).GetChild(1).gameObject.SetActive(bag_lock);
                    slot.GetChild(0).GetChild(2).gameObject.SetActive(bag_lock);
                }
            }
        }
    }
    
    public void Use()
	{
        GameObject.Find("Canvas").GetComponent<AutoDecrease>().Heal(0.6f);
        if (System.Int32.Parse (Text.GetComponent<Text> ().text) > 1) {
			int tcount = System.Int32.Parse (Text.GetComponent<Text> ().text) - 1;
            Text.GetComponent<Text> ().text = "" + tcount;

        }
        else {
            SelectMe();
            Destroy(this.gameObject);
        }
    }

    public void Drop()
    {
        
        Vector3 objectpos = PlayerMoveControll.Player.transform.GetChild(0).transform.position;

        Instantiate(obj, objectpos, Quaternion.identity).SetActive(true);
        SelectMe();
            Destroy(this.gameObject);
    }
}
