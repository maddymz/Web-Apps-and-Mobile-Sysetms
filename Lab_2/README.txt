instatiation of the FAQ class objects:

obj = new FAQ()

Create server:

obj.createServer()

write to store:

obj.writeToStore()

update answer:

obj.updateAnswer(index)

modify tags:

obj.updateTags(index)

delete QA:

obj.deleteQA(index)

filter:

obj.filter(data), where data is an object having key value pair


-----------------------------Activity 2 --------------------------------

instatiation of the FAQService class objects:

obj = new FAQService()

login:

obj.login(req, res)

routing after student:

obj.student(req, res, result, role)  

routing after teacher login:

obj.teacher(req, res, result, role)

method called on failure of login:

obj.loginFails(req,res,result)

logout:

obj.logout(index)

to parse form data:

obj.collectFormData(data)
