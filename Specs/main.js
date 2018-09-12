var chakram = require('chakram'),
expect = chakram.expect;
var Base64 = require('js-base64').Base64;
var data = require('../data/data');
var utils = require('../Libraries/utilities');
var authKey, repoName;


describe("GitHub", function(){	
	it("should be able to create repository with readme.md", function () {
		authKey  = Base64.encode(data.username + ":" +data.password );
		this.timeout(10000);
		repoName = "TestAPI" + utils.getRandomInt(1,100000);
		var dataVal =  {
			"name": repoName,
			"description": "This is From API. repository will be deleted",
			"homepage": "https://github.com",
			"private": false,
			"has_issues": true,
			"has_projects": true,
			"has_wiki": true,
			'auto_init' : true // Adds a blank readme.md file
		}; 
		return chakram.post(data.githubRepo,dataVal,
		{headers: {'User-Agent': 'Awesome-Octocat-App', 'Authorization' : 'Basic ' +authKey}}).then(function(response){
			expect(response).to.have.status(201);
			console.log('---------------------------------------------------------------');
		});
	});   
	
	it("should be able verify if the repo is created", function () {	    
		this.timeout(10000);	   
		return chakram.get(data.gitHubAPIRepo + data.username+'/' +repoName,
		{headers: {'User-Agent': 'Awesome-Octocat-App', 'Authorization' : 'Basic ' + authKey}}).then(function(response){		
			expect(response).to.have.status(200);
			console.log('---------------------------------------------------------------');
		});
	}); 
	
	it('should verify the owner and repo name in the created repository', function(){
		this.timeout(10000);	   
		return chakram.get(data.gitHubAPIRepo +data.username+'/' +repoName,
		{headers: {'User-Agent': 'Awesome-Octocat-App', 'Authorization' : 'Basic ' + authKey}}).then(function(response){
			expect(response.body.full_name).to.include(repoName);
			expect(response.body.full_name).to.include(data.username);
			expect(response.body.node_id).to.not.be.null;
			expect(response).to.have.status(200);
			console.log('---------------------------------------------------------------');
		});	    
	});
	
	it('should be able to delete the created repository', function(){
		this.timeout(10000);
		return chakram.delete( data.gitHubAPIRepo +data.username+'/' + repoName,"",{headers: {'User-Agent': 'Awesome-Octocat-App', 'Authorization' : 'Basic bmV3MTB0ZXN0dXNlcjpQYSQkd29yZDA4KiM='}}).then(function(response){
			expect(response).to.have.status(204);
			console.log('---------------------------------------------------------------');
		});
	});
	
	it("should be able verify if the repository is deleted", function () {	    
		this.timeout(10000);	   
		return chakram.get( data.gitHubAPIRepo +data.username+'/' + repoName,
		{headers: {'User-Agent': 'Awesome-Octocat-App', 'Authorization' : 'Basic ' + authKey}}).then(function(response){		
			expect(response).to.have.status(404);
			console.log('---------------------------------------------------------------');
		});
	});
	
	it('should be able to create a repository and not delete it', function(){
		repoName = "APIRepository" + utils.getRandomInt(1,100000);
		var dataVal =  {
			"name": repoName,
			"description": "This is From API. repository wont be deleted",
			"homepage": "https://github.com",
			"private": false,
			"has_issues": true,
			"has_projects": true,
			"has_wiki": true,
			'auto_init' : true
		}; 
		return chakram.post(data.githubRepo,dataVal,
		{headers: {'User-Agent': 'Awesome-Octocat-App', 'Authorization' : 'Basic ' +authKey}}).then(function(response){
			expect(response).to.have.status(201);
			console.log('---------------------------------------------------------------');
		});
		return chakram.get(data.gitHubAPIRepo +data.username+'/' +repoName,
		{headers: {'User-Agent': 'Awesome-Octocat-App', 'Authorization' : 'Basic ' + authKey}}).then(function(response){		
			expect(response).to.have.status(200);
			console.log('---------------------------------------------------------------');
		});	    
	});	    
});
    
    