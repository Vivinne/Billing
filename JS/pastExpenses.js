var fdb = new ForerunnerDB();
var db = fdb.db("expense");
var expenseCollection = db.collection('expenses');

$(document).ready(function() {
	expenseCollection.load(dataLoad);
	$("[name=choice]").change(function(){
		if (this.value == "thisMonth") {
			$(".date").attr("readonly", true);
		}else{
			$(".date").attr("readonly", false);
		}
	});

	$("#btnSearch").on("click", searchExpenses);
});

function dataLoad() {
	console.log("dataLoad");
}

function searchExpenses(){
	var gte = "";
	var lte = "";

	if($("[name=choice]:checked").val() == "thisMonth"){
		var date = new Date();
		var year = date.getUTCFullYear();
		var month = date.getUTCMonth() + 1;
		// var day = date.getUTCFullDate();
		if (month < 10) {
			gte = year + "-0" + month + "-" + "01";
			lte = year + "-0" + month + "-" + "31";
		}else{
			gte = year + "-" + month + "-" + "01";
			lte = year + "-" + month + "-" + "31";
		}
	}else{
		gte = $("#dateFirst").val();
		lte = $("#dateLast").val();
	}

	if (gte != "" || lte != "") {
		var expenses = expenseCollection.find(
			{
				date:{
					$gte: gte,
					$lte: lte
					}
			},
			{
				$orderBy: {date: 1}
			})
		updateDetailTable(expenses);


		updateCategoryTable(expenses);
	}
}

function updateDetailTable(datas){
	console.log("updateDetailTable");
	console.log(datas.length);
	$("#detail-tbody").find("tr").remove();

	for(var i = 0; i < datas.length; i++){
		$("#detail-tbody").append(
			"<tr>" +
			"<td>" + datas[i].date + "</td>" +
			"<td>" + datas[i].item + "</td>" +
			"<td>" + datas[i].amount + "</td>" +
			"</tr>"
			);
	}
}

function updateCategoryTable(datas) {
	
	var sum = 0
	var sumCategory = [0, 0, 0, 0];
	var category = ["餐飲", "交通", "娛樂", "生活用品"];

	for (var i = 0; i < datas.length; i++) {
		switch(datas[i].category){
			case category[0] :
			sumCategory[0] += datas[i].amount*1;
			break;
			case category[1] :
			sumCategory[1] += datas[i].amount*1;
			break;
			case category[2] :
			sumCategory[2] += datas[i].amount*1;
			break;
			case category[3] :
			sumCategory[3] += datas[i].amount*1;
			break;
		}
		sum += datas[i].amount*1;
		console.log(sum);
	}

	for(var i = 0; i < category.length; i++){
		$("#category-tbody").append(
			"<tr>" +
			"<td>" + category[i] + "</td>" +
			"<td>" + sumCategory[i] + "</td>" +
			"<td>" + Math.round((sumCategory[i]/sum)*100) + "%</td>" +
			"</tr>"
			);
		$("#txtSum").text("總額：$" + sum);
	}
}





