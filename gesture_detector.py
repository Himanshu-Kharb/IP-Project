import cv2

GESTURES = {
    "thumbs_up": "OK",
    "thumbs_down": "Bad",
    "peace_sign": "Peace",
    "fist": "Fist",
    "open_palm": "Stop",
    "rock_sign": "Love You",
    "pointing": "Point",
    "call_me": "Call",
    "victory": "Victory",
    "finger_gun": "Gun",
    "wave": "Hello/Goodbye",
    "thank_you": "Thank You",
    "love_you": "I Love You",
    "come_here": "Come Here",
    "go_away": "Go Away",
    "clap": "Clapping",
    "ok_sign": "OK Sign",
    "middle_finger": "Rude Gesture",
    "spiderman": "Web Shooters!",
    "heart_sign": "Heart",
    "count_1": "Number 1",
    "count_2": "Number 2",
    "count_3": "Number 3",
    "count_4": "Number 4",
    "count_5": "Number 5",
    "shaka": "Hang Loose!",
    "index_only": "Index Finger",
    "index_middle_only": "Index and Middle",
    "index_middle_ring": "Three Fingers",
    "ring_pinky": "Ring and Pinky",
    "thumb_index_middle": "Thumb Index Middle",
    "thumb_pinky": "Thumb and Pinky",
    "pinky_only": "Pinky Only",
    "ring_only": "Ring Only",
    "thumb_only": "Thumb Only",
    "flat_hand_sideways": "Side Palm",
    "finger_cross": "Fingers Crossed",
    "gun_sign": "Gun Sign",
    "closed_ok": "Closed OK",
    "l_sign": "L Sign",
    "y_sign": "Y Sign"
}

class SignDetector:
    last_detected = "unknown"

    @staticmethod
    def is_finger_extended(finger_tip, finger_dip):
        return finger_tip[1] < finger_dip[1]

    @staticmethod
    def recognize_gesture(landmarks, prev_landmarks):
        if len(landmarks) < 21:
            return SignDetector.last_detected

        thumb_tip, thumb_dip = landmarks[4], landmarks[3]
        index_tip, index_dip = landmarks[8], landmarks[7]
        middle_tip, middle_dip = landmarks[12], landmarks[11]
        ring_tip, ring_dip = landmarks[16], landmarks[15]
        pinky_tip, pinky_dip = landmarks[20], landmarks[19]
        wrist = landmarks[0]

        thumb_extended = thumb_tip[0] > thumb_dip[0]
        index_extended = SignDetector.is_finger_extended(index_tip, index_dip)
        middle_extended = SignDetector.is_finger_extended(middle_tip, middle_dip)
        ring_extended = SignDetector.is_finger_extended(ring_tip, ring_dip)
        pinky_extended = SignDetector.is_finger_extended(pinky_tip, pinky_dip)

        extended = [thumb_extended, index_extended, middle_extended, ring_extended, pinky_extended]

        gesture = "unknown"

        if all(extended):
            gesture = "open_palm"
        elif extended == [False, False, False, False, False]:
            gesture = "fist"
        elif extended == [True, False, False, False, False]:
            gesture = "thumb_only"
        elif extended == [False, True, False, False, False]:
            gesture = "index_only"
        elif extended == [False, True, True, False, False]:
            gesture = "index_middle_only"
        elif extended == [False, True, True, True, False]:
            gesture = "index_middle_ring"
        elif extended == [False, False, False, True, True]:
            gesture = "ring_pinky"
        elif extended == [True, True, True, False, False]:
            gesture = "thumb_index_middle"
        elif extended == [True, False, False, False, True]:
            gesture = "thumb_pinky"
        elif extended == [False, False, False, False, True]:
            gesture = "pinky_only"
        elif extended == [False, False, False, True, False]:
            gesture = "ring_only"
        elif extended == [True, True, False, False, False]:
            if abs(thumb_tip[0] - index_tip[0]) < 20:
                gesture = "ok_sign"
            else:
                gesture = "gun_sign"
        elif abs(thumb_tip[0] - index_tip[0]) < 15 and abs(index_tip[0] - middle_tip[0]) < 15:
            gesture = "finger_cross"
        elif extended == [False, False, True, False, False]:
            gesture = "middle_finger"
        elif extended == [True, False, False, False, False]:
            gesture = "thumbs_up"
        elif extended == [False, True, False, False, False]:
            gesture = "count_1"
        elif extended == [True, True, False, False, False]:
            gesture = "count_2"
        elif extended == [True, True, True, False, False]:
            gesture = "count_3"
        elif extended == [True, True, True, True, False]:
            gesture = "count_4"
        elif extended == [True, True, True, True, True]:
            gesture = "count_5"
        elif extended == [False, True, True, False, False]:
            gesture = "peace_sign"
        elif extended == [False, True, False, False, True]:
            gesture = "rock_sign"
        elif extended == [False, True, True, True, False]:
            gesture = "victory"
        elif extended == [True, False, False, False, True]:
            gesture = "call_me"
        elif extended == [True, True, False, False, False]:
            gesture = "finger_gun"
        elif not thumb_extended and not index_extended and pinky_extended:
            gesture = "thumbs_down"
        elif index_extended and pinky_extended and not middle_extended and not ring_extended:
            gesture = "spiderman"
        elif abs(thumb_tip[0] - pinky_tip[0]) < 30 and abs(thumb_tip[1] - pinky_tip[1]) < 30:
            gesture = "heart_sign"
        elif thumb_extended and not index_extended and not middle_extended and not ring_extended and pinky_extended:
            gesture = "shaka"
        elif abs(landmarks[5][0] - landmarks[17][0]) < 30 and all(extended):
            gesture = "flat_hand_sideways"
        elif thumb_extended and index_extended and not middle_extended and not ring_extended and not pinky_extended:
            gesture = "l_sign"
        elif thumb_extended and not index_extended and not middle_extended and not ring_extended and pinky_extended:
            gesture = "y_sign"

        # if prev_landmarks:
        #     wrist_prev = prev_landmarks[0]
        #     movement_x = abs(wrist[0] - wrist_prev[0])
        #     movement_y = abs(wrist[1] - wrist_prev[1])
        #     if movement_x > 20 and movement_y < 10:
        #         gesture = "wave"
        #     elif movement_y > 20 and movement_x < 10:
        #         gesture = "thank_you"
        #     elif movement_x > 15 and movement_y > 15:
        #         gesture = "clap"
        #     elif wrist[1] < wrist_prev[1] and movement_y > 15:
        #         gesture = "come_here"
        #     elif wrist[1] > wrist_prev[1] and movement_y > 15:
        #         gesture = "go_away"

        SignDetector.last_detected = gesture if gesture != "unknown" else SignDetector.last_detected
        return SignDetector.last_detected
