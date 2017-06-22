using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Item_reference : MonoBehaviour {
    public GameObject Item_UI_prefab;
    public float itemHP;

    private void FixedUpdate()
    {
        itemHP -= 0.05f*2*(1 - Temperature.temperature);
        if (itemHP < 0)
        {
            Destroy(this.gameObject);
        }
    }
}

