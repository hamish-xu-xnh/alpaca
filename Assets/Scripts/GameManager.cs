using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour {
    public static float temperature;
    public float startingTemperature;
    public Image tIndicator;
    public Image hole;
	public GameObject worldCamera;
	public Image Portrait;

	private float SkillTimer;
    private bool SkillFlag = false;
    private float SpeedTimer;
    private bool SpeedFlag = false;
    private float VisionTimer;
    private bool VisionFlag = false;
    private float GhostTimer;
    public static bool GhostFlag = false;
    private float AmplifyTimer;
    private bool AmplifyFlag = false;
    private float FreezeTimer;
    private bool FreezeFlag=false;
    private static int time_limit;
    private float time_slot;
    public GameObject Timertxt;

    public static float bc;//expire
    public static float bs;//speed
    public static float ba;//amplify
    public static float bv;//vision

    // Use this for initialization
    private void Awake()
    {
        temperature = startingTemperature;
    }
    void Start () {
        time_limit = 100;
        time_slot = 0f;
        bv = 0f;
    }
    void Update()
    {
        tIndicator.fillAmount = temperature;
    }
    private void FixedUpdate()
    {
        time_slot += 0.02f;
        if (time_slot >= 1)
        {
            time_limit--;
            Timertxt.GetComponent<Text>().text = string.Format("{0:d1}:{1:d2}", time_limit / 60, time_limit % 60);
            time_slot = 0;
        }
        if (time_limit <= 0)
        {
            SceneManager.LoadScene("Lose");
        }
        /*
        if(time_limit<=0 && !win.activeSelf)
        {
            lose.SetActive(true);
        }
        */
        if (Portrait.fillAmount < 1f) {
			Portrait.fillAmount += 0.002f;
		}
		if(SkillFlag){
			SkillTimer -= 1f;
			if(SkillTimer<=0f){
				SkillTimeout ();
			}
		}
        if (SpeedFlag)
        {
            SpeedTimer -= 1f;
            if (SpeedTimer <= 0f)
            {
                SpeedTimeout();
            }
        }
        if (VisionFlag)
        {
            VisionTimer -= 1f;
            if (VisionTimer <= 0f)
            {
                VisionTimeout();
            }
        }
        if (GhostFlag)
        {
            GhostTimer -= 1f;
            if (GhostTimer <= 0f)
            {
                GhostTimeout();
            }
        }
        if (AmplifyFlag)
        {
            AmplifyTimer -= 1f;
            if (AmplifyTimer <= 0f)
            {
                AmplifyTimeout();
            }
        }
        if (FreezeFlag)
        {
            FreezeTimer -= 1f;
            if (FreezeTimer <= 0f)
            {
                FreezeTimeout();
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
        if (!FreezeFlag) {
            if (temperature <= 0.4 && temperature >= 0)
            {
                //float size = 90f - 70f * (1f - HitPoint / 100f) * (1 - bv);
                //hole.transform.localScale = new Vector3(size, size, 0);
                Cool(0.0001f);
            }
            else if (temperature >= 0.6 && temperature <= 1)
            {
                //float size = 90f - 70f * (1f - HitPoint / 100f) * (1 - bv);
                //hole.transform.localScale = new Vector3(size, size, 0);
                Cool(-0.0001f);
            }
            else if (temperature < 0.6 && temperature > 0.5)
            {
                Cool(0.0001f);
            }
            else if (temperature > 0.4 && temperature < 0.5)
            {
                Cool(-0.0001f);
            }
        }
        float size = 90f - 70f * (temperature) * (1 - bv * (1 + GameManager.ba));
        hole.transform.localScale = new Vector3(size, size, 0);
    }

    public void Cool(float amount)
    {
        temperature -= amount;
    }
    /*
    public void Heal(float amount)
    {
        HitPoint += amount;
        Temperature.temperature = HitPoint / StartingHitPoint;
    }
    */
    public void IceItemUsed()
    {
        Cool(0.2f*(1+ba));
    }
    public void FireItemUsed()
    {
        Cool(-0.2f*(1+ba));
    }

    public void SpeedItemUsed()
    {
        bs += 1f;
        SpeedTimer = 500f;//10 Seconds
        SpeedFlag = true;
    }
    public void SpeedTimeout()
    {
        bs -= 1f;
        SpeedFlag = false;
    }
    public void VisionItemUsed()
    {
        bv += 0.3f;
        VisionTimer = 500f;//10 Seconds
        VisionFlag = true;
    }
    public void VisionTimeout()
    {
        bv -= 0.3f;
        VisionFlag = false;
    }
    public void GhostItemUsed()
    {
        GhostTimer = 500f;//10 Seconds
        GhostFlag = true;
    }
    public void GhostTimeout()
    {
        GhostFlag = false;
    }
    public void AmplifyItemUsed()
    {
        ba += 0.3f;
        AmplifyTimer = 500f;//10 Seconds
        AmplifyFlag = true;

    }
    public void AmplifyTimeout()
    {
        ba -= 0.3f;
        AmplifyFlag = false;
    }
    public void FreezeItemUsed()
    {
        ba -= 0.3f;
        FreezeTimer = 500f;//10 Seconds
        FreezeFlag = true;

    }
    public void FreezeTimeout()
    {
        ba += 0.3f;
        FreezeFlag = false;
    }


    public void PortraitClicked()
    {
        SkillUsed();
    }
    public void SkillUsed()
    {
        if (Portrait.fillAmount == 1f)
        {
            SkillFlag = true;
            time_limit -= 20;
            SkillTimer = 100f;//2 Seconds
            Portrait.fillAmount = 0f;
            worldCamera.SetActive(true);
            hole.gameObject.SetActive(false);
        }
    }
    public void SkillTimeout()
    {
        SkillFlag = false;
        hole.gameObject.SetActive(true);
        worldCamera.SetActive(false);
    }


}
