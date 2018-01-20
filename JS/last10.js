var fdb = new ForerunnerDB();
var db = fdb.db("expense");
var expenseCollection = db.collection('expenses');

$(document).ready(function () {
	expenseCollection.load(dataload);
})

function dataload() {
	console.log("dataload")
	var expenses = expenseCollection.find({}, {$orderBy:{data:-1}, $limit:10});
	updateTable(expenses);
};
function updateTable(expenses) {
	$("#table-tbody").find("tr").remove();

	for (var i = 0; i < expenses.length; i++) {
	$("#table-tbody").append(
	"<tr>" +
	"<td>" + expenses[i].date + "<td>" +
	"<td>" + expenses[i].item + "<td>" +
	"<td>" + expenses[i].amount + "<td>" +
	"<tr>"
	);
};

};
