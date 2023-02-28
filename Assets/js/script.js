
$(function () {
  //Setting current day using jquery format
  var currentDay = dayjs();
  $('#currentDay').text(currentDay.format('MMM D, YYYY'));

  var startTime = 9;
  var endTime = 17;
  var currentHour = dayjs().hour(); //get current hour
  var textFromLocalStorage = JSON.parse(localStorage.getItem("textDescription")) ?? []; //get textDescription from localStorage

  // For loop to create time block for each standard business hours.
  for (var i = startTime; i <= endTime; i++) {
    // Create a div for row time block with the id
    var timeRow = $("<div>").addClass("row time-block").attr('id', "hour-" + i);

    // Condititonal statement to check and show past, present and future time by adding classes
    if (i < currentHour) {
      timeRow.addClass("past");
    }
    else if (i === currentHour) {
      timeRow.addClass("present");
    }
    else {
      timeRow.addClass("future");
    }

    // Creating a div class to display time
    var timeDisplay = $("<div>").addClass("col-2 col-md-1 hour text-center py-3");

    // if condition to identify which time is AM and PM
    if (i < 12) {
      timeDisplay.text(i + " AM");
    }
    else if (i > 12) {
      timeDisplay.text(i - 12 + " PM"); // display time in 12 hour format
    }
    else {
      timeDisplay.text(i + " PM");
    }
    timeRow.append(timeDisplay);


    //creating a textarea by creating new element and giving it class, id and attribute
    var textContainer = $("<textarea>").addClass("col-8 col-md-10 description").attr(
      "rows", "3");
    var txtId = "text-" + i;
    textContainer.attr("id", txtId);

    // find if localstorage has text description for the given text id
    var foundTextContent = textFromLocalStorage.find(e => e.textId === txtId);
    // if found, display in the textContainer
    if (foundTextContent != undefined) {
      textContainer.val(foundTextContent.textValue);
    }
    //Append ttextContainer to the time row
    timeRow.append(textContainer);


    //Creating save button, adding class and ID 
    var saveBtn = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
    var i_element = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");
    saveBtn.append(i_element);

    //Adding save button to time row
    timeRow.append(saveBtn);

    //Adding a complete time row to the container
    $(".container-fluid.px-5").append(timeRow);
  }

  // Function for save button using click event
  $(".saveBtn").click(function () {
    // get the id and value of the text container using 'this'
    var textId = $(this).siblings('.description').attr("id");
    var textValue = $(this).siblings('.description').val();

    // check if textId already exists in localstorage
    var foundIndexTextBox = textFromLocalStorage.findIndex(x => x.textId == textId);

    // If found, update to that index with the text value
    if (foundIndexTextBox != -1) {
      textFromLocalStorage[foundIndexTextBox].textValue = textValue;
    }
    //else add a new entity to local storage
    else {
      var newTextbox = { textId, textValue };
      textFromLocalStorage.push(newTextbox);
    }

    // Save the updated text description into localstorage
    localStorage.setItem("textDescription", JSON.stringify(textFromLocalStorage));

    // Show the confirmation to the user
    $('#saveNotification').text("Appoinment added to localstorage!");

    // fade out the text after 2 secs
    $('#saveNotification').show().delay(2000).fadeOut();
  })
});