var x = 0;
var enrt = []
if (!localStorage.enrtList) {
    localStorage.enrtList = "[]";
}
enrt = JSON.parse(localStorage.enrtList);
enrAdd = function(){
	var task = document.getElementById('taskenr').value;
    if (task != '') {
        // Add the task to array and refresh list
        enrt[enrt.length] = task;
        enrRefresh();
        // Clear the input
        document.getElementById('taskenr').value = '';
    }
};
enrRefresh = function(){
	var $tasks = $('#tlenr');
    // Clear the existing task list
    $tasks.empty();
    if (enrt.length) {
        for (var i=0;i<enrt.length;i++){
            // Append each task
			x = i;
            var li = '<li class="nav" id="confirmenr'+i+'" data-goto onclick="x = '+i+'">' + enrt[i] + '</li>'
            $tasks.append(li);
			$(function () {
			$("#confirmenr"+i).bind("singletap", function() {
				$.UIPopup({
					id: "warning",
					title: 'Completed?', 
					message: 'Have you really completed this task?', 
					cancelButton: 'No', 
					continueButton: 'Yes', 
					callback: function() {
						enrt.splice(x,1);
						enrRefresh();
					}
				});
			});
			});
        }
    }
    localStorage.enrtList = JSON.stringify(enrt || []);
}
$(document).keypress(function(e){
    if (e.which == 13){
        enrAdd();
    }
});