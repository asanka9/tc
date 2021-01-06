# -*- coding: utf-8 -*-
"""
Created on Thu Nov 26 11:12:26 2020

@author: User
"""

from flask import Flask, render_template, Response, request, redirect, url_for, jsonify
import cv2
from tensorflow.keras.models import load_model
import pickle
from keras.preprocessing import image
import numpy as np
from keras.preprocessing.image import img_to_array


app = Flask(__name__, template_folder='template')
model = load_model('facefeatures_new_model.h5')
face_classifier = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
class_labels = ['Angry','Happy','Neutral','Sad','Surprise']



@app.route("/")
def index():
    
    return render_template('index.html');

@app.route('/get_expression')
def background_process_test():
    cap = cv2.VideoCapture()
    notFounding = True
    print('3333333333333')
    while notFounding:
        ret, frame = cap.read()
        labels = []
        faces = face_classifier.detectMultiScale(frame,1.3,5)
        for (x,y,w,h) in faces:
            cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)
            roi_gray = gray[y:y+h,x:x+w]
            roi_gray = cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)

            print('2222222222222')
            if np.sum([roi_gray])!=0:
                roi = roi_gray.astype('float')/255.0
                roi = img_to_array(roi)
                roi = np.expand_dims(roi,axis=0)
                result = model.predict(roi)[0]
                print('4444444444444')
                print("\nprediction = ",result)
                label=class_labels[result.argmax()]
                print("\nprediction max = ",result.argmax())
                print(type(result.argmax()))
                return jsonify({'index': int(result.argmax())})

            notFounding = False
    cap.release()


     

if __name__ == '__main__': 
    app.run() 
