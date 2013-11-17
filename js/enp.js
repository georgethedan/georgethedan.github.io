var x = 0;
var enpt = []
if (!localStorage.enptList) {
    localStorage.enptList = "[]";
}
enpt = JSON.parse(localStorage.enptList);
enpAdd = function(){
	var task = document.getElementById('taskenp').value;
    if (task != '') {
        // Add the task to array and refresh list
        enpt[enpt.length] = task;
        enpRefresh();
        // Clear the input
        document.getElementById('taskenp').value = '';
    }
};
enpRefresh = function(){
	var $tasks = $('#tlenp');
    // Clear the existing task list
    $tasks.empty();
    if (enpt.length) {
        for (var i=0;i<enpt.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmenp'+i+'" data-goto onclick="x = '+i+'">' + enpt[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmenp"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						enpt.splice(x,1);
						enpRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.enptList = JSON.stringify(enpt || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        enpAdd();
    }
});