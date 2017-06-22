using System.Collections;
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

    // Use this for initialization
    void Start () {
        HitPoint = StartingHitPoint;
    }
	
    private void FixedUpdate()
    {
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
			TakeDamage(20f);
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
