from flask import Flask,render_template,request,jsonify
from commonutility import CommonUtility
app = Flask(__name__)


@app.route('/stringsorting.html')
@app.route('/')
def stringSorting():
    return render_template('stringsorting.html')

@app.route('/populatetable.html')
def populateTable():
    return render_template('populatetable.html')

@app.route('/sendattachment.html')
def sendAttachment():
    return render_template('sendattachment.html')



@app.route('/sendAttachmentContent',methods=['POST'])

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
if __name__ == '__main__':
    app.run()