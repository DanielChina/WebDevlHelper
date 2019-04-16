from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import smtplib
import xlsxwriter
class CommonUtility:
    @staticmethod
    def setEmailandSend(emailSubject,emailFrom,emailTo,emailCc,bodyText,filePath,attachmentName):
        emailRef = MIMEMultipart()
        emailRef['From']=emailFrom
        emailRef['Subject']=emailSubject
        emailRef['To']=emailTo
        emailRef['Cc']=emailCc
        emailRef.attach(MIMEText(bodyText, "plain"))
        if(attachmentName is not None and filePath is not None):
            part = MIMEBase('application', "octet-stream")
            fp = open(filePath, "rb")
            part.set_payload(fp.read())
            fp.close()
            encoders.encode_base64(part)
            part.add_header('Content-Disposition', 'attachment',filename=attachmentName)
            emailRef.attach(part)
        mailServer = smtplib.SMTP("smtp.office365.com", 587)
        mailServer.ehlo()
        mailServer.starttls()
        mailServer.ehlo()
        mailServer.login(emailRef['From'], 'zx19811225')
        if emailRef['Cc'] is None:
            rcpt = [emailRef['To']]
        else:
            rcpt = emailRef['Cc'].split(',') + [emailRef['To']]
        mailServer.sendmail(emailRef['From'], rcpt, emailRef.as_string())
        mailServer.close()

    @staticmethod
    def createAndWriteToExcel(excelFileName,sheetNames,heads,contents,headsColor,contentsColor):
        workbook = xlsxwriter.Workbook(excelFileName)
        for i,name in enumerate(sheetNames):
            worksheet = workbook.add_worksheet(name)
            format = workbook.add_format({'bold': True,'font_color':headsColor})
            worksheet.write_row(0, 0, heads[i], format)
            format = workbook.add_format({'font_color': contentsColor})
            for j,row in enumerate(contents[i]):
                worksheet.write_row(j+1, 0, row, format)
        workbook.close()

    @staticmethod
    def readTxtFile(fileName):
        try:
            fp=open(fileName,'r')
        except:
            fp=open(fileName,'w+')
        content=fp.read()
        fp.close()
        return content

    @staticmethod
    def writeTxtFile(fileName,content):
        try:
            fp=open(fileName,'a')
            fp.write(content)
            fp.close()
        except:
            return False
        return True

    @staticmethod
    def deleteTxtfile(fileName,content):
        length=len(content)
        try:
            fp=open(fileName,'r')
            allContents=fp.read()
            fp.close()
            fp = open(fileName, 'w+')
            allLength=len(allContents)
            fp.write(allContents[0:(allLength-length)])
            fp.close()
        except:
            return False
        return True