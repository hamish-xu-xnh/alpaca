using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class AutoDecrease : MonoBehaviour {
    public GameObject win;
    public GameObject lose;
    public float StartingHitPoint = 100;
    private float HitPoint;
    public Image HitPointBar;
    // Use this for initialization
    void Start () {
        HitPoint = StartingHitPoint;
    }
	
	// Update is called once per frame
	void Update () {
		
	}

    private void FixedUpdate()
    {
        HitPoint = HitPointBar.fillAmount * StartingHitPoint;
        TakeDamage(0.05f);

        if (HitPoint <= 0 && !win.activeSelf)
        {
            lose.SetActive(true);
        }
    }

    public void TakeDamage(float amount)
    {
        HitPoint -= amount;
        HitPointBar.fillAmount = HitPoint / StartingHitPoint;
    }
}
