				var x = 0;
				var ccat = []
if (!localStorage.ccatList) {
    localStorage.ccatList = "[]";
}
ccat = JSON.parse(localStorage.ccatList);
ccaAdd = function(){
	var task = document.getElementById('task').value;
    if (task != '') {
        // Add the task to array and refresh list
        ccat[ccat.length] = task;
        ccaRefresh();
        // Clear the input
        document.getElementById('task').value = '';
    }
};
ccaRefresh = function(){
	var $tasks = $('#tlcca');
    // Clear the existing task list
    $tasks.empty();
    if (ccat.length) {
        for (var i=0;i<ccat.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirm'+i+'" data-goto onclick="x = '+i+'">' + ccat[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirm"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						ccat.splice(x,1);
						ccaRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.ccatList = JSON.stringify(ccat || []);
}
function onDeviceReady() {
document.body.style.marginTop = "20px";
}
document.addEventListener('deviceready', onDeviceReady, false);
$(document).keypress(function(e){
    if (e.which == 13){
        ccaAdd();
    }
});