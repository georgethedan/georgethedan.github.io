var x = 0;
var daat = []
if (!localStorage.daatList) {
    localStorage.daatList = "[]";
}
daat = JSON.parse(localStorage.daatList);
daaAdd = function(){
	var task = document.getElementById('taskdaa').value;
    if (task != '') {
        // Add the task to array and refresh list
        daat[daat.length] = task;
        daaRefresh();
        // Clear the input
        document.getElementById('taskdaa').value = '';
    }
};
daaRefresh = function(){
	var $tasks = $('#tldaa');
    // Clear the existing task list
    $tasks.empty();
    if (daat.length) {
        for (var i=0;i<daat.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmdaa'+i+'" data-goto onclick="x = '+i+'">' + daat[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmdaa"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						daat.splice(x,1);
						daaRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.daatList = JSON.stringify(daat || []);
}