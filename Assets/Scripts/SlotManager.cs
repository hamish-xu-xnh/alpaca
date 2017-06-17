using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SlotManager : MonoBehaviour {

    public Sprite originalImage;
    public Sprite selectedImage;
    private bool selected;

    // Use this for initialization
    void Start()
    {
        selected = false;
    }

    public void select()
    {
        selected = true;
        GetComponent<Image>().sprite = selectedImage;
    }
    public void unselect()
    {
        selected = false;
        GetComponent<Image>().sprite = originalImage;
    }

    public bool isSelected()
    {
        return selected;
    }
}
