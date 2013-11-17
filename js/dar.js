var x = 0;
var dart = []
if (!localStorage.dartList) {
    localStorage.dartList = "[]";
}
dart = JSON.parse(localStorage.dartList);
darAdd = function(){
	var task = document.getElementById('taskdar').value;
    if (task != '') {
        // Add the task to array and refresh list
        dart[dart.length] = task;
        darRefresh();
        // Clear the input
        document.getElementById('taskdar').value = '';
    }
};
darRefresh = function(){
	var $tasks = $('#tldar');
    // Clear the existing task list
    $tasks.empty();
    if (dart.length) {
        for (var i=0;i<dart.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmdar'+i+'" data-goto onclick="x = '+i+'">' + dart[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmdar"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						dart.splice(x,1);
						darRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.dartList = JSON.stringify(dart || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        darAdd();
    }
});