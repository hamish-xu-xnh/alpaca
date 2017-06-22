using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class InteractableItem : MonoBehaviour {
    public float StartingHitPoint=100;
    private float HitPoint;
    //public GameObject obj;
    private bool objectSpawned;
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
            TakeDamage(3f * (1 - Temperature.temperature));
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
        if (!objectSpawned) {
        spawn();
        }
    }

    void spawn()
    {
        gameObject.transform.Find("Item").gameObject.SetActive(true);
        objectSpawned = true;
    }
}
