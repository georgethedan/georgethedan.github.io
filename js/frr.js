var x = 0;
var frrt = []
if (!localStorage.frrtList) {
    localStorage.frrtList = "[]";
}
frrt = JSON.parse(localStorage.frrtList);
frrAdd = function(){
	var task = document.getElementById('taskfrr').value;
    if (task != '') {
        // Add the task to array and refresh list
        frrt[frrt.length] = task;
        frrRefresh();
        // Clear the input
        document.getElementById('taskfrr').value = '';
    }
};
frrRefresh = function(){
	var $tasks = $('#tlfrr');
    // Clear the existing task list
    $tasks.empty();
    if (frrt.length) {
        for (var i=0;i<frrt.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmfrr'+i+'" data-goto onclick="x = '+i+'">' + frrt[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmfrr"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						frrt.splice(x,1);
						frrRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.frrtList = JSON.stringify(frrt || []);
}