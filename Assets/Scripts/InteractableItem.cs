using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class InteractableItem : MonoBehaviour {
    public Image HitPointBar;
    public float StartingHitPoint=100;
    private float HitPoint;
    public GameObject obj;
    private bool objectSpawned;

    void spawn(){
        Vector3 objectpos = new Vector3(this.transform.position.x + 2,this.transform.position.y,this.transform.position.z );
        Instantiate(obj,objectpos,Quaternion.identity);
        objectSpawned = true;
    }

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
            TakeDamage(1f);
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
}
