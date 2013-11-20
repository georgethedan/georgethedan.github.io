var x = 0;
var seat = []
if (!localStorage.seatList) {
    localStorage.seatList = "[]";
}
seat = JSON.parse(localStorage.seatList);
seaAdd = function(){
	var task = document.getElementById('tasksea').value;
    if (task != '') {
        // Add the task to array and refresh list
        seat[seat.length] = task;
        seaRefresh();
        // Clear the input
        document.getElementById('tasksea').value = '';
    }
};
seaRefresh = function(){
	var $tasks = $('#tlsea');
    // Clear the existing task list
    $tasks.empty();
    if (seat.length) {
        for (var i=0;i<seat.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmsea'+i+'" data-goto onclick="x = '+i+'">' + seat[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmsea"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						seat.splice(x,1);
						seaRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.seatList = JSON.stringify(seat || []);
}