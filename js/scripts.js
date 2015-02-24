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
	return (randSegment() + "-" + randSegment() + randSegment());
}

//Should be using jQuery clone, but hardcoding for now
var items = '<tr class="item-row"><td class="style">\
		<div class="del-wrap">\
		<textarea maxlength="6"></textarea>\
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
var addRow = '<tr>\
			<td id="add-row" colspan="18"><a id="add-item" href="javascript:;" title="Add item">Add Item</a></td>\
			</tr>';		
var tHeader = '<thead>\
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
		</thead>';
		
//Only has capacity to add one additional page
function newPage (){
	//Could play with clone and append, but going to hard code for now
	var insert = '<div class="page-wrap">\
		<div class="order-details">\
		<table class="items">'+
		tHeader+
		'<tbody>'+
		items+
		addRow+
		'</tbody></table></div></div>';
	if ($(".item-row").length == 30 && $(".page-wrap").length < 2){
		//delete add button, insert table header and new row, order no
		$("#add-row").parents("tr").remove();
		$(".page-wrap:last").after(insert);
	}
}

//Not generalized to handle more than one page
//Made a separate function for when generalizations are written

function shiftUp(){
	var rowCopy = $(".page-wrap:eq(1) .item-row:first").clone();
	$(".page-wrap:eq(0) .items tbody").append(rowCopy);
}

//First Page has max 30 items, second page has max 36

$(document).ready(function() {
	
	$(".del-item").hide(); //Hide initial delete button to prevent accidental use
	
	//Add
	$( document ).on("click","#add-item", function(){
		if ($(".item-row").length != 30 && $(".item-row").length != 68){
			$(".item-row:last").after(items);
		}
		else {
			newPage();
		}
		if ($(".del-item").length > 1) $(".del-item").show();
		
		//Testing
		/*if ($(".item-row").length >= 31){
			for (i=1; $(".item-row").length < 66; i++){
			$(".item-row:last").after(insert);
		
		for (i=1; $(".item-row").length < 30; i++){
			$(".item-row:last").after(insert);
		}*/
		
	});
	
	//Delete
	$( document ).on("click", ".del-item", function(){

		$(this).parents(".item-row").remove();
		
		//Clear Second Page If Empty
		if ($(".page-wrap").length > 1) {
			if ($(".page-wrap:eq(1) .items .item-row").length == 0){
				$(".page-wrap:eq(1)").remove();
				$(".item-row:last").after(addRow);
			}
		}
		
		//Otherwise Shift Rows Up
		if ($(".items:first .item-row").length < 30 && $(".page-wrap").length > 1){
			shiftUp();
			if ($(".items:eq(1) .item-row").length == 1){
				$(".page-wrap:eq(1)").remove();
				$(".item-row:last").after(addRow);
			}
			else {
				$(".items:eq(1) .item-row:first").remove();
			}
		}
		if ($(".del-item").length < 2) $(".del-item").hide();
	});
	
	
	//Date
	$("#customer .date-field").val(print_today());
	
	//Generate Order Number
	$("#order-num .field").append(genOrdNo());
});


//Notes

/*
---Bugs---

If row is deleted from first page while a second page exists, rows on second page
will not automatically shift up to first row. Trying to then delete a row from the
second page will delete whole table

Solution is to implement loop that automatically shifts all rows up a page;
possible performance issues with large sets of data

---Things to Implement---

Greater flexibility can be added with use of clone/append instead of straight 
hardcoded HTML sections

More generalized algorithm to add 

Order Number can be duplicated on subsequent pages

*/
