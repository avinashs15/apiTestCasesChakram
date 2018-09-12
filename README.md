This Project uses mocha, chakram and mochawesome reporter npm packages

Prerequisite : Nodejs and NPM is installed

Running the test case:

Start with cloning the repository to your local machine using the command: git clone https://gitlab.com/avinashs15/new10apitests.git

Navigate to the diroctory new10apitests

Install the npm packages using packages.json using the command : npm install (or npm install package.josn)

If the packages are not installed, user needs to install the packages indiviually using the following commands

npm install mocha

npm install mochawesome

npm install chakram

npm install js-base64

npm install appendjson



Directory structure


    new10apitests |
            -- Specs
            
                --main.js (has all the test cases)
                
            -- Libraries
            
                --utilities.js (has the utility functions)
                
            -- data
            
                data.json (has username, password and other enveironment data)
                
            --mochawesome-report
            
                mochawesome.html (report user gets after execution)
                
                mochawesome.json
                
            package.json(packages needed for the project)
            
            
Running the test case:

from new10apitests folder, run the command : mocha Specs/ --reporter mochawesome --exit 

Navigate to mochawesome-report and open the mochawesome.html
