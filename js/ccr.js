var x = 0;
var ccrt = []
if (!localStorage.ccrtList) {
    localStorage.ccrtList = "[]";
}
ccrt = JSON.parse(localStorage.ccrtList);
ccrAdd = function(){
	var task = document.getElementById('taskccr').value;
    if (task != '') {
        // Add the task to array and refresh list
        ccrt[ccrt.length] = task;
        ccrRefresh();
        // Clear the input
        document.getElementById('taskccr').value = '';
    }
};
ccrRefresh = function(){
	var $tasks = $('#tlccr');
    // Clear the existing task list
    $tasks.empty();
    if (ccrt.length) {
        for (var i=0;i<ccrt.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmccr'+i+'" data-goto onclick="x = '+i+'">' + ccrt[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmccr"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						ccrt.splice(x,1);
						ccrRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.ccrtList = JSON.stringify(ccrt || []);
}