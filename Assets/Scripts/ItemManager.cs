using System.Collections;
using UnityEngine.UI;
using UnityEngine;

public class ItemManager : MonoBehaviour {

    public string itemName;
    public GameObject Text;
    public GameObject icon_chosen;
    public GameObject obj;
    public bool selected;
    public float itemHP;

    public void Start()
    {
        selected = false;
    }

    public void itemFixedUpdate()
    {
        itemHP -= 0.1f*2*(1- Temperature.temperature);
        Text.GetComponent<Text>().text = "" + (int)itemHP;
        if (itemHP < 0)
        {
            Unselect();
            Destroy(this.gameObject);
        }
        if (!PlayerMoveControll.Player.transform.GetChild(0).transform.GetComponent<Interact>().index_drop)
        {
            this.transform.GetChild(2).GetChild(0).gameObject.GetComponent<Text>().text = "X";
        }
        else{
            this.transform.GetChild(2).GetChild(0).gameObject.GetComponent<Text>().text = "Drop";
        }
    }

    public void ClickMe()
    {
        if (selected)
        {
            Unselect();
        }
        else
        {
            Select();
        }
    }

    public void Select()
    {
        if (!BagManager.bagPanel.GetComponent<BagManager>().craftMode)
        {
            BagManager.bagPanel.GetComponent<BagManager>().ClearSelection();
            this.transform.GetChild(1).gameObject.SetActive(true);
            this.transform.GetChild(2).gameObject.SetActive(true);
        }
        selected = true;
        this.transform.parent.GetComponent<SlotManager>().select();
    }

    public void Unselect()
    {
        this.transform.GetChild(1).gameObject.SetActive(false);
        this.transform.GetChild(2).gameObject.SetActive(false);
        selected = false;
        this.transform.parent.GetComponent<SlotManager>().unselect();
    }

    public void Use()
	{
        GameObject.Find("Canvas").GetComponent<AutoDecrease>().Heal(0.6f);
        /*
        if (System.Int32.Parse (Text.GetComponent<Text> ().text) > 1) {
			int tcount = System.Int32.Parse (Text.GetComponent<Text> ().text) - 1;
            Text.GetComponent<Text> ().text = "" + tcount;

        }
        else {
        */
            Unselect();
            Destroy(this.gameObject);
        /*
        }
        */
    }

    public void Drop()
    {
        if (PlayerMoveControll.Player.transform.GetChild(0).transform.GetComponent<Interact>().index_drop)
        {
            Vector3 objectpos = PlayerMoveControll.Player.transform.GetChild(0).transform.position;
            /*
            int num = System.Int32.Parse(Text.GetComponent<Text>().text);
            for (int i = num; i > 0; i--)
            {
            */
                GameObject item = Instantiate(obj, objectpos, Quaternion.identity) as GameObject;
                item.SetActive(true);
                item.name = this.name;
                item.GetComponent<Item_reference>().itemHP = this.itemHP;

            /*
            }
            */
            Unselect();
            Destroy(this.gameObject);
        }
        
    }
}
