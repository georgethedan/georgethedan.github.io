var x = 0;
var ccpt = []
if (!localStorage.ccptList) {
    localStorage.ccptList = "[]";
}
ccpt = JSON.parse(localStorage.ccptList);
ccpAdd = function(){
	var task = document.getElementById('taskccp').value;
    if (task != '') {
        // Add the task to array and refresh list
        ccpt[ccpt.length] = task;
        ccpRefresh();
        // Clear the input
        document.getElementById('taskccp').value = '';
    }
};
ccpRefresh = function(){
	var $tasks = $('#tlccp');
    // Clear the existing task list
    $tasks.empty();
    if (ccpt.length) {
        for (var i=0;i<ccpt.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmccp'+i+'" data-goto onclick="x = '+i+'">' + ccpt[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmccp"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						ccpt.splice(x,1);
						ccpRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.ccptList = JSON.stringify(ccpt || []);
}