var x = 0;
var pert = []
if (!localStorage.pertList) {
    localStorage.pertList = "[]";
}
pert = JSON.parse(localStorage.pertList);
perAdd = function(){
	var task = document.getElementById('taskper').value;
    if (task != '') {
        // Add the task to array and refresh list
        pert[pert.length] = task;
        perRefresh();
        // Clear the input
        document.getElementById('taskper').value = '';
    }
};
perRefresh = function(){
	var $tasks = $('#tlper');
    // Clear the existing task list
    $tasks.empty();
    if (pert.length) {
        for (var i=0;i<pert.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmper'+i+'" data-goto onclick="x = '+i+'">' + pert[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmper"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						pert.splice(x,1);
						perRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.pertList = JSON.stringify(pert || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        perAdd();
    }
});