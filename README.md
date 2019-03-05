# message-app
A simple set of API's to build a messaging application

### Guidelines to use the API
- User Services
  - ##### To create a user
    [Create User](/user/create) -POST /user/create 
    ``` json
      {
        "name": "User Name",
        "email": "Email Id"
      }
     ```   
  - ##### To update user
    [Update User](/user/modify) -PATCH /user/modify
    ``` json
     {
      "userId":" ",
      "name":"User Name",
      "email":"Email"
     }
  - ##### To get user details
    [Get User Details](/user/read) -POST /user/read
    ``` json
     {
      "userId":["User Id"]
     }
    ```

- Messaging Services
  - ##### To send a message
    [Send Message](/message/create/conversation) -POST /message/create/conversation 
    ``` json
      {
        "participants": ["User Ids"],
        "conversation": {
            "from": "From User Id",
            "message" :"Message Details"
            }
      }
     ```   
  - ##### To update conversation
    [Update Conversation](/message/update/conversation) -PATCH /message/update/conversation
    ``` json
     {
      "covnersationId":"Conversation Id",
      "conversation": {
            "from":"From User Id",
            "message" :"Message Details"
            }
     }
  - ##### To get latest messages
    [Get Messages](/message/read) -POST /message/read
    ``` json
     {
      "userId":"User Id"
     }
    ```
   - ##### To get conversation Details
    [Get Conversation Details](/message/read/conversation/:conversationId) -POST /message/read/conversation/:conversationId
    
   - ##### To update conversation status to Read
    [Update Conversation](/message/update/status/conversation) -PATCH /message/update/status/conversation
    ``` json
     {
      "covnersationId":"Conversation Id",
      "date": "Date of the message to be updated"
     } 
    
  
