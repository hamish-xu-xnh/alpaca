﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class AutoDecrease : MonoBehaviour {
    public GameObject win;
    public GameObject lose;
    public Image hole;
	public GameObject worldCamera;
    public float StartingHitPoint = 100;
	public Image Portrait;
    private float HitPoint;
	private float timer;
    private static int time_limit;
    private float time_slot;
    public GameObject Timertxt;

    // Use this for initialization
    void Start () {
        HitPoint = StartingHitPoint;
        time_limit = 100;
        time_slot = 0f;
    }
	
    private void FixedUpdate()
    {
        time_slot += 0.02f;
        if (time_slot >= 1)
        {
            time_limit--;
            Timertxt.GetComponent<Text>().text = string.Format("{0:d2} : {1:d2}", time_limit / 60, time_limit % 60);
            time_slot = 0;
        }

        if(time_limit<=0 && !win.activeSelf)
        {
            lose.SetActive(true);
        }

        if (Portrait.fillAmount < 1f) {
			Portrait.fillAmount += 0.002f;
		}
		if(worldCamera.activeSelf){
			timer -= 1f;
			if(timer<=0f){
				timeout ();
			}
		}
        foreach (Transform slot in BagManager.bagPanel.transform)
        {
            if (slot.childCount == 0)
            {
                continue;
            }
            else
            {
                slot.GetChild(0).GetComponent<ItemManager>().itemFixedUpdate();
            }
        }

        HitPoint = Temperature.temperature * StartingHitPoint;
        float size =90f - 70f*(1f-HitPoint/100f);
        hole.transform.localScale = new Vector3(size, size, 0);
        TakeDamage(0.01f);

        if (HitPoint >= 100)
        {
            win.SetActive(true);
        }
        else if (HitPoint <= 0 && !win.activeSelf)
        {
            lose.SetActive(true);
        }
    }

    public void TakeDamage(float amount)
    {
        HitPoint -= amount;
        Temperature.temperature = HitPoint / StartingHitPoint;
    }

    public void Heal(float amount)
    {
        if (Temperature.temperature >= 1- amount)
        {
            win.SetActive(true);
        }
        else
        {
            Temperature.temperature += amount;
        }
    }

	public void PortraitClicked(){
		if(Portrait.fillAmount==1f){
            time_limit -= 20;
			timer = 100f;
			Portrait.fillAmount = 0f;
			worldCamera.SetActive (true);
			hole.gameObject.SetActive (false);
		}
	}
	public void timeout(){
		hole.gameObject.SetActive (true);
		worldCamera.SetActive (false);
	}
}
