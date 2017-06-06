using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMove : MonoBehaviour {

    public float m_speed = 12f;
    public float m_turnSpeed = 180f;

    public JoyStick moveJoystick;

    private string m_MovermentAxisName;
    private string m_TurnAxisName;
    private Rigidbody m_Rigidbody;
    private float m_MovementInputValue;
    private float m_TurnInputValue;

	// Use this for initialization
	void Start () {
        m_MovermentAxisName = "Vertical";
        m_TurnAxisName = "Horizontal";
        m_Rigidbody = GetComponent<Rigidbody>();
	}
	
	// Update is called once per frame
	void Update () {
        m_MovementInputValue = Input.GetAxis(m_MovermentAxisName);
        m_TurnInputValue = Input.GetAxis(m_TurnAxisName);

        if (moveJoystick.InputDirection != Vector3.zero) {
            m_MovementInputValue = moveJoystick.InputDirection.x;
            m_TurnInputValue = moveJoystick.InputDirection.z;
        }

	}

    void FixedUpdate() {
        Move();
        Turn();
    }

    void Move() {
        Vector3 movement = transform.forward * m_MovementInputValue * m_speed * Time.deltaTime;

        m_Rigidbody.MovePosition(m_Rigidbody.position + movement);
    }

    void Turn() {
        float turn = m_TurnInputValue * m_turnSpeed * Time.deltaTime;

        Quaternion turnRotation = Quaternion.Euler(0f, turn, 0f);

        m_Rigidbody.MoveRotation(m_Rigidbody.rotation * turnRotation);
    }

}
