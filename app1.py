from flask import Flask, render_template, Response
import cv2
import mediapipe as mp
from gesture_detector import SignDetector, GESTURES  # Make sure this file exists and is correct
import time

app = Flask(__name__)

mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)

def gen_frames():
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    cap.set(cv2.CAP_PROP_FPS, 60)

    prev_landmarks = None
    prev_time = 0

    while True:
        success, frame = cap.read()
        if not success:
            continue

        frame = cv2.flip(frame, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                landmarks = [(int(lm.x * frame.shape[1]), int(lm.y * frame.shape[0]))
                             for lm in hand_landmarks.landmark]

                gesture_name = SignDetector.recognize_gesture(landmarks, prev_landmarks)
                text_output = GESTURES.get(gesture_name, "Unknown Gesture")
                prev_landmarks = landmarks

                cv2.putText(frame, text_output, (50, 50),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        curr_time = time.time()
        fps = 1 / (curr_time - prev_time) if prev_time else 0
        prev_time = curr_time

        cv2.putText(frame, f"FPS: {int(fps)}", (10, 460),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/hands-to-words.html')
def handstowords():
    return render_template('hands-to-words.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/login.html')
def login():
    return render_template('login.html')

@app.route('/new.html')
def new():
    return render_template('new.html')

@app.route('/symptom-checker.html')
def symptomchecker():
    return render_template('symptom-checker.html')

@app.route('/system.html')
def system():
    return render_template('system.html')

if __name__ == '__main__':
    app.run(debug=True)
