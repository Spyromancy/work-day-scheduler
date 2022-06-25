var hourDict = {
  "9AM": " ",
  "10AM": " ",
  "11AM": " ",
  "12PM": " ",
  "1PM": " ",
  "2PM": " ",
  "3PM": " ",
  '4PM': " ",
  "5PM": " "
};

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
    var taskP = $("<p>").addClass("w-100 task").text(text);
    $(this).parent().addClass("pt-2");  // re-add the padding so the text isn't hugging the top of the div
    $(this).replaceWith(taskP);
  });

// Save task data to localstorage when save clicked
function saveTasks(){
  var thisBlock = $(this).closest(".time-block");
  var blockTime = thisBlock.children(".hour").text(); 
  var blockDesc = thisBlock.find(".task").text();
  hourDict[blockTime]=blockDesc;
  localStorage.setItem("schedule",JSON.stringify(hourDict));
  $(".taskUpdated").removeClass("d-none");
  setTimeout(function(){
    $(".taskUpdated").addClass("d-none");
  },5000);}

// Load tasks upon page open
function loadTasks(){
  hourDict = JSON.parse(localStorage.getItem("schedule"))
  $(".time-block").each( function(){
    var hourText = $(this).children(".hour").text(); 
    var taskText= hourDict[hourText]
    var taskEl = $(this).find(".task");
    taskEl.text(taskText);
  })
};

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
if(localStorage.getItem("schedule")){
  loadTasks();
}

// Display current date in [ Day, month, dd]
$("#currentDay").text(moment().format("dddd MMMM Do"));

updateTimeBlocks();
setInterval(updateTimeBlocks,(1000*60)*30);
$(".time-block").on("click","i",saveTasks)