using System.Collections;
using UnityEngine.UI;
using UnityEngine;

public class ItemManager : MonoBehaviour {

    public string itemName;
    public GameObject Text;
    public GameObject icon_chosen;
    public GameObject obj;
    public string intObjName;
    public bool selected;
    public float itemHP;
    private float ItemTimer;
    private bool ItemFlag = false;

    public void Start()
    {
        ItemTimer = 500f;
        selected = false;
    }

    public void itemFixedUpdate()
    {
        this.GetComponent<Image>().fillAmount = ItemTimer / 500;
        if (ItemFlag)
        {
            ItemTimer -= 1f;
            if (ItemTimer <= 0f)
            {
                ItemTimeout();
            }
        }
        else
        {
            itemHP -= 0.1f * (GameManager.temperature) * (1 - GameManager.bc);
            Text.GetComponent<Text>().text = "" + (int)itemHP;
        }

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
        /*
        if (!BagManager.bagPanel.GetComponent<BagManager>().craftMode)
        {
        */
        if (!ItemFlag) {
            BagManager.bagPanel.GetComponent<BagManager>().ClearSelection();
            this.transform.GetChild(1).gameObject.SetActive(true);
            this.transform.GetChild(2).gameObject.SetActive(true);
        }
        /*
        }
        */
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
        if (this.name == "IceItem")
        {
            GameObject.Find("Canvas").GetComponent<GameManager>().IceItemUsed();
            /*
            if (System.Int32.Parse (Text.GetComponent<Text> ().text) > 1) {
                int tcount = System.Int32.Parse (Text.GetComponent<Text> ().text) - 1;
                Text.GetComponent<Text> ().text = "" + tcount;
            }
            else {
            Unselect();
           
            }
            */
            Destroy(this.gameObject);
        }
        if (this.name == "FireItem")
        {
            GameObject.Find("Canvas").GetComponent<GameManager>().FireItemUsed();
            Destroy(this.gameObject);
        }
        if (this.name == "SpeedItem")
        {
            GameObject.Find("Canvas").GetComponent<GameManager>().SpeedItemUsed();
        }
        if (this.name == "VisionItem")
        {
            GameObject.Find("Canvas").GetComponent<GameManager>().VisionItemUsed();
        }
        if (this.name == "GhostItem")
        {
            GameObject.Find("Canvas").GetComponent<GameManager>().GhostItemUsed();
        }
        if (this.name == "AmplifyItem")
        {
            GameObject.Find("Canvas").GetComponent<GameManager>().AmplifyItemUsed();
        }
        if (this.name == "FreezeItem")
        {
            GameObject.Find("Canvas").GetComponent<GameManager>().FreezeItemUsed();
        }
        this.transform.GetChild(0).gameObject.SetActive(false);
        Unselect();
        ItemUsed();
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

    public void ItemUsed()
    {
        ItemTimer = 500f;//10 Seconds
        ItemFlag = true;
    }
    public void ItemTimeout()
    {
        ItemFlag = false;
        Destroy(this.gameObject);
    }
}
