const clone = require('nodegit').Clone.clone;
const shelljs = require('shelljs');
const fs = require('fs');
const path = require('path');

exports.downloadGitRepo = async (repoUrl) => {
	const downloadPath = path.join(process.cwd(), 'tmp', 'repo');
	console.log(repoUrl, downloadPath);
	
	try {
		// Clear the directory
		clearTmpDir(downloadPath);
		await clone(repoUrl, downloadPath);
		return downloadPath;
	} catch (e) {
		throw e;
	}
}

exports.getAllFiles = async (readPath) => {
	try {
		return new Promise((resolve, reject) => {
			shelljs.cd(readPath);
			shelljs.exec("find . -type f -printf \"%T@ %p\\n\" | sort -nr | cut -d\\  -f2-", (code, stdout, stderr) => {
				if (code != 0) {
					reject("Error executing command");
				}
				// Clear the directory
				clearTmpDir(readPath);
				resolve(stdout.toString().split("\n"));
			});
		})
	} catch(e) {
		throw e;
	}
}

exports.getYmlFile = async (readPath) => {
	try {
		return new Promise((resolve, reject) => {
			shelljs.cd(readPath);
			shelljs.exec("find . -type f -name \"*.yml\"|head -n 1", (code, stdout, stderr) => {
				if (code != 0) {
					reject("Error executing finding the yml file command");
				}
				
				resolve(stdout.toString().split("\n"));
			});
		})
	} catch(e) {
		throw e;
	}
}

function clearTmpDir(readPath) {
	try {
		return new Promise((resolve, reject) => {
			if (fs.existsSync(readPath)) {
				shelljs.exec(`rm -rf ${readPath}`, (code, stdout, stderr) => {
					if (code != 0) {
						reject("Error executing rm command");
					}
					resolve(true);
				});
			} else {
				resolve(true);
			}
		});
	} catch(e) {
		throw e;
	}
}
