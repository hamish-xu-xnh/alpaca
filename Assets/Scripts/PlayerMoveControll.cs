﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlayerMoveControll : MonoBehaviour {

    public static GameObject Player;
    public float m_speed;

    public JoyStick moveJoystick;

    private string m_MoveVertical;
    private string m_MoveHorizontal;

    private float m_MoveHorizontalValue;
    private float m_MoveVerticalValue;
    //private float m_TurnValue;

    private Vector3 movement;

    // Use this for initialization
    void Start()
    {
        Player = this.gameObject;
        m_MoveVertical = "Vertical";
        m_MoveHorizontal = "Horizontal";
        movement = new Vector3(0f, 0f, 0f);
        GameManager.bs = 0f;

        
    }

    // Update is called once per frame
    void Update()
    {
        if (GameManager.temperature < 0.4)
        {
            transform.GetChild(2).gameObject.SetActive(true);
            transform.GetChild(3).gameObject.SetActive(false);
            transform.GetChild(4).gameObject.SetActive(false);
        }
        else if (GameManager.temperature > 0.6)
        {
            transform.GetChild(2).gameObject.SetActive(false);
            transform.GetChild(3).gameObject.SetActive(false);
            transform.GetChild(4).gameObject.SetActive(true);
        }
        else
        {
            transform.GetChild(2).gameObject.SetActive(false);
            transform.GetChild(3).gameObject.SetActive(true);
            transform.GetChild(4).gameObject.SetActive(false);
        }
        m_speed = (20f - 16f * (1- GameManager.temperature))*(1+ GameManager.bs * (1 + GameManager.ba));
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

    

    
}
