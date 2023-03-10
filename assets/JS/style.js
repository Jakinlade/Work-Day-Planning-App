$(document).ready(function() {

    // Display the current date and time at the top of calendar
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

    // Create timeblocks for standard business hours using a for loop
    var currentTime = moment().hour();
    
    for (var i =9; i < 18; i++) {
        // create div for each timeblock
        timeBlock = $("<div>");
        timeBlock.addClass("row time-block");

        // create div for the hour
        var hourDiv = $("<div>");
        hourDiv.addClass("hour col-md-2");
        hourDiv.text(i + ":00");
        timeBlock.append(hourDiv);

        // create a text area for the event
        var eventTxt = $("<textarea>");
        eventTxt.addClass("col-md-8 description");
        timeBlock.append(eventTxt);

        // create a save button
        var saveBtn = $("<button>");
        saveBtn.addClass("col-md-2 saveBtn");
        saveBtn.html("<i class='fas fa-save'></i>");
        timeBlock.append(saveBtn);

        // append timeblock to the container
        $(".container").append(timeBlock);

        // If the timeblock is in the past, add the past class
        if (i < currentTime) {
            eventTxt.addClass("past");
        }
        // If the timeblock is in the present, add the present class
        else if ( i === currentTime ) {
            eventTxt.addClass("present");
        
        }
        // If the timeblock is in the future, add the future class
        else if (i > currentTime) {
            eventTxt.addClass("future");
        }
    }

    // Add an event listener to the save button
    $(".saveBtn").on("click", function() {
         // Get the value of the textarea
        var event = $(this)
        .siblings(".description")
        .val();

          // Get the hour of the timeblock
        var hour = $(this)
        .siblings(".hour")
        .text()

        // Save the event to local storage
        localStorage.setItem(hour, event);
    });

   
    // Retrieve events from local storage and display them on the corresponding timeblocks
    $(".description").each(function(){
        var hour = $(this)
        .siblings(".hour")
        .text();
        var event = localStorage.getItem(hour);
        $(this)
        .val(event);
    });

});
