# 🏋️‍♂️ AI-Powered Athlete Biomechanics & Pose Estimation Engine

[![Portfolio](https://img.shields.io/badge/Portfolio-hassangul.me-2f81f7?style=for-the-badge&logo=googlechrome&logoColor=white)](https://hassangul.me/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Muhammad%20Hassan%20Gul-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/its-muhammad-hassan)
[![Python](https://img.shields.io/badge/Python-3.10+-yellow.svg?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-EE4C2C.svg?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)

Automated 2D-to-3D pose lifting and real-time biomechanical analysis engine designed to evaluate athlete joint angles, limb velocities, and execution metrics during high-speed athletic movements.

Developed by **[Muhammad Hassan Gul](https://hassangul.me)** — Computer Vision Engineer specializing in Sports Analytics & Motion Tracking.

---

## 📌 Key Features

- **Real-Time Keypoint Detection:** Sub-30ms latency for streaming video footage using optimized lightweight pose models.
- **Robust Motion Blur Handling:** Custom synthetic data generation pipeline to maintain tracking accuracy under extreme velocity.
- **Biomechanical Metrics Assessment:** Calculates precise angular velocities, joint stress levels, and stance symmetry metrics automatically.
- **Multi-Object Tracking (MOT):** DeepSORT/ByteTrack integration to handle severe athlete occlusion in dynamic team sports environments.

---

## 🛠️ Tech Stack & Architecture

- **Core Vision Frameworks:** OpenCV, PyTorch, TorchScript, ONNX Runtime
- **Tracking & Motion:** YOLO, ByteTrack, Optical Flow
- **Backend Infrastructure:** FastAPI, Docker, CUDA Acceleration
- **Deployment & Streaming:** RTSP / FFmpeg, AWS EC2

```
[ Video Input Stream ] ➡️ [ Keypoint Detection ] ➡️ [ Optical Flow & Tracking ]
                                                            │
[ Biomechanical Analysis Engine ] ⬅️ [ Synthetic Augmentation ] ┘
            │
[ Automated Diagnostic Metrics Report ]
```

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have Python 3.10+ and a CUDA-enabled GPU available.

```bash
git clone https://github.com/mhassaan-workmail/athlete-biomechanics-engine.git
cd athlete-biomechanics-engine
```

### 2. Environment Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\\Scripts\\activate

# Install core dependencies
pip install -r requirements.txt
```

### 3. Run Pose Estimation & Analysis Pipeline

```bash
python main.py --source data/sample_athlete.mp4 --weights weights/pose_model.pth --device cuda:0
```

---

## 👤 Author & Contact

**Muhammad Hassan Gul**  
*Computer Vision Engineer & AI Specialist*

- **Website:** [https://hassangul.me](https://hassangul.me)
- **LinkedIn:** [linkedin.com/in/its-muhammad-hassan](https://linkedin.com/in/its-muhammad-hassan)
- **Email:** [mhassaan.workmail@gmail.com](mailto:mhassaan.workmail@gmail.com)

---
*If you find this project useful, feel free to give it a ⭐️ star!*
