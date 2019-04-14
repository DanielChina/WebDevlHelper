from flask import Flask,render_template,request,jsonify,redirect,url_for
from commonutility import CommonUtility
app = Flask(__name__)

@app.route('/program/projecttest.html')
def projectTest():
    return render_template('program/projecttest.html')

@app.route('/program/wordsanimation.html')
def wordsAnimation():
    return render_template('program/wordsanimation.html')

@app.route('/program/flowanimation.html')
def flowAnimation():
    return render_template('program/flowanimation.html')

@app.route('/')
@app.route('/program')
@app.route('/program/stringsorting.html')
def stringSorting():
    return render_template('program/stringsorting.html')

@app.route('/program/populatetable.html')
def populateTable():
    return render_template('program/populatetable.html')

@app.route('/program/sendattachment.html')
def sendAttachment():
    return render_template('program/sendattachment.html')

@app.route('/program/sendAttachmentContent',methods=['POST'])
@app.route('/sendAttachmentContent.html')
# add two excel sheets
def sendAttachmentContent():
    requestsData=request.json
    excelFileName='test.xlsx'
    sheetNames=['firstSheet','secondSheet']
    heads=['Mark','Name','Age','Degree']
    contents=[]
    for data in requestsData['students']:
        content=[]
        content.append(data['mark'])
        content.append(data['name'])
        content.append(data['age'])
        content.append(data['degree'])
        contents.append(content)
    CommonUtility.createAndWriteToExcel(excelFileName,sheetNames,[heads,heads],[contents,contents],'black','blue')
    bodyText='Please Check the attachment!'
    attachmentName='testAttachment'
    CommonUtility.setEmailandSend('Email Test','xiazhai2017@outlook.com',requestsData['emailAddress'],
                                  None,bodyText,excelFileName,attachmentName)
    response={'success':True}
    return jsonify(response)

@app.route('/interview')
@app.route('/interview/pythonquestions.html')
def pythonQuestions():
    return render_template('/interview/pythonquestions.html')


if __name__ == '__main__':
    app.run()