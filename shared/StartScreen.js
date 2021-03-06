"use strict";
let chooseChallenge = document.querySelector("#chooseChallenge");
let Savebutton = document.querySelector(".savename");
let spielanfrageButton = document.querySelector("#spielanfrageSenden");
// Textfielduser -> nach der eingabe das Textfield selektier und mit inner html den wert aus dem Input feld inputfield.value
// let input: HTMLInputField = <HTMLInputField>document.querySelector("input"); 
// let name: string = input.value; 
// let div: HTMLDivElement = <HTMLDivElement>document.querySelector(".user")
// div.innerHTML = name; //alida
//window.alert bei den credit points 
// window.allert -> server -> interface zwei strings -> selector - Daten selber; siwtch case -> was grade ankam.window.prompt
class StartScreen {
    constructor(id) {
        this.screenDiv = null;
        this.textDiv = null;
        this.managers = [];
        this.screenDiv = document.getElementById(id);
        this.textDiv = this.screenDiv.querySelector("p");
    }
    setText(text) {
        this.textDiv.classList.remove("error");
        this.textDiv.innerHTML = text;
    }
    setError(text) {
        this.textDiv.classList.add("error");
        this.textDiv.innerHTML = text;
    }
    start() {
        return new Promise((resolve) => {
            this.screenDiv.style.display = "block";
            spielanfrageButton.style.display = "none";
            chooseChallenge.style.display = "none";
            this.setText("Gleich kannst du starten");
            Savebutton.addEventListener("click", () => {
                this.setText("Du wirst eingeloggt...");
                const promises = [];
                for (let manager of this.managers) {
                    const promise = manager.getCheck();
                    promises.push(promise);
                }
                Promise.all(promises)
                    .then(() => {
                    this.close();
                    resolve();
                })
                    .catch((error) => {
                    this.setError(error);
                    //reject(error); // dead end :-)
                });
            });
        });
    }
    addResourceManager(manager) {
        this.managers.push(manager);
    }
    close() {
        this.screenDiv.style.display = "none";
        spielanfrageButton.style.display = "block";
        chooseChallenge.style.display = "block";
    }
}
//# sourceMappingURL=StartScreen.js.map