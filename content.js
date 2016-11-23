$(document).ready(function(){
	$.getJSON('seriea.json',function(data)
	{	
		var matches = [];
		var index = 1;
		 $(data.teams).each(function(key,val)
		 {
		 	switch(val.color)
		 	{
		 		case "1":
		 		matches.push('<td bgcolor = "#7fd498" class = "place">'+val.place+'</td>');
		 		break;
		 		case "2":
		 		matches.push('<td bgcolor = "#cceed6" class = "place">'+val.place+'</td>');
		 		break;
		 		case "4":
		 		matches.push('<td bgcolor = "#ff99b1" class = "place">'+val.place+'</td>');
		 		break;
		 		default:matches.push('<td class = "place">'+val.place+'</td>');
		 		break;
		 	}
		 	matches.push('<td class = "team"><img src = "Italy-Flag-icon.png" width = "13px" height = "13px"><a href = "'+val.tag_url+'"> '+val.name+'</a></td>');
		 	matches.push('<td class = "matches">'+val.matches+'</td>');
		 	matches.push('<td class = "wins">'+val.win+'</td>');
		 	matches.push('<td class = "draw">'+val.draw+'</td>');
		 	matches.push('<td class = "lose">'+val.lose+'</td>');
		 	matches.push('<td class = "goals">'+val.goals+'</td>');
		 	matches.push('<td class = "missed">'+val.conceded_goals+'</td>');
		 	matches.push('<td class = "score">'+val.score+'</td>');	

		
		 	$('tbody').append('<tr id = "indexofrow_'+index+'">'+matches.join('')+'</tr>');
		matches = [];
		index++; 
		 })	
	});
	
	 var col_index=0;
	 var sort_coeff=1;
		 $(".italy_league_head tr th").click(function(){

		if(col_index==$(this).index()) {
			sort_coeff=sort_coeff*(-1);
		} else {
			sort_coeff=1;
			$(".italy_league_head tr .srt").removeClass("srt");
			col_index=$(this).index();
			$(".italy_league_head tr").each(function() { $(this).find("th").eq(col_index).addClass("srt");});
		}
		
		$(".italy_league_head tr th").children("span").detach();
		
		if(sort_coeff>0) {
			$(".italy_league_head tr").each(function() { $(this).find("th").eq(col_index).prepend("<span>&#9660;</span>"); });
		} else {
			$(".italy_league_head tr").each(function() { $(this).find("th").eq(col_index).prepend("<span>&#9650;</span>"); });
		}
		var temparr=[];
		$(".italy_league_body tr").each(function() {
			var content = $(this).children("td").eq(col_index).html();//.split(" ").join("");
			
			/*z=z.split("А").join("");
			z=z.split("Б").join("");*/
			if(isFinite(content)) {content=parseInt(content);} else 
			{content = $(this).children("td").eq(col_index).children("a").html();}
			temparr.push([content,$(this).attr("id")]);

		});
		console.log(temparr);
		function arraysort(a,b) {
			if(a[0]<b[0]) {
				return (-1)*sort_coeff;
			} else if(a[0]>b[0]) {
				return sort_coeff;
			} else {
				return 0;
			}
		}

		temparr.sort(arraysort);
		
		for(var i=0;i<temparr.length;i++) {
			$('#'+temparr[i][1]).appendTo($("tbody"));
		}
})
		})
	 