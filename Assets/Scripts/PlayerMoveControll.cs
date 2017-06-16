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
        }
    }
    void OnTriggerExit(Collider other)
    {
        if (other.gameObject.CompareTag("NPC"))
        {
            NPCText.text = "";
        }
    }
}
