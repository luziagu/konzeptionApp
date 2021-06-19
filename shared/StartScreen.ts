
interface ResourceManager {
  getCheck(): Promise<void>;

}


// Textfielduser -> nach der eingabe das Textfield selektier und mit inner html den wert aus dem Input feld inputfield.value

// let input: HTMLInputField = <HTMLInputField>document.querySelector("input"); 
// let name: string = input.value; 
// let div: HTMLDivElement = <HTMLDivElement>document.querySelector(".user")
// div.innerHTML = name; //alida

//window.alert bei den credit points 

// window.allert -> server -> interface zwei strings -> selector - Daten selber; siwtch case -> was grade ankam.window.prompt

class StartScreen {
  private screenDiv: HTMLDivElement = null;
  private textDiv: HTMLDivElement = null;
  private managers: ResourceManager[] = [];

  constructor(id: string) {
    this.screenDiv = <HTMLDivElement>document.getElementById(id);
    this.textDiv = <HTMLDivElement>this.screenDiv.querySelector("p");
   
  }


  setText(text: string): void {
    this.textDiv.classList.remove("error");
    this.textDiv.innerHTML = text;
  }

  setError(text: string): void {
    this.textDiv.classList.add("error");
    this.textDiv.innerHTML = text;
  }

  start(): Promise<void> {

  
    return new Promise((resolve) => {
      this.screenDiv.style.display = "block";

      this.setText("click the Button to start");

      let Savebutton: HTMLButtonElement = <HTMLButtonElement>document.querySelector(".savename");

      Savebutton.addEventListener("click", () => {

        this.setText("checking for resources...");
        const promises: Promise<void>[] = [];

        for (let manager of this.managers) {
          const promise: Promise<void> = manager.getCheck();
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

  addResourceManager(manager: ResourceManager): void {
    this.managers.push(manager);
  }

  close(): void {
    this.screenDiv.style.display = "none";
  }
}