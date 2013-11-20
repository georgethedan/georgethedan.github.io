var x = 0;
var pept = []
if (!localStorage.peptList) {
    localStorage.peptList = "[]";
}
pept = JSON.parse(localStorage.peptList);
pepAdd = function(){
	var task = document.getElementById('taskpep').value;
    if (task != '') {
        // Add the task to array and refresh list
        pept[pept.length] = task;
        pepRefresh();
        // Clear the input
        document.getElementById('taskpep').value = '';
    }
};
pepRefresh = function(){
	var $tasks = $('#tlpep');
    // Clear the existing task list
    $tasks.empty();
    if (pept.length) {
        for (var i=0;i<pept.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmpep'+i+'" data-goto onclick="x = '+i+'">' + pept[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmpep"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						pept.splice(x,1);
						pepRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.peptList = JSON.stringify(pept || []);
}