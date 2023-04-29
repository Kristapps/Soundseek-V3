from flask import Flask, request, jsonify
from pymongo import MongoClient
import subprocess
import json
import os
import requests
import numpy as np

# list of audio example objects
example_audio_objects = [{"AudioID": 1, "AudioURL": "http://localhost:3000/audio/examples/office_sounds.mp3", "AudioTags": [], "isExamined": False}, {"AudioID": 2,
                                                                                                                                                      "AudioURL": "http://localhost:3000/audio/examples/suburbs_summer_night.mp3", "AudioTags": [], "isExamined": False}, {"AudioID": 3, "AudioURL": "http://localhost:3000/audio/examples/city_ambience.mp3", "AudioTags": [], "isExamined": False}]

app = Flask(__name__)
app.config['DEBUG'] = True

# Connecting to database
client = MongoClient('mongodb://localhost:27017')
db = client['soundseek']

# MongoDB collections
# Collection for survey data
survey_collection = db['survey-results']
# Collection for session data
session_data_collection = db['session-data']

# Used to find create audio tags for specific audio using panns-inference


@app.route('/ProccessAudio', methods=['POST'])
def process_audio():
    # Gets ID's used to save the audio tags in the correct place.
    sessionID = request.json['sessionID']
    audioID = request.json['audioID']

    # Gets the Audio url parsed into the API and save it locally in the model as temp.mp3
    audioURL = request.json['audioURL']
    response = requests.get(audioURL)
    # Saves the audio in panns as temp.mp3
    with open("./panns_inference-master/temp.mp3", "wb") as f:
        f.write(response.content)

    # Gets the output results from the model by running it on a subprocess
    result = subprocess.run(
        ['python3', 'process_requested_audio.py'], cwd='./panns_inference-master', capture_output=True)
    output = result.stdout.decode('utf-8')

    # Processes the output to only output the tags
    lines = output.split('\n')
    lines_processed = lines[2:9]
    sound_data = []

    # Strips any away all the other data that are not audio tags and creates an object {sound, confidence}
    for line in lines_processed:
        parts = line.split(":")
        sound = parts[0].strip()
        confidence = float(parts[1].strip())
        sound_data.append({'sound': sound, 'confidence': confidence})

    isExamined = (len(sound_data) > 0)

    session_data_collection.update_one({'sessionID': sessionID, 'example_audio.AudioID': audioID}, {
                                       '$set': {'example_audio.$.AudioTags': sound_data, 'example_audio.$.isExamined': isExamined}})

    return 'success proccessing audio'


@app.route('/SaveSurveyData', methods=['POST'])
def save_survey_data():
    # get JSON data
    data = request.get_json()
    # insert data into MongoDB as a paramterized query
    surveyID = data['surveyID']
    username = data['username']
    annoyanceValues = data['annoyanceValues']
    intensityValues = data['intensityValues']

    # Constructing the query for the survey
    survey_query = {"surveyID": surveyID, "username": username,
                    "annoyanceValues": annoyanceValues, "intensityValues": intensityValues}

    # Constructing the query for the session
    session_query = {"sessionID": surveyID,
                     "example_audio": example_audio_objects, "recorded_audio": []}

    survey_collection.insert_one(survey_query)
    session_data_collection.insert_one(session_query)
    # return JSON response
    return jsonify({'success': True})


@app.route('/GetExampleAudio', methods=['GET'])
def get_example_audio():
    session_id = request.args.get('sessionID')
    casted_session_id = int(session_id)
    session_data = session_data_collection.find_one(
        {"sessionID": casted_session_id})
    example_audio = session_data['example_audio']
    audio_data = [{'AudioID': audio['AudioID'], 'AudioURL': audio['AudioURL'],
                   'isExamined': audio['isExamined']} for audio in example_audio]
    print("audio data: ", example_audio)

    response_data = {
        'data': audio_data
    }
    return jsonify(response_data)


@app.route('/GetExampleAudioResults', methods=['GET'])
def get_audio_results():
    session_id = request.args.get('sessionID')
    casted_session_id = int(session_id)

    audio_id = request.args.get('audioID')
    casted_audio_id = int(audio_id)

    session_data = session_data_collection.find_one(
        {"sessionID": casted_session_id})
    example_audio = session_data['example_audio']

    for audio in example_audio:
        if audio["AudioID"] == casted_audio_id:
            response_data = {
                'data': audio["AudioTags"]
            }
            print(audio["AudioTags"])
            return jsonify(response_data)

    return []

if __name__ == "__main__":
    app.run(debug=True)
