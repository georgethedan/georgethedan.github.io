var x = 0;
var sert = []
if (!localStorage.sertList) {
    localStorage.sertList = "[]";
}
sert = JSON.parse(localStorage.sertList);
serAdd = function(){
	var task = document.getElementById('taskser').value;
    if (task != '') {
        // Add the task to array and refresh list
        sert[sert.length] = task;
        serRefresh();
        // Clear the input
        document.getElementById('taskser').value = '';
    }
};
serRefresh = function(){
	var $tasks = $('#tlser');
    // Clear the existing task list
    $tasks.empty();
    if (sert.length) {
        for (var i=0;i<sert.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmser'+i+'" data-goto onclick="x = '+i+'">' + sert[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmser"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						sert.splice(x,1);
						serRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.sertList = JSON.stringify(sert || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        serAdd();
    }
});