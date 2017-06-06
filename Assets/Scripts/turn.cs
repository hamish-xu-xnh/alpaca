using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class turn : MonoBehaviour {
    public float m_turnSpeed = 180f;
    public JoyStick moveJoystick;

    private string m_MovermentAxisName;
    private string m_TurnAxisName;
    private float m_MovementInputValue;
    private float m_MovementInputValue_2;
    private float m_TurnInputValue;
    // Use this for initialization
    void Start () {
        m_MovermentAxisName = "Vertical";
        m_TurnAxisName = "Horizontal";

    }
	
	// Update is called once per frame
	void Update () {
        m_MovementInputValue = Input.GetAxis(m_MovermentAxisName);
        m_MovementInputValue_2 = Input.GetAxis(m_TurnAxisName);
        //m_TurnInputValue = Input.GetAxis(m_TurnAxisName);


        if (moveJoystick.InputDirection != Vector3.zero)
        {
            m_MovementInputValue = moveJoystick.InputDirection.z;
            m_MovementInputValue_2 = moveJoystick.InputDirection.x;
            //m_TurnInputValue = moveJoystick.InputDirection.x;
        }
        //m_TurnInputValue = Mathf.Atan2(m_MovementInputValue_2, m_MovementInputValue)*45/70*90;

        Vector3 movement = new Vector3(m_MovementInputValue_2, 0f, m_MovementInputValue);
        transform.rotation = Quaternion.LookRotation(movement);

    }

    /*
    void FixedUpdate()
    {
        transform.localRotation= Quaternion.Euler(0f, m_TurnInputValue, 0f);
        //Quaternion turnRotation = Quaternion.Euler(0f, turn, 0f);
        //transform.rotation = m_TurnInputValue;
    }
    */
}
