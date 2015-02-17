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

//Lots of cleaning up to be done to generalize for more than two pages and use of
//better jQuery, but temporary solution in place for now

//Only has capacity to add one additional page
function newPage (){
	//Could play with clone and append, but going to hard code for now
	var ret;
	var insert = '<div class="page-wrap">\
		<div class="order-details">\
		<table>\
		<tr id="colour-labels">\
			<th class="style">Style</th>\
			<th>Black</th>\
			<th>Brown</th>\
			<th>White</th>\
			<th>Gray</th>\
			<th>Blue</th>\
			<th>Beige</th>\
			<th>Red</th>\
			<th>Purp.</th>\
			<th>Gold</th>\
			<th>Silver</th>\
			<th>Green</th>\
			<th>Burg.</th>\
			<th>Pink</th>\
			<th>Yel.</th>\
			<th>Oran.</th>\
			<th class="qty">Qty</th>\
			<th class="price">Price</th>\
		</tr>\
		<tr class="item-row">\
			<td class="style">\
				<div class="del-wrap">\
					<textarea maxlength="6"></textarea>\
					<a class="del-item" href="javascript:;" title="Remove Item">X</a>\
				</div>\
			</td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td><textarea class="item" maxlength="3"></textarea></td>\
			<td class="qty"><textarea maxlength="3"></textarea></td>\
			<td class="price"><textarea maxlength="6"></textarea></td>\
		</tr>\
		<tr>\
			<td id="add-row" colspan="18"><a id="add-item" href="javascript:;" title="Add item">Add Item</a></td>\
		</tr>\
		</table></div></div>';
	
	if ($(".item-row").length == 30 && $(".page-wrap").length < 2){
		//delete add button, insert table header and new row, order no
		$("#add-row").parents("tr").remove();
		$(".page-wrap:last").after(insert);
	}
	/*else if (){ //item-row.length - 29 
	
	}*/
}	

$(document).ready(function() {

	var insert = '<tr class="item-row"><td class="style">\
		<div class="del-wrap">\
		<textarea maxlength="6">123456</textarea>\
		<a class="del-item" href="javascript:;" title="Remove Item">X</a>\
		</div></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td><textarea class="item" maxlength="3"></textarea></td>\
		<td class="qty"><textarea maxlength="3"></textarea></td>\
		<td class="price"><textarea maxlength="6"></textarea></td></tr>';
	$(".del-item").hide(); //Hide initial delete button to prevent accidental use
	
	$( document ).on("click","#add-item", function(){
		if ($(".item-row").length != 30 && $(".item-row").length != 68){
			$(".item-row:last").after(insert);
		}
		else {
			newPage();
		}
		/*if ($(".item-row").length >= 31){
			for (i=1; $(".item-row").length < 66; i++){
			$(".item-row:last").after(insert);
		}*/
		
		/*for (i=1; $(".item-row").length < 30; i++){
			$(".item-row:last").after(insert);
		}*/
		if ($(".del-item").length > 1) $(".del-item").show();
	});
	
	$( document ).on("click", ".del-item", function(){
		var addHTML = '<tr>\
			<td id="add-row" colspan="18"><a id="add-item" href="javascript:;" title="Add item">Add Item</a></td>\
			</tr>'
		if ($(".item-row").length == 31){
			$(this).parents(".page-wrap").remove();
			$(".item-row:last").after(addHTML);
		}
		else {
			$(this).parents(".item-row").remove();
		}	
		if ($(".del-item").length < 2) $(".del-item").hide();
	});
	
	//if there are >29 item rows, insert new page
	
	$("#customer .date-field").val(print_today());
	
	$("#order-num .field").append(genOrdNo());
});

