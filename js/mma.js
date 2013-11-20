var x = 0;
var mmat = []
if (!localStorage.mmatList) {
    localStorage.mmatList = "[]";
}
mmat = JSON.parse(localStorage.mmatList);
mmaAdd = function(){
	var task = document.getElementById('taskmma').value;
    if (task != '') {
        // Add the task to array and refresh list
        mmat[mmat.length] = task;
        mmaRefresh();
        // Clear the input
        document.getElementById('taskmma').value = '';
    }
};
mmaRefresh = function(){
	var $tasks = $('#tlmma');
    // Clear the existing task list
    $tasks.empty();
    if (mmat.length) {
        for (var i=0;i<mmat.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmmma'+i+'" data-goto onclick="x = '+i+'">' + mmat[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmmma"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						mmat.splice(x,1);
						mmaRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.mmatList = JSON.stringify(mmat || []);
}