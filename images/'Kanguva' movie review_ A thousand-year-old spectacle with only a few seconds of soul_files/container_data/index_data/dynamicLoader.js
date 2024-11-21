function loadFiles(fileUrl, callback) {
  // Capture script tags in the current document
  var originalScripts = document.body.getElementsByTagName("script");
  var originalScriptContents = [];
  for (var i = 0; i < originalScripts.length; i++) {
    originalScriptContents.push(originalScripts[i].outerHTML);
  }
  // create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();
  // set the responseType to 'text' to receive a string response
  xhr.responseType = "text";
  // specify the file URL to load
  xhr.open("GET", fileUrl, true);
  // add an event listener for when the file is loaded
  xhr.onload = function () {
    // get the response text from the XMLHttpRequest object
    var fileText = xhr.response;
    // determine the file type by checking the file extension
    var fileType = fileUrl.split(".").pop();
    if (fileType === "html") {
      // create a new HTML document object for the loaded file
      var fileDoc = new DOMParser().parseFromString(fileText, "text/html");
      // get the head, body, and script elements from the loaded file
      var headElements = fileDoc.getElementsByTagName("head")[0].childNodes;
      var bodyElements = fileDoc.getElementsByTagName("body")[0].childNodes;
      var scriptElements = fileDoc.getElementsByTagName("script");

      var styles = fileDoc.head.querySelectorAll("link[rel='stylesheet']");
      for (var i = 0; i < styles.length; i++) {
        styles[i].parentNode.removeChild(styles[i]);
      }
      // add the head and body elements to the main HTML document
      var head = document.getElementsByTagName("head")[0];
      var body = document.getElementsByTagName("body")[0];
      for (var i = 0; i < headElements.length; i++) {
        head.appendChild(headElements[i].cloneNode(true));
      }
      for (var i = 0; i < bodyElements.length; i++) {
        //body.appendChild(bodyElements[i].cloneNode(true));
        document.body.insertBefore(
          bodyElements[i].cloneNode(true),
          document.body.firstChild
        );
      }
      // add the script elements to the main HTML document
      for (var i = 0; i < scriptElements.length; i++) {
        var script = document.createElement("script");
        script.text = scriptElements[i].text;
        body.appendChild(script);
      }
    } else if (fileType === "css") {
      // create a new style element and set its text to the loaded CSS file
      var style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(fileText));
      // add the style element to the head of the main HTML document
      var head = document.getElementsByTagName("head")[0];
      head.appendChild(style);
    } else if (fileType === "js") {
      // create a new script element and set its text to the loaded JS file
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = fileUrl;

      if (script.readyState) {
        // IE
        script.onreadystatechange = function () {
          if (
            script.readyState === "loaded" ||
            script.readyState === "complete"
          ) {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        script.onload = function () {
          callback();
        };
      }

      //script.appendChild(document.createTextNode(fileText));
      // add the script element to the end of the body of the main HTML document
      var header = document.getElementsByTagName("head")[0];
      header.appendChild(script);
      //var originalScriptsString = originalScriptContents.join("");
      //document.body.insertAdjacentHTML("beforeend", originalScriptsString);
    }
  };
  // send the XMLHttpRequest to load the file
  xhr.send();
}

function addClickElements(clickElements = 1) {
  let clickElemArray = [];

  window.onload = function () {
    for (let i = 0; i < clickElements; i++) {
      let clickElement = document.createElement("div");
      let clickbody = document.body;

      clickElement.id = "clickElement" + (i + 1);
      clickElement.style.position = "absolute";
      clickElement.style.top = "0px";
      clickElement.style.left = "0px";
      clickElement.style.width = "100%";
      clickElement.style.height = "100%";
      clickElement.style.zIndex = "100";
      clickElement.style.backgroundColor = "transparent";
      clickElement.style.cursor = "pointer";

      // Add event listener to prevent default behavior
      clickElement.addEventListener("click", function (event) {
        event.preventDefault();
      });

      clickbody.prepend(clickElement);
      clickElemArray.push(clickElement);
    }

    // Use the clickElemArray here
    console.log("Click elements created successfully:", clickElemArray);
  };

  return clickElemArray;
}

function setDynamicVariables() {
  //Write a loop to get all div ids elements
  var divs = document.getElementsByTagName("*");
  var elements = {};
  //Loop through divs and create a variable for each div id
  for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    var divId = div.id;
    //Create a variable for each div id
    elements[divId] = document.getElementById(divId);
  }
  return elements;
  //console.log(elements);
}

function setStyleClasses(bodyClass, CSSClass) {
  //Write code to add style class to the elements
  //Add style class to each element in body tag
  var bodyElement = document.body;
  bodyElement.classList.add(
    bodyClass
      .toLowerCase()
      .split(" ")
      .join("")
      .replace("-", "")
      .replace("/", "")
  );

  //Add style class to each element in div tag
  var div = document.getElementsByTagName("div");
  for (var i = 0; i < div.length; i++) {
    div[i].classList.add(
      CSSClass.toLowerCase()
        .split(" ")
        .join("")
        .replace("-", "")
        .replace("/", "")
    );
  }
}
// =================== Populate DOM helper Function =================== //

function createDynamicContentDictionary() {
  //Get the Platform code script element
  let Invocation = document.getElementById("PlatformCode");
  //Get script text and make a dictionary containing all the devDynamic content variables
  let scriptText = Invocation.innerHTML;
  var dictionary = {};
  //only include the devDynamicContent variables
  var rows = scriptText.split("\n");
  //loop through rows and capture all rows that have devDynamicContent and [0] and create a list of all unique values

  var myData = [];

  for (var i = 0; i < rows.length; i++) {
    if (rows[i].includes("devDynamicContent.") && rows[i].includes("[0]")) {
      var rowData = rows[i].split("=")[0].split(".")[1].replace("[0]", "");
      //if row data is in the mydata array then do nothing
      if (myData.includes(rowData)) {
        //do nothing
      } else {
        myData.push(rowData);
      }
    }
    //console.log(myData.length)
  }

  //loop through each value in myData and create a dictionary using the values from dynamicContent + myData[i] + [0]
  for (var i = 0; i < myData.length; i++) {
    var key = myData[i];
    var value = dynamicContent[key][0];
    dictionary[i] = value;
  }
  return dictionary;

  //console.log(myData);
}

function insertText(data, element) {
  element.innerHTML = data;
}

function insertCopy(_target, _copy, _style) {
  var style_obj = eval("({" + _style + "})");
  var _c = _copy;

  _target.innerHTML = _c;

  for (var key in style_obj) {
    if (key === "top") {
      _target.style.top = style_obj.top + "px";
    }

    if (key === "left") {
      _target.style.left = style_obj.left + "px";
    }

    if (key === "fontSize") {
      _target.style.fontSize = style_obj.fontSize + "px";
    }

    if (key === "lineHeight") {
      _target.style.lineHeight = style_obj.lineHeight + "px";
    }

    if (key === "padTop") {
      _target.style.paddingTop = style_obj.padTop + "px";
    }

    if (key === "letterSpacing") {
      _target.style.letterSpacing = style_obj.letterSpacing + "px";
    }

    if (key === "width") {
      _target.style.width = style_obj.width + "px";
    }

    if (key === "height") {
      _target.style.height = style_obj.height + "px";
    }
  }
}

function insertImage(data, elemType, element) {
  if (elemType == "background") {
    element.style.backgroundImage = "url(" + data + ")";
  }
  if (elemType == "src") {
    // add img tag as child of element
    let img = document.createElement("img");
    img.src = data;
    element.appendChild(img);
  }
}

// =================== Weather API Function =================== //

function WeatherAPI(endpoint, testing = false, apiKey, testZips) {
  console.log("Weather API Function Called");
  /*
   ** OPEN WEATHER MAP DATA CAPTURE
   ** Depending on which end point this function will pull the required data
   ** A few additional parameters are required to get the correct data
   ** Current Conditions - This will pull data for anything looking for current conditions
   *** If there is data that should only be pulled on specific days, pass the days as list
   ** Daily Forecast - When using forcast data, we default to pull data for tomorrow[next day]
   */
  let zipCode;
  let testingZipCodes = testZips;
  //Set the zip code for the API
  if (!testing) {
    zipCode = Enabler.getUserZipCode(); //Get the zip code from the Enabler
  } else {
    zipCode = testingZipCodes[0];
  }

  //Set the Current Condition base URL for the API
  var currentConditionsURL =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    zipCode +
    "&units=imperial&appid=" +
    apiKey;
  //Set the Daily Forecast base URL for the API
  var dailyForecastURL =
    "https://api.openweathermap.org/data/2.5/forecast/daily?zip=" +
    zipCode +
    "&cnt=2&units=imperial&appid=" +
    apiKey;

  //Load data from appropriate endpoint
  if (endpoint == "current") {
    const data = getWeatherData(currentConditionsURL);
    //console.log('Weather data:', data);
    return data;
  } else {
    const data = getWeatherData(dailyForecastURL);
    //console.log('Weather data:', data);
    return data;
  }
}

function getWeatherData(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    //if url contains forecast then we are pulling the forecast data
    if (url.includes("forecast")) {
      //Looks only for tomorrow's forcast
      console.log(data.list);
      const weatherData = {
        weather: data.list[1].weather[0].main,
        description: data.list[1].weather[0].description,
        feelslike: data.list[1].feels_like.day,
        pressure: data.list[1].pressure,
        humidity: data.list[1].humidity,
        windSpeed: data.list[1].speed,
        windDeg: data.list[1].deg,
        clouds: data.list[1].clouds,
        pop: data.list[1].pop, //chance of precipitation
        snow: data.list[1].snow,
      };
      return weatherData;
    } else {
      const weatherData = {
        weather: data.weather[0].main,
        description: data.weather[0].description,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDeg: data.wind.deg,
        clouds: data.clouds.all,
        feels_like: data.main.feels_like,
      };
      return weatherData;
    }
  } else {
    console.error("Error retrieving weather data:", xhr.status);
    return null;
  }
}

// ============ TIME AND DAY CHECKER FUNCTIONS FUNCTIONS ============ //

function isBetween(startTime, endTime) {
  /* Time and Day Checker
   *  This function will return True or False if the current falls between the hours or days passed into the function
   *  This function will check if a number[for hours] or string[for days] is passed into the function
   *
   *  SAMPLE USAGE:
   *  let PM = isBetween(12,5) // This will check if the current time is between 8am and 5pm
   *  let Weekday = isBetween("Monday","Friday") // This will check if the current day is between Monday and Friday
   *
   *  NOTE: once you have your boolean value stored you can use it to perform tasks based on the current time or day
   */
  const today = new Date();

  // Store Days of the week in an array
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Check if start Time is a number or string
  if (typeof startTime === "number") {
    start = startTime;
    end = endTime;

    const hour = today.getHours();
    console.log(hour);

    // Check if the current time is between the start and end time
    if (hour >= start && hour <= end) {
      return true;
    } else {
      return false;
    }
  } else if (typeof startTime === "string") {
    // If its not a number than it must be a string[Day of the week]
    // Check what day of week it is
    const day = today.getDay();
    console.log(day);
    // strings like "Monday" or "Tuesday" will be passed into the function
    // create a list of days of the week

    //set start and end day to the index of the day of the week passed in
    start = days.indexOf(startTime);
    end = days.indexOf(endTime);
    console.log(start);
    console.log(end);

    // Check if the current day is between the start and end day
    if (day >= start && day <= end) {
      return true;
    } else {
      return false;
    }
  } else {
    console.log("Error: Invalid Input in Time/Day Checker");
  }
}

function logCustomVariable(type, label) {
  if (type == "Impression") {
    Enabler.reportCustomVariableCount1(label);
    console.log("Custom Variable (Impression) :\n" + label);
  }
  if (type == "Click") {
    Enabler.reportCustomVariableCount2(label);
    console.log("Custom Variable (Click) :\n" + label);
  }
}
