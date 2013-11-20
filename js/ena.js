var x = 0;
var enat = []
if (!localStorage.enatList) {
    localStorage.enatList = "[]";
}
enat = JSON.parse(localStorage.enatList);
enaAdd = function(){
	var task = document.getElementById('taskena').value;
    if (task != '') {
        // Add the task to array and refresh list
        enat[enat.length] = task;
        enaRefresh();
        // Clear the input
        document.getElementById('taskena').value = '';
    }
};
enaRefresh = function(){
	var $tasks = $('#tlena');
    // Clear the existing task list
    $tasks.empty();
    if (enat.length) {
        for (var i=0;i<enat.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmena'+i+'" data-goto onclick="x = '+i+'">' + enat[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmena"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						enat.splice(x,1);
						enaRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.enatList = JSON.stringify(enat || []);
}