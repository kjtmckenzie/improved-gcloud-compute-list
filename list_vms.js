'use strict';

const Compute = require('@google-cloud/compute');
const compute = new Compute();
const exec = require('child_process').exec;
var machineTypes = {};

compute.getMachineTypes().then(function(data) {
	
	// create a dictionary of machine types available
	data[0].forEach(function(machineType) {
		machineTypes[machineType["metadata"]["name"]] = {
			description: machineType["metadata"]["description"],
			guestCpus: machineType["metadata"]["guestCpus"],
			memoryMb: machineType["metadata"]["memoryMb"]
		};
	});
	
	// simply call the gcloud command line tool
	exec('gcloud compute instances list', function callback(error, stdout, stderr){
	    var lines = stdout.split(/\r?\n/); //
		console.log(lines[0] + "\tCPUS\tMEMORYMB"); // display table header
		lines.shift(); // remove table header
		lines.forEach(function(machine) {
			// sometimes blank lines appear in gcloud compute instances, so ignore
			if (machine.length > 1) {
				// match the machineType to the dictionary values
				var machineType = machine.trim().split(/\s+/)[2];
				var cpus = machineTypes[machineType]["guestCpus"];
				var mem = machineTypes[machineType]["memoryMb"];
				
				// print the updated core listing
				console.log(machine + "\t" + cpus + "\t" + mem);
			}
		});
	});	
});




