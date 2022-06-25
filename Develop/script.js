// Change into a <textarea> element upon click
$(".description").on("click", function(){
  var inside= $(this).children();
  var text = inside.text().trim();
  var textInput = $("<textarea>")
    .addClass("w-100 h-100 description")
    .val(text);
  $(this).removeClass("pt-2"); // make sure the textarea is flush with the div
  inside.replaceWith(textInput);
  textInput.trigger("focus");
  
  });
  
// Change back when clicked off
 $(".description").on("blur", "textarea", function(){
    var text = $(this).val().trim();
    $(this).text = text;
    var taskP = $("<p>").addClass("w-100").text(text);
    $(this).parent().addClass("pt-2");  // re-add the padding so the text isn't hugging the top of the div
    $(this).replaceWith(taskP);
  });

// Save task data to localstorage when save clicked


// Load tasks upon page open


// Color-code based on current time
function updateTimeBlocks(){
  $(".time-block").each( function() {
    var hourText = $(this).children(".hour").text(); 
    var thisHour = parseInt(hourText);
    var currentHour = moment().hour();
    var toDo = $(this).children(".description");
  
    if(hourText.slice(-2)==="PM" && thisHour !== 12 ){
      thisHour+=12;
    }
    // past
    if(thisHour < currentHour){
      toDo.removeClass("present future")
      toDo.addClass("past");
    }
    // present
    if(thisHour === currentHour){
      toDo.removeClass("future past");
      toDo.addClass("present");
    }
    // future
    if(thisHour > currentHour){
      toDo.removeClass("past present");
      toDo.addClass("future");
    }
  })
}

// Display current date in [ Day, month, dd]
$("#currentDay").text(moment().format("dddd MMMM Do"));

updateTimeBlocks();
setInterval(updateTimeBlocks,(1000*60)*30);