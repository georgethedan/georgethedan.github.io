var x = 0;
var mmpt = []
if (!localStorage.mmptList) {
    localStorage.mmptList = "[]";
}
mmpt = JSON.parse(localStorage.mmptList);
mmpAdd = function(){
	var task = document.getElementById('taskmmp').value;
    if (task != '') {
        // Add the task to array and refresh list
        mmpt[mmpt.length] = task;
        mmpRefresh();
        // Clear the input
        document.getElementById('taskmmp').value = '';
    }
};
mmpRefresh = function(){
	var $tasks = $('#tlmmp');
    // Clear the existing task list
    $tasks.empty();
    if (mmpt.length) {
        for (var i=0;i<mmpt.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmmmp'+i+'" data-goto onclick="x = '+i+'">' + mmpt[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmmmp"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						mmpt.splice(x,1);
						mmpRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.mmptList = JSON.stringify(mmpt || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        mmpAdd();
    }
});