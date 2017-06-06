using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player2MoveControll : MonoBehaviour {


    public float m_speed = 12f;
    public float m_turnSpeed = 180f;

    public JoyStick moveJoystick;

    private string m_MoveVertical;
    private string m_MoveHorizontal;
    private string m_TurnAxisName;
    private Rigidbody m_Rigidbody;
    private float m_MoveHorizontalValue;
    private float m_MoveVerticalValue;
    private float m_TurnValue;

    private Vector3 movement;

    // Use this for initialization
    void Start () {

        m_MoveVertical = "Vertical";
        m_MoveHorizontal = "Horizontal";
        m_TurnAxisName = "Horizontal";
        m_Rigidbody = GetComponent<Rigidbody>();
        movement = new Vector3(0f,0f,0f);

    }
	
	// Update is called once per frame
	void Update () {

        m_MoveHorizontalValue = Input.GetAxis(m_MoveHorizontal);
        m_MoveVerticalValue = Input.GetAxis(m_MoveVertical);
        m_TurnValue = Input.GetAxis(m_MoveHorizontal);

        if (moveJoystick.InputDirection != Vector3.zero)
        {
            m_MoveHorizontalValue = moveJoystick.InputDirection.x;
            m_MoveVerticalValue = moveJoystick.InputDirection.z;
            m_TurnValue = moveJoystick.InputDirection.x;
        }

        movement = new Vector3(m_MoveHorizontalValue, 0.0f, m_MoveVerticalValue);

    }
    void FixedUpdate() {
        //Vector3 movement = new Vector3(m_MoveHorizontalValue, 0.0f, m_MoveVerticalValue);
        //transform.Translate(movement * m_speed * Time.deltaTime, Space.World);
        //Quaternion newRota = Quaternion.Lerp(transform.rotation, Quaternion.LookRotation(preMovement, Vector3.up), Time.deltaTime * 10);
        //m_Rigidbody.MoveRotation(newRota);

        
        if (movement != Vector3.zero)
        {
            transform.Translate(movement * m_speed * Time.deltaTime, Space.World);
            transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(movement), Time.deltaTime * 10);
        }
    }
}
