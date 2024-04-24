// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract TodoList{
    struct Task{
        uint taskId;
        string description;
        bool completed; 
}

struct User{
    address userAddress; //msg.sender
    bool registered;//default-false
    string username; //parameter
    uint taskCount; //0
    mapping(uint =>Task) taskDetails;//0
}

    mapping(address =>User) public users;

    modifier onlyRegisteredUser(){
    require(users[msg.sender].registered == true, " user not registered");
    _;
    }

    function registerUser(string memory _username) public{
        require(!users[msg.sender].registered, "User already registered");
        users[msg.sender].userAddress = msg.sender;
        users[msg.sender].registered = true;
        users[msg.sender].username = _username;
    }

function addTask(string memory _description) public onlyRegisteredUser {
    uint taskIndex = users[msg.sender].taskCount;
    users[msg.sender].taskDetails[taskIndex]= Task(taskIndex, _description, false);
    users[msg.sender].taskCount++;
}

function markTaskCompleted(uint _taskId) public onlyRegisteredUser{
        require(_taskId<=users[msg.sender].taskCount,"Invalid Task Id");
        users[msg.sender].taskDetails[_taskId].completed = true;
    }

function getTask(uint _taskIndex) public view onlyRegisteredUser returns(uint, string memory, bool){
    require(_taskIndex < users[msg.sender].taskCount, "invalid Task Index");
    Task memory task = users[msg.sender].taskDetails[_taskIndex];
    return (task.taskId,task.description, task.completed);
}

function deleteTask(uint _taskId) public onlyRegisteredUser{
    require(_taskId < users[msg.sender].taskCount, "invalid Task Index");
    users[msg.sender].taskDetails[_taskId] = users[msg.sender].taskDetails[users[msg.sender].taskCount-1];   //1 5 3 4 5
    delete users[msg.sender].taskDetails[users[msg.sender].taskCount-1];    //1 5 3 4  taskcount =5
  //result: 1 2 3 4  taskcount =5
    users[msg.sender].taskCount--;
   //delete 5
   //1 2 3 4 5
}

function getTaskCount() public view onlyRegisteredUser returns(uint){
     return users[msg.sender].taskCount; }

function isRegistered() public view returns(bool){ 
    return users[msg.sender].registered; }

}