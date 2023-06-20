from django.http import HttpResponse
from django.shortcuts import render

def dashboard(request):
    data={
        'title':'SSFS-Dashboard',
    }
    return render(request,"dashboard.html",data)

def signup(request):
    data={
        'title':'SSFS-Sign-Up',
    }
    return render(request,"signup.html",data)
def login(request):
    data={
        'title':'SSFS-Login',
    }
    return render(request,"login.html",data)
def contact(request):
    data={
        'title':'SSFS-Contact',
    }
    return render(request,'contact.html',data)
def setting(request):
    data={
        'title':'SSFS-Sign-Up',
    }
    return render(request,"setting.html",data)
def files(request):
    data={
        'title':'SSFS-Sign-Up',
    }
    return render(request,"files.html",data)
def upload(request):
    data={
        'title':'SSFS-Sign-Up',
    }
    return render(request,"upload.html",data)


from .forms import NameForm


def get_name(request):
    # if this is a POST request we need to process the form data
    if request.method == "POST":
        # create a form instance and populate it with data from the request:
        form = NameForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            return HttpResponseRedirect("/thanks/")

    # if a GET (or any other method) we'll create a blank form
    else:
        form = NameForm()

    return render(request, "name.html", {"form": form})



    
import os
from Crypto import Random
from Crypto.Cipher import AES
from base64 import b64encode, b64decode
'''
def enckey(request):
    data1 = os.urandom(16)
    key=b64encode(data1).decode('utf-8')
    data={}
    data['keyvalue']=key
    return '''
def enckey(request):
    
    
    data1 = os.urandom(16)
    key=b64encode(data1).decode('utf-8')
    data={}
    data['keyvalue']=key
    global keyval
    def keyval():
        return key
    return render(request,"upload.html",data)
     
def encdec(request):
    
    key=keyval()
    print(key)
    class Encryptor:
       
        def __init__(self, key):
            self.key = key
        def pad(self, s):
            return s + b"\0" * (AES.block_size - len(s) % AES.block_size)

        def encrypt(self, message, key):
            message = self.pad(message)
            key = key.encode('utf-8')
            iv = Random.new().read(AES.block_size)
            cipher = AES.new(key, AES.MODE_CBC, iv)
            ciphertext_bytes=cipher.encrypt(message)
            ciphertext= iv + ciphertext_bytes
            return ciphertext
        def encrypt_file(self, file_name):
            with open("static/"+file_name, 'rb') as fo:
                plaintext = fo.read()
            
            enc = self.encrypt(plaintext, self.key)
            with open("static/"+file_name + ".enc", 'wb') as fo:
                fo.write(enc)
            os.remove("static/"+file_name)

            
#  key = b'LEDMXIQBGNVOJRUI'
    

    enc = Encryptor(key)
    enc.encrypt_file(str(input("Enter name of file to encrypt: ")))

#  message1=input("enter message")
# message=bytes(message1, 'utf-8')
# print(message)
#  ciphertext=enc.encrypt(message,key) 
# print(ciphertext)

#  message=input("enter message")
# enc.encrypt(message,key)  



#correct 

    
    '''data={
        'title':'SSFS-Sign-Up',
    }
    data['keyvalue']=key'''
    return render(request,"upload.html")
