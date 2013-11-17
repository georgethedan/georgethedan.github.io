var x = 0;
var dapt = []
if (!localStorage.daptList) {
    localStorage.daptList = "[]";
}
dapt = JSON.parse(localStorage.daptList);
dapAdd = function(){
	var task = document.getElementById('taskdap').value;
    if (task != '') {
        // Add the task to array and refresh list
        dapt[dapt.length] = task;
        dapRefresh();
        // Clear the input
        document.getElementById('taskdap').value = '';
    }
};
dapRefresh = function(){
	var $tasks = $('#tldap');
    // Clear the existing task list
    $tasks.empty();
    if (dapt.length) {
        for (var i=0;i<dapt.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmdap'+i+'" data-goto onclick="x = '+i+'">' + dapt[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmdap"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						dapt.splice(x,1);
						dapRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.daptList = JSON.stringify(dapt || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        dapAdd();
    }
});