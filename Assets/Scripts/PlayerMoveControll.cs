using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlayerMoveControll : MonoBehaviour {

    public static GameObject Player;
    public float m_speed = 12f;
    public float m_turnSpeed = 180f;

    public JoyStick moveJoystick;

    private string m_MoveVertical;
    private string m_MoveHorizontal;
    //private string m_TurnAxisName;
    //private Rigidbody m_Rigidbody;
    private float m_MoveHorizontalValue;
    private float m_MoveVerticalValue;
    //private float m_TurnValue;

    private Vector3 movement;

    public Text NPCText;

    public GameObject bagPanel;
    private bool exChange;
    private bool buttonEnable;

    // Use this for initialization
    void Start()
    {
        Player = this.gameObject;
        m_MoveVertical = "Vertical";
        m_MoveHorizontal = "Horizontal";
        //m_TurnAxisName = "Horizontal";
        //m_Rigidbody = GetComponent<Rigidbody>();
        movement = new Vector3(0f, 0f, 0f);

        NPCText.text = "";
        exChange = false;
        buttonEnable = false;
    }

    // Update is called once per frame
    void Update()
    {

        m_MoveHorizontalValue = Input.GetAxis(m_MoveHorizontal);
        m_MoveVerticalValue = Input.GetAxis(m_MoveVertical);
        //m_TurnValue = Input.GetAxis(m_MoveHorizontal);

        if (moveJoystick.InputDirection != Vector3.zero)
        {
            m_MoveHorizontalValue = moveJoystick.InputDirection.x;
            m_MoveVerticalValue = moveJoystick.InputDirection.z;
            //m_TurnValue = moveJoystick.InputDirection.x;
        }

        movement = new Vector3(m_MoveHorizontalValue, 0.0f, m_MoveVerticalValue);

    }
    void FixedUpdate()
    {
        if (movement != Vector3.zero)
        {
            transform.Translate(movement * m_speed * Time.deltaTime, Space.World);
            transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(movement), Time.deltaTime * 10);
        }
    }

    //trigger NPC
    void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.CompareTag("NPC"))
        {
            NPCText.text = "Hello! Give me your fire.";
            buttonEnable = true;
        }
    }
    void OnTriggerStay(Collider other)
    {
        if (other.gameObject.CompareTag("NPC"))
        {

            if (exChange)
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
                                exChange = false;
                                return;
                            }

                        }
                        if (!itemFound)
                        {
                            foreach (Transform slotNew in bagPanel.transform)
                            {
                                if (slotNew.transform.childCount == 0)
                                {
                                    GameObject item = Instantiate(other.transform.GetComponent<NPC>().Item_UI_prefab) as GameObject;
                                    item.transform.SetParent(slotNew);
                                    item.GetComponent<RectTransform>().anchoredPosition = new Vector3(0, 0, 0);
                                    item.name = "Item3";
                                    exChange = false;
                                    return;
                                }
                            }
                        }

                    }

                }

            }
        }
    }
    void OnTriggerExit(Collider other)
    {

        if (other.gameObject.CompareTag("NPC"))
        {
            NPCText.text = "";
            buttonEnable = false;
            exChange = false;
        }
    }

    public void NPCExchange()
    {
        if (buttonEnable)
        {
            exChange = true;
        }

    }
}
