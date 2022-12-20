const axios = require('axios');
const { config } = require('../config/config');
const {
	downloadGitRepo,
	getAllFiles,
	getYmlFile
} = require('../helpers/helpers');

exports.Query = {
	repos: async (parent, { ownerName }, context) => {
		const repoResult = [];
		const userName = (ownerName) ? ownerName : 'andy0104';
		const clientId = config.clientId;
		const clientSecret = config.clientSecret;
		const repoUrl = `https://api.github.com/users/${userName}/repos?sort=created:desc&client_id=${clientId}&client_secret=${clientSecret}`;
		try {
			const response = await axios.get(repoUrl);
			
			if (response.data) {
				for (const repo of response.data) {
					repoResult.push({
						name: repo.name,
						owner: repo.owner.login,
						size: repo.size,
					});
				}
			}
			
			return repoResult;
		} catch (e) {
			throw e;
		}
	},
	details: async (parent, { filter }, context) => {
		console.log(filter);
		let result = {};
		const userName = (filter.ownerName) ? filter.ownerName : 'andy0104';
		const repoName = (filter.repoName) ? filter.repoName : '';
		const clientId = config.clientId;
		const clientSecret = config.clientSecret;
		const repoDetailsUrl = `https://api.github.com/repos/${userName}/${repoName}?client_id=${clientId}&client_secret=${clientSecret}`;
		try {
			const response = await axios.get(repoDetailsUrl);
			if (response.data) {
				console.log(response.data);
				const data = response.data;
				result.name = data.name;
				result.owner = data.owner.login;
				result.size = data.size;
				result.type = data.visibility;
				result.files = 0;
				result.content = '';
				result.webhooks = data.hooks_url;
				
				// download git repo
				const repoPath = await downloadGitRepo(data.html_url);
				
				const ymlFile = await getYmlFile(repoPath);
				result.content = ymlFile.join("");
				
				const fileContent = await getAllFiles(repoPath);
				result.files = fileContent.length;
			}

			return result;
		} catch (e) {
			throw e;
		}
	}
};
