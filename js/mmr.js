var x = 0;
var mmrt = []
if (!localStorage.mmrtList) {
    localStorage.mmrtList = "[]";
}
mmrt = JSON.parse(localStorage.mmrtList);
mmrAdd = function(){
	var task = document.getElementById('taskmmr').value;
    if (task != '') {
        // Add the task to array and refresh list
        mmrt[mmrt.length] = task;
        mmrRefresh();
        // Clear the input
        document.getElementById('taskmmr').value = '';
    }
};
mmrRefresh = function(){
	var $tasks = $('#tlmmr');
    // Clear the existing task list
    $tasks.empty();
    if (mmrt.length) {
        for (var i=0;i<mmrt.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmmmr'+i+'" data-goto onclick="x = '+i+'">' + mmrt[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmmmr"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						mmrt.splice(x,1);
						mmrRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.mmrtList = JSON.stringify(mmrt || []);
}