import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms, models
import os

# ✅ Ensure correct working directory
base_dir = os.path.dirname(os.path.abspath(__file__))
train_dir = os.path.join(base_dir, "datasets", "train")
test_dir = os.path.join(base_dir, "datasets", "test")

# ✅ Check dataset existence before proceeding
if not os.path.exists(train_dir):
    raise FileNotFoundError(f"Training folder not found: {train_dir}")
if not os.path.exists(test_dir):
    raise FileNotFoundError(f"Test folder not found: {test_dir}")

# ✅ Device setup
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# ✅ Data transformations
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=3),  # Convert grayscale → RGB (ResNet expects 3 channels)
    transforms.Resize((48, 48)),  # Resize to fixed size
    transforms.ToTensor(),
    transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])  # ✅ Match 3 channels for normalization
])

# ✅ Dataset loaders
train_data = datasets.ImageFolder(train_dir, transform=transform)
test_data = datasets.ImageFolder(test_dir, transform=transform)

train_loader = DataLoader(train_data, batch_size=64, shuffle=True)
test_loader = DataLoader(test_data, batch_size=64, shuffle=False)

# ✅ Model: ResNet18 fine-tuning
model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
model.fc = nn.Linear(model.fc.in_features, len(train_data.classes))  # Adjust output to num classes
model = model.to(device)

# ✅ Loss & optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.0001)

# ✅ Training loop
EPOCHS = 140
for epoch in range(EPOCHS):
    model.train()
    running_loss = 0.0

    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()

    avg_loss = running_loss / len(train_loader)
    print(f"Epoch [{epoch + 1}/{EPOCHS}] - Loss: {avg_loss:.4f}")

# ✅ Save trained model
torch.save(model.state_dict(), os.path.join(base_dir, "emotion_model.pth"))
print("✅ Model saved successfully!")
