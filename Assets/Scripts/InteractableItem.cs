using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class InteractableItem : MonoBehaviour {
    public float StartingHitPoint=100;
    private float HitPoint;
    public GameObject obj;
    public bool objectSpawned;
    public Image HitPointBar;


	// Use this for initialization
	void Start () {
        objectSpawned = false;
        HitPoint = StartingHitPoint;
	}
	
	// Update is called once per frame
	void Update () {
		
	}

    private void FixedUpdate()
    {
        if (gameObject.transform.Find("Canvas").gameObject.activeSelf)
        {
            TakeDamage(3f * (GameManager.temperature+0.1f)*(1+ GameManager.bs * (1 + GameManager.ba)));
        }
        if (HitPoint <= 0)
        {
            Interacted();
        }
    }

    public void TakeDamage(float amount)
    {
        HitPoint -= amount;
        HitPointBar.fillAmount = HitPoint/StartingHitPoint;
    }

    public void Interacting()
    {
        gameObject.transform.Find("Canvas").gameObject.SetActive(true);
    }

    public void InteractStoped()
    {
        gameObject.transform.Find("Canvas").gameObject.SetActive(false);
    }

    public void Interacted()
    {
        gameObject.transform.Find("BeforeInteracted").gameObject.SetActive(false);
        gameObject.transform.Find("AfterInteracted").gameObject.SetActive(true);
        InteractStoped();
        if (!objectSpawned) {
        spawn();
        }
        HitPoint = StartingHitPoint;
    }
    /*
    public void respawn()
    {
        objectSpawned = false;
        gameObject.transform.Find("BeforeInteracted").gameObject.SetActive(true);
        gameObject.transform.Find("AfterInteracted").gameObject.SetActive(false);
    }
    */

    public void spawn()
    {
        GameObject item = Instantiate(obj) as GameObject;
        item.SetActive(true);
        item.transform.SetParent(transform.GetChild(2));
        item.transform.localPosition = Vector3.zero;
        objectSpawned = true;
    }
}
