using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LevelManager : MonoBehaviour {
    public Transform mainMenu, optionsMenu;
    public void LoadS(string name)
    {
        SceneManager.LoadScene(name);
    }
    public void QuitG()
    {
        Application.Quit();
    }

}
