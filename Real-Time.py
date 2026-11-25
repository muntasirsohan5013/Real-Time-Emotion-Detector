import cv2
import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import os

# ✅ Safe directory handling
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, "emotion_model.pth")

# ✅ Device setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# ✅ Load model (ResNet18 with 7 output classes)
model = models.resnet18(weights=None)
model.fc = nn.Linear(model.fc.in_features, 7)

# ✅ Load trained weights safely
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at: {model_path}")

state_dict = torch.load(model_path, map_location=device)
model.load_state_dict(state_dict)
model.eval().to(device)

# ✅ Transform (match training script)
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=3),
    transforms.Resize((48, 48)),
    transforms.ToTensor(),
    transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
])

# Emotion labels (order must match your training classes)
emotions = ["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"]

# ✅ Initialize webcam
cap = cv2.VideoCapture(1)  # Use 0 for default webcam (change to 1 if using external)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

if not cap.isOpened():
    print("❌ Error: Could not open webcam.")
    exit()

print("✅ Webcam opened. Press 'q' to quit.")

# ✅ Real-time emotion detection
while True:
    ret, frame = cap.read()
    if not ret:
        print("❌ Error: Failed to capture frame.")
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:
        face = frame[y:y+h, x:x+w]

        # Convert to PIL & transform
        face_rgb = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
        face_pil = Image.fromarray(face_rgb)
        face_tensor = transform(face_pil).unsqueeze(0).to(device)

        # Prediction
        with torch.no_grad():
            output = model(face_tensor)
            pred = torch.argmax(output, dim=1).item()
            label = emotions[pred]

        # Draw results on frame
        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
        cv2.putText(frame, label, (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

    # Show live video
    cv2.imshow("Emotion Detection", frame)

    # Quit when 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
