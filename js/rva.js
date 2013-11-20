var x = 0;
var rvat = []
if (!localStorage.rvatList) {
    localStorage.rvatList = "[]";
}
rvat = JSON.parse(localStorage.rvatList);
rvaAdd = function(){
	var task = document.getElementById('taskrva').value;
    if (task != '') {
        // Add the task to array and refresh list
        rvat[rvat.length] = task;
        rvaRefresh();
        // Clear the input
        document.getElementById('taskrva').value = '';
    }
};
rvaRefresh = function(){
	var $tasks = $('#tlrva');
    // Clear the existing task list
    $tasks.empty();
    if (rvat.length) {
        for (var i=0;i<rvat.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmrva'+i+'" data-goto onclick="x = '+i+'">' + rvat[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmrva"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						rvat.splice(x,1);
						rvaRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.rvatList = JSON.stringify(rvat || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        rvaAdd();
    }
});