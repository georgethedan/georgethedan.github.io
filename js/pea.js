var x = 0;
var peat = []
if (!localStorage.peatList) {
    localStorage.peatList = "[]";
}
peat = JSON.parse(localStorage.peatList);
peaAdd = function(){
	var task = document.getElementById('taskpea').value;
    if (task != '') {
        // Add the task to array and refresh list
        peat[peat.length] = task;
        peaRefresh();
        // Clear the input
        document.getElementById('taskpea').value = '';
    }
};
peaRefresh = function(){
	var $tasks = $('#tlpea');
    // Clear the existing task list
    $tasks.empty();
    if (peat.length) {
        for (var i=0;i<peat.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmpea'+i+'" data-goto onclick="x = '+i+'">' + peat[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmpea"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						peat.splice(x,1);
						peaRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.peatList = JSON.stringify(peat || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        peaAdd();
    }
});