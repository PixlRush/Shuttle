var now = new Date()
var next = new Date()
var type = 0

function updateDates(){
	now = new Date()
	next = getNextDate(now.getDay(), 0)

	// Pass the Interval Back
	setInterval(updateTime, 250)
}

function getNextDate(x, i) {
	// Obtain the Times for the Current Day
	var times = getTimes(x)

	for (var t of times){
		// If t is ahead of the current time
		if ((60 * t[0] + t[1]) > (now.getHours() * 60 + now.getMinutes())){
			return new Date(now.getFullYear(), now.getMonth(), now.getDate(),t[0], t[1])
		}
	}

	// Failsafe
	return new Date()
}

function setType(x){
	type = x
	var header = ""
	switch (type){
		case 0:
			header = "Time until Next Shuttle Bus from UTM to St George"
			break
		case 1:
			header = "Time until Next Shuttle Bus from St George to UTM"
			break
	}
	document.getElementById("header").innerHTML = header
}

function getTimes(x) { // Return the appropriate times
	switch (type){
		case 0: // UTM to UTS
			switch (x) {
				case 1:
				case 2:
				case 3:
				case 4:
					return [
						[5,55],[6,35],[6,55],[7,15],[7,35],[7,55],[8,15],[8,35],[8,55],[9,15],
						[9,35],[9,55],[10,15],[10,35],[10,55],[11,15],[11,35],[11,55],[12,15],
						[12,35],[12,55],[13,15],[13,35],[13,55],[14,15],[14,35],[14,55],[15,15],
						[15,35],[15,55],[16,15],[16,35],[16,55],[17,15],[17,35],[17,55],[18,25],
						[18,55],[19,25],[19,55],[20,25],[20,55],[21,25],[21,55],[22,35]
					]
					break
				case 5:
					return [
						[5,55],[6,35],[6,55],[7,15],[7,35],[7,55],[8,15],[8,35],[8,55],[9,15],
						[9,35],[9,55],[10,15],[10,35],[10,55],[11,15],[11,35],[11,55],[12,15],
						[12,35],[12,55],[13,15],[13,35],[13,55],[14,15],[14,35],[14,55],[15,15],
						[15,35],[15,55],[16,15],[16,35],[16,55],[17,15],[17,35],[17,55],[18,25],
						[18,55],[19,55],[21,25],[22,35]
					]
					break
				case 6:
					return [
						[8,0],[10,0],[11,0],[12,0],[13,0],[15,15],[18,0],[20,0],[21,0]
					]
					break
				case 0:
					return [
						[10,0],[12,0],[15,15],[18,0],[20,0]
					]
					break
				default:
					return "Null"
			}
			break
		case 1: // UTS to UTM
			switch (x) {
				case 1:
				case 2:
				case 3:
				case 4:
					return [
						[6,55],[7,35],[7,55],[8,15],[8,35],[8,55],[9,15],[9,35],[9,55],[10,15],
						[10,35],[10,55],[11,15],[11,35],[11,55],[12,15],[12,35],[12,55],[13,15],
						[13,35],[13,55],[14,15],[14,35],[14,55],[15,15],[15,35],[15,55],[16,15],
						[16,35],[16,55],[17,15],[17,35],[17,55],[18,15],[18,35],[18,55],[19,25],
						[19,55],[20,25],[20,55],[21,25],[21,55],[22,25],[22,55],[23,35]
					]
					break
				case 5:
					return [
						[6,55],[7,35],[7,55],[8,15],[8,35],[8,55],[9,15],[9,35],[9,55],[10,15],
						[10,35],[10,55],[11,15],[11,35],[11,55],[12,15],[12,35],[12,55],[13,15],
						[13,35],[13,55],[14,15],[14,35],[14,55],[15,15],[15,35],[15,55],[16,15],
						[16,35],[16,55],[17,15],[17,35],[17,55],[18,15],[18,35],[18,55],[19,25],
						[19,55],[20,55],[22,25],[23,35]
					]
					break
				case 6:
					return [
						[9,0],[11,0],[12,0],[13,0],[14,0],[16,15],[19,0],[21,0],[22,0]
					]
					break
				case 0:
					return [
						[11,0],[13,0],[16,15],[19,0],[21,0]
					]
					break
				default:
					return "Null"
			break
		}
	}
}

function updateTime() {
	// Determine Difference between now and next bus time
	var sDelta = (next.getTime() - now.getTime()) / 1000 | 0
	var delta = {sec : sDelta % 60}
	delta.min = ((sDelta - delta.sec) / 60) % 60
	delta.hour = ((sDelta - delta.sec - 60 * delta.min) / 3600)

	// Format for Human Reading
	var deltaOut = ""
	// Hour
	if (delta.hour != 0) {
		deltaOut += delta.hour + ":"
	}
	// Minute
	if (deltaOut != ""){
		if (delta.min < 10){ //Pad the 0 if needed
			deltaOut += "0" + delta.min + ":"
		}else{
			deltaOut += delta.min + ":"
		}
	}else{
		deltaOut = delta.min + ":"
	}
	// Second
	if (delta.sec < 10){
		deltaOut += "0" + delta.sec
	}else{
		deltaOut += delta.sec
	}

	// Change Background Colour depending on sDelta
	if(sDelta > 60 * 10){ //ok
		document.getElementById("body").className = "ok"
	}else if(sDelta > 60 * 5){ //close
		document.getElementById("body").className = "close"
	}else if(sDelta > 60){ //warn
		document.getElementById("body").className = "warn"
	}else{ //danger
		document.getElementById("body").className = "danger"
	}

	document.getElementById("timeUntil").innerHTML = deltaOut
	document.getElementById("time").innerHTML = next.getHours() + ":" + ((next.getMinutes() < 10) ? "0" + next.getMinutes() : next.getMinutes())

	// Pass the Interval Back
	setInterval(updateDates, 100)
}

setInterval(updateDates, 250)