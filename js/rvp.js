var x = 0;
var rvpt = []
if (!localStorage.rvptList) {
    localStorage.rvptList = "[]";
}
rvpt = JSON.parse(localStorage.rvptList);
rvpAdd = function(){
	var task = document.getElementById('taskrvp').value;
    if (task != '') {
        // Add the task to array and refresh list
        rvpt[rvpt.length] = task;
        rvpRefresh();
        // Clear the input
        document.getElementById('taskrvp').value = '';
    }
};
rvpRefresh = function(){
	var $tasks = $('#tlrvp');
    // Clear the existing task list
    $tasks.empty();
    if (rvpt.length) {
        for (var i=0;i<rvpt.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmrvp'+i+'" data-goto onclick="x = '+i+'">' + rvpt[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmrvp"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						rvpt.splice(x,1);
						rvpRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.rvptList = JSON.stringify(rvpt || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        rvpAdd();
    }
});