# Running the Boneage Detection Pipeline

This project consists of three independent components that must be running simultaneously to access the full web application, view backend machine learning estimations, and review MLflow diagnostic trackers (Grad-CAM graphs, model confidence).

It is highly recommended to open **3 separate terminal tabs** in your command line or VS Code directly in the root directory (`Boneage-Detection1`).

---

### Terminal 1: Fast-API Backend
The backend runs the Heavy PyTorch models, connects to MongoDB for Authentication, and manages the SQLite Database.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Make sure you are in your Python virtual environment if applicable.
3. Start the server (it will automatically mount to port 8000):
   ```bash
   python app.py
   ```

---

### Terminal 2: Vite React Frontend
The frontend runs your sleek glass-morphism website UI and handles image chunking to ping the backend API.

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the development server (it will automatically mount to port 5173):
   ```bash
   npm run dev
   ```
3. You can now Command+Click / Control+Click the `http://localhost:5173/` link to open the website natively in your browser!

---

### Terminal 3: MLflow Visualizer
MLflow manages visual snapshots of what the AI logic is "seeing". You must explicitly point the MLflow UI instance to `data/mlruns` rather than your current directory to avoid rendering errors!

1. Remain in the **root** folder (`Boneage-Detection1`).
2. Run the UI configuration exactly as written below:
   ```bash
   mlflow ui --backend-store-uri ./data/mlruns
   ```
3. Open `http://127.0.0.1:5000` to review diagnostic run-sheets and Grad-CAM analyses alongside your frontend!

---

> [!WARNING]
> **Important Database Note**
> Do not rename internal folders generated within `data/mlruns` from their hash IDs to custom names (e.g. `Male Test`). If you want to configure how these runs display, change their visual Name directly inside the **MLflow UI** dashboard instead!
