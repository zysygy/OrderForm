function print_today() {
  // ***********************************************
  // AUTHOR: WWW.CGISCRIPT.NET, LLC
  // URL: http://www.cgiscript.net
  // Use the script, just leave this message intact.
  // Download your FREE CGI/Perl Scripts today!
  // ( http://www.cgiscript.net/scripts.htm )
  // ***********************************************
  var now = new Date();
  var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
  var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
  function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
  }
  var today =  months[now.getMonth()] + " " + date + ", " + (fourdigits(now.getYear()));
  return today;
}

function randSegment (){
	return(Math.floor((Math.random()*100))).toString();
}

//Collisions are possible, but should rare enough to be fine
function genOrdNo () {
	return (randSegment()+ randSegment() + "-" + randSegment() + randSegment() + randSegment() + "-" + randSegment());
}

$(document).ready(function() {
	$(".del-item").hide(); //Hide initial delete button to prevent accidental use
	
	$("#add-item").click(function(){
		var insert = '<tr class="item-row"><td class="style">\
		<div class="del-wrap">\
		<textarea maxlength="6">123456</textarea>\
		<a class="del-item" href="javascript:;" title="Remove Item">X</a>\
		</div></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td><textarea class="item" maxlength="3">1</textarea></td>\
		<td class="qty"><textarea maxlength="3">999</textarea></td>\
		<td class="price"><textarea maxlength="6">999.99</textarea></td></tr>';
		$(".item-row:last").after(insert);
		if ($(".del-item").length > 1) $(".del-item").show();
	});
	
	$( document ).on("click", ".del-item", function(){
		$(this).parents(".item-row").remove();
		if ($(".del-item").length < 2) $(".del-item").hide();
	});
	
	$("#customer .date-field").val(print_today());
	
	$("#ord-no").val(genOrdNo());
});

