using System.Collections;
using UnityEngine.UI;
using UnityEngine;

public class ItemManager : MonoBehaviour {

    public GameObject Text;
    public GameObject icon_chosen;
    public GameObject obj;
    private bool selected;

    public void Start()
    {
        selected = false;
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
        if (!BagManager.bagPanel.GetComponent<BagManager>().inCraftMode())
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
        if (!BagManager.bagPanel.GetComponent<BagManager>().inCraftMode())
        {
            this.transform.GetChild(1).gameObject.SetActive(false);
            this.transform.GetChild(2).gameObject.SetActive(false);
        }
        selected = false;
        this.transform.parent.GetComponent<SlotManager>().unselect();
    }

    public void Use()
	{
        GameObject.Find("Canvas").GetComponent<AutoDecrease>().Heal(0.6f);
        if (System.Int32.Parse (Text.GetComponent<Text> ().text) > 1) {
			int tcount = System.Int32.Parse (Text.GetComponent<Text> ().text) - 1;
            Text.GetComponent<Text> ().text = "" + tcount;

        }
        else {
            Unselect();
            Destroy(this.gameObject);
        }
    }

    public void Drop()
    {
        if (PlayerMoveControll.Player.transform.GetChild(0).transform.GetComponent<Interact>().index_drop)
        {
            Vector3 objectpos = PlayerMoveControll.Player.transform.GetChild(0).transform.position;
            int num = System.Int32.Parse(Text.GetComponent<Text>().text);
            for (int i = num; i > 0; i--)
            {
                GameObject item = Instantiate(obj, objectpos, Quaternion.identity) as GameObject;
                item.SetActive(true);
                item.name = this.name;
            }
            Unselect();
            Destroy(this.gameObject);
        }
    }
}
