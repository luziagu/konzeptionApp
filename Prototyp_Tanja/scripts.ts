
 namespace highfive {
  interface Point {
    label: string;
    element: HTMLDivElement;
    text: HTMLDivElement;
    latitude: number;
    longitude: number;
  }
  // let boolean= false;

  const pointsDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("points");
  const userPointDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".point.user");
  const paulPointDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".point.paul");
  const luisaPointDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".point.luisa");
  // const myProfile: HTMLDivElement = <HTMLDivElement>document.querySelector(".myProfile");
  const top: HTMLButtonElement = <HTMLButtonElement>document.querySelector(".thumbsup");

  const userTextDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".text-field.user");
  const paulTextDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".text-field.paul");
  const luisaTextDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".text-field.luisa");
  
  const points: Point[] = [
    { label: "You", element: userPointDiv, text: userTextDiv, latitude: 0, longitude: 0 },
    { label: "paul", element: paulPointDiv,  text: paulTextDiv, latitude: 48.049993, longitude: 8.210727 },
    { label: "luisa", element: luisaPointDiv,  text: luisaTextDiv, latitude: 48.095364, longitude: 8.154895 },
  ];

  userPointDiv.addEventListener("touchend", playRequest);
  userPointDiv.addEventListener("mouseup", playRequest);
  paulPointDiv.addEventListener("touchend", playRequest);
  paulPointDiv.addEventListener("mouseup", playRequest);
  luisaPointDiv.addEventListener("touchend", playRequest);
  luisaPointDiv.addEventListener("mouseup", playRequest);
  //userPointDiv.addEventListener("touchend", Answer);
  // paulPointDiv.addEventListener("touchend", Answer);
  // luisaPointDiv.addEventListener("mouseup", Answer);

  // myProfile.addEventListener("mouseup", playRequest); 
  // myProfile.addEventListener("touchend", playRequest);
  top.addEventListener("click", Countfive);
 

  // create start screen and register 
  const geoLocationManager: GeoLocationManager = new GeoLocationManager();
  geoLocationManager.onLocation = onLoction;

  // create start screen and register web audio manager
  const startScreen: StartScreen = new StartScreen("start-screen");
  startScreen.addResourceManager(geoLocationManager);

  // start (creates audio context )
  startScreen.start();

  window.addEventListener("resize", calculatePoints);

  function playRequest(e: MouseEvent | TouchEvent): void {
    alert("Möchtest du eine Spielanfrage senden?")
  }

  // async function Answer(_event) {

  //   let dataServer = JSON.stringify("Luzia hat eine Spielanfrage gesendet. Möchtest du sie annehmen?"); //wandelt Array in einen JSON string um, damit der Server es lesen kann 
  //   let query = new URLSearchParams(dataServer); //query aus den Daten kreieren 
  //   let response = await fetch(url + "?safeImage&name=" + "&" + query.toString()); //(await) warten bis fetch die Daten hat
  //   let texte = await response.text(); //text() liefert mir nicht direkt einen string, sondern nur die Promise einen string zu liefern, wenn sie die Daten hat (solage warten ->await)
  //   console.log("Juhu");
  //   alert("Paul hat die Spielanfrage angenommen!");
  //boolean = true,
  //if boolean == true, dann nächste aktion
  // }
 
  function onLoction(coord: GeolocationCoordinates, timestamp: number): void {
    const userPoint: Point = points[0];

    userPoint.latitude = coord.latitude;
    userPoint.longitude = coord.longitude;

    if (userPoint.label === "You") {
      userPoint.element.classList.add("breathe");
      setTimeout(() => userPoint.element.classList.remove("breathe"), 250);
    }

    calculatePoints();
  }

 function Countfive(): void {

   let Credits: any = document.querySelector("#creditpoints");  
  //  let Inhalt: number = Credits.innerHTML;
   let five: number = 5;
  
    if (five != 0) {
      Credits.innerHTML++;
      
    }
    
  }

  function calculatePoints(): void {
    let maxLatitude: number = -Infinity;
    let minLatitude: number = Infinity;
    let maxLongitude: number = -Infinity;
    let minLongitude: number = Infinity;

    for (let point of points) {  
      maxLatitude = Math.max(maxLatitude, point.latitude);
      minLatitude = Math.min(minLatitude, point.latitude);
      maxLongitude = Math.max(maxLongitude, point.longitude);
      minLongitude = Math.min(minLongitude, point.longitude);
    }

    const margin: number = 40;
    const rect: DOMRect = pointsDiv.getBoundingClientRect();
    const width: number = rect.width;
    const height: number = rect.height;
    const size: number = Math.min(width, height);
    const xMargin: number = margin + 0.5 * (width - size);
    const yMargin: number = margin + 0.5 * (height - size);
    const distLatitude: number = maxLatitude - minLatitude;
    const distLongitude: number = maxLongitude - minLongitude;
    const scaleX: number = (size - 2 * margin) / distLongitude;
    const scaleY: number = (size - 2 * margin) / distLatitude;

    for (let point of points) { 
      const x: number = xMargin + scaleX * (point.longitude - minLongitude); 
      const y: number = yMargin + scaleY * (point.latitude - minLatitude); 

      point.element.style.left = `${x}px`;
      point.element.style.bottom = `${y}px`;
      point.text.innerHTML = `${point.label}: ${point.latitude.toFixed(3)}, ${point.longitude.toFixed(3)}`;
    }
  }

 

}
