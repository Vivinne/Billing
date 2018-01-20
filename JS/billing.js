var fdb = new ForerunnerDB();
var db = fdb.db("expense");
var expenseCollection = db.collection('expenses');

$(document).ready(function() {
	expenseCollection.load(dataLoad);
	$("#btnSubmit").on("click", submitExpense);
});

//DB load callback
function dataLoad() {
	console.log("data loaded");
	console.log(expenseCollection.find());
}

//DB save callback
function dataSave(){
	console.log("data saved");
	alert("儲存成功!");
}

function submitExpense(){
	expenseCollection.insert({
		date: $("#edtDate").val(),
		category: $("#edtCategory").val(),
		item: $("#edtItem").val(),
		amount: $("#edtAmount").val()
	});

	expenseCollection.save(dataSave);
	$("#edtDate").val("");
	$("#edtCategory").val("");
	$("#edtItem").val("");
	$("#edtAmount").val("");
	// history.go(-1);
}