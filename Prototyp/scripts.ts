/**
 * Code example using the Geolocation API
 * (based on the StartScreen and ResourceManager abstractions)
 * Norbert Schnell, 2021
 */
 namespace highfive {
  interface Point {
    label: string;
    element: HTMLDivElement;
    text: HTMLDivElement;
    latitude: number;
    longitude: number;
  }

  const pointsDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("points");
  const userPointDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".point.user");
  const paulPointDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".point.paul");
  const luisaPointDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".point.luisa");
  const myProfile: HTMLDivElement = <HTMLDivElement>document.querySelector(".myProfile");
  const addPointsButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#AddPoints");

  const userTextDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".text-field.user");
  const paulTextDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".text-field.paul");
  const luisaTextDiv: HTMLDivElement = <HTMLDivElement>document.querySelector(".text-field.luisa");
  
  const points: Point[] = [
    { label: "You", element: userPointDiv, text: userTextDiv, latitude: 0, longitude: 0 },
    { label: "Paul", element: paulPointDiv,  text: paulTextDiv, latitude: 48.049993, longitude: 8.210727 },
    { label: "Luisa", element: luisaPointDiv,  text: luisaTextDiv, latitude: 48.095364, longitude: 8.154895 },
  ];

  userPointDiv.addEventListener("touchend", playRequest);
  userPointDiv.addEventListener("mouseup", playRequest);
  paulPointDiv.addEventListener("touchend", playRequest);
  paulPointDiv.addEventListener("mouseup", playRequest);
  luisaPointDiv.addEventListener("touchend", playRequest);
  luisaPointDiv.addEventListener("mouseup", playRequest);
  myProfile.addEventListener("mouseup", myProfilePopUp); 
  myProfile.addEventListener("touchend", myProfilePopUp);
  addPointsButton.addEventListener("mouseup", addCreditPoints); 
  addPointsButton.addEventListener("touchend", addCreditPoints);

  // create start screen and register 
  const geoLocationManager: GeoLocationManager = new GeoLocationManager();
  geoLocationManager.onLocation = onLoction;

  // create start screen and register web audio manager
  const startScreen: StartScreen = new StartScreen("start-screen");
  startScreen.addResourceManager(geoLocationManager);

  // start (creates audio context )
  startScreen.start();

  window.addEventListener("resize", calculatePoints); 



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

  function addCreditPoints(): void {
    alert("Eine Aufgabe erfolgreich gelöst.")
    let creditPoints: any = document.querySelector("#creditPoint"); 
    let five: number = 5; 
    
    

    if (five != 0) {
      creditPoints.innerHTML++; 
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

  function playRequest(): void {
    alert("Möchtest du eine Spielanfrage senden?")
  }

  function myProfilePopUp(): void {
    alert("Dein Profil")
  }
  
}
