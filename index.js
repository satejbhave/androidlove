#!/usr/bin/env node

import chalk from 'chalk'
import minimist from 'minimist'
import inquirer from "inquirer"
import fs from "fs"
import path from "path"
import {fileURLToPath} from 'url'

import nanospinner from 'nanospinner'



var argv = process.argv.slice(2);
console.log();

var data = {}

var activitiesArray = []

const __filename = fileURLToPath(import.meta.url);

if (!fs.existsSync("FileSetup")){
    fs.mkdirSync("FileSetup")
}

const __dirname = path.join(path.dirname(__filename),'FileSetup');

if (argv[0] == "init"){

    console.log(chalk.green("Hello There !!"));
    console.log(chalk.green("This Interface Will Help You To Create A Basic Android Application"));
    console.log();

    await create_basic_app();


}else if(argv[0] == "activity"){
    const activity_name = await inquirer.prompt({
        name: 'activity_name',
        type: 'input',
        message: 'Activity Name: ',
        default(){
            return 'MainActivity'
        }
    });
    const activity_orientation = await inquirer.prompt([
            {
            type: 'list',
            name: 'activity_orientation',
            message: 'Orientation',
            choices: ['Portrait', 'Portrait + Landscape' , 'Landscape'],
            }
    ]);

    const activity_theme = await inquirer.prompt([
        {
        type: 'list',
        name: 'activity_theme_bottomnavigationbar',
        message: 'Bottom Navigation Theme',
        choices: ['No Theme',
                    'Bottom Navigation With 2 Tabs',
                    'Bottom Navigation With 3 Tabs',
                    'Bottom Navigation With 4 Tabs',
                    'Bottom Navigation With 5 Tabs'
                    ]
        }
    ]);

    var n = -1
    switch (activity_theme.activity_theme_bottomnavigationbar) {
        case 'Bottom Navigation With 2 Tabs':
            n = 2;
            break;
        case 'Bottom Navigation With 3 Tabs':
            n = 3;
            break;
        case 'Bottom Navigation With 4 Tabs':
            n = 4;
            break;
        case 'Bottom Navigation With 5 Tabs':
            n = 5;
            break;
    }

    var bottomnav_array = []
    var leftdrawwer_array = []
    if (n != -1){
        for (let index = 0; index < n; index++) {
            bottomnav_array.push("Item")            
        }

        const bottom_nav_array = await inquirer.prompt({
                name: 'bottom_nav_array',
                type: 'input',
                message: 'Bottom Navigation Menu (Seprated By Space): ',
                default(){
                    return 'Item'
                }
        });
        var x = bottom_nav_array.bottom_nav_array.split(" ");
        for (let index = 0; index < x.length; index++) {
            if (index < n){
                bottomnav_array[index] = x[index] ;            
            }
        }

    }else{
        var n2 = -1;
        const activity_theme_leftdrawer = await inquirer.prompt([
            {
            type: 'list',
            name: 'activity_theme_leftdrawer',
            message: 'Left Drawer',
            choices: ['No Left Drawer',
                        '1 Tab','2 Tab','3 Tab','4 Tab','5 Tab','6 Tab'
                        ,'7 Tab','8 Tab','9 Tab','10 Tab'
                        ]
            }
        ]);

        switch (activity_theme_leftdrawer.activity_theme_leftdrawer) {
            case '1 Tab':
                n2 = 1;
                break;
            case '2 Tab':
                n2 = 2;
                break;
            case '3 Tab':
                n2 = 3;
                break;
            case '4 Tab':
                n2 = 4;
                break;
            case '5 Tab':
                n = 5;
                break;
            case '6 Tab':
                n = 6;
                break;
            case '7 Tab':
                n = 7;
                break;
            case '8 Tab':
                n2 = 8;
                break;
            case '9 Tab':
                n2 = 9;
                break;
            case '10 Tab':
                n2 = 10;
                break; 
                

        }
        if (n2 != -1){
            for (let index = 0; index < n2; index++) {
                leftdrawwer_array.push("Fragment")            
            }
            
            const bottom_leftdrawer_array_quest = await inquirer.prompt({
                    name: 'bottom_leftdrawer_array_quest',
                    type: 'input',
                    message: 'Left Drawer (Seprated By Space): ',
                    default(){
                        return 'Fragment'
                    }
            });
            var x2 = bottom_leftdrawer_array_quest.bottom_leftdrawer_array_quest.split(" ");
            for (let index = 0; index < x2.length; index++) {
                if (index < n2){
                    leftdrawwer_array[index] = x2[index] ;            

                }
            }


        }else{
            


        }



    }

    const activity_header_menu = await inquirer.prompt({
        name: 'activity_header_menu',
        type: 'input',
        message: 'Titlebar Option Menu (Seprated By Space): ',

    });

 

    var actname = activity_name.activity_name.replace(" ","").replace(",","");
    if (existsFile('activites_name_list.txt')){
        if(!readFile('activites_name_list.txt').includes(actname)){
            appendFile('activites_name_list.txt', ","+actname);
        }
    }else{
        appendFile('activites_name_list.txt',actname)
    }

    var actdata = activity_orientation.activity_orientation + '|';
    if (bottomnav_array.length != 0 && n != -1){
        actdata = actdata + 'bottom_nav|'+n;
        bottomnav_array.forEach(element => {
            actdata = actdata + "|" + element
        });
    }
    else if (leftdrawwer_array.length != 0 && n2 != -1){
        actdata = actdata + 'left_drawer|'+n2;
        leftdrawwer_array.forEach(element => {
            actdata = actdata + "|" + element
        });
    }else {
        actdata = actdata + 'no_template';
    }

    if (activity_header_menu.activity_header_menu != "") {
        var opts = activity_header_menu.activity_header_menu.split(" ")
        actdata = actdata + "|" + opts.length ;
        opts.forEach(element => {
            actdata = actdata + "|" + element;
        });
    }else{
        actdata = actdata + "|no_menu";
    }

    createFile('Activity_'+actname+'.txt',actdata);


    console.log(readFile('activites_name_list.txt'));
    
    /*
    const activity_metadata = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'activity_metadata',
        message: 'Which reptiles do you love?',
        choices: [
          'Alligators', 'Snakes', 'Turtles', 'Lizards',
        ],
      }
    ]);
    */

}else{
    console.log(chalk.red("Command Not Found"));

    console.log(chalk.red("Please type node index.js "));
    
}

//console.clear();

async function create_basic_app(){

    const appName = await inquirer.prompt({
        name: 'APP_NAME',
        type: 'input',
        message: 'Enter Application Name: ',
        default(){
            return 'My Application'
        }
    });

    const appCompanyName = await inquirer.prompt({
        name: 'APP_COMPANY_NAME',
        type: 'input',
        message: 'Enter Company Name: ',
        default(){
            return 'example'
        }
    });

    const appIconPath = await inquirer.prompt({
        name: 'APP_ICON',
        type: 'input',
        message: 'Enter Application Path: ',
        default(){
            return 'Default';
        }
    });

    const appPath = await inquirer.prompt({
        name: 'APP_PATH',
        type: 'input',
        message: 'Enter Project Path: ',
        default(){
            return 'D:\\Android Studio Projects\\' + appName.APP_NAME;
        }
    });

    


    var pac = "com." + appCompanyName.APP_COMPANY_NAME + "."+appName.APP_NAME;
    
    data = {
        APP_NAME: appName.APP_NAME, 
        APP_COMPANY_NAME: appCompanyName.APP_COMPANY_NAME, 
        APP_PATH: appPath.APP_PATH,
        APP_PACKAGE:pac.replace(" ",""),
        APP_ICON: appIconPath.APP_ICON

    }

    saveMetadata(data);
    console.clear();






}

async function saveMetadata(data){
    createFile('metadata_appname.txt' ,data.APP_NAME )
    createFile('metadata_apppackage.txt' ,data.APP_PACKAGE )
    createFile('metadata_appicon.txt' ,data.APP_ICON )
    createFile('metadata_appcompanyname.txt' ,data.APP_COMPANY_NAME )
    createFile('metadata_appprojectpath.txt' ,data.APP_PATH )

}





// FUNCTIONS 

function existsFile(filename){
    var p = path.join(__dirname,filename);
    return fs.existsSync(p);
}

function createFile(filename , data){
    var p = path.join(__dirname,filename);
    fs.writeFileSync(p,data);
}

function readFile(filename) {
    return fs.readFileSync(path.join(__dirname,filename),{encoding:'utf-8'});
}


function appendFile(filename , data){
    var p = path.join(__dirname,filename);
    fs.appendFileSync(p,data);
}

     
