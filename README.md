# 🌍 GeoSATsim

**Live Demo:** https://geosatsim.vercel.app/

GeoSATsim is an **educational 3D satellite simulator**. It visualizes Earth, satellites, and orbits in real-time using **React + React Three Fiber**. Perfect for learning orbital concepts, demos, and quick visual experiments.

---

## ✨ What You Can Do

- 🌍 Explore a **realistic 3D Earth** with textures and backgrounds.  
- 🛰️ Track the **ISS** and other satellites with live updates.  
- 🔭 Visualize **orbit paths** around Earth.  
- 🌌 Enable **star fields and Milky Way background** for immersion.  
- 🎛️ Interact with the **mission UI** to toggle layers and satellites.  

👉 Just open the live demo — no install required!

---

## ⚙️ Implementation

- **Frontend:** Built with **React + Vite** using **React Three Fiber** for 3D rendering.  
- **3D Scene:**  
  - Earth rendered as a textured sphere (`earth.jpg`), with optional **clouds** and **starfield** textures.  
  - Satellites (e.g., ISS) represented as orbiting 3D markers.  
  - Orbit paths drawn using line geometry.  
- **Data Integration:**  
  - ISS position fetched from external APIs for live updates.  
  - Designed to easily extend with **TLE-based satellites**.  
- **UI:** Simple mission control interface for toggling satellites, orbits, and background layers.  

---

##  ![alt text](<Screenshot 2025-08-30 142003.png>)


---

## 🔮 Roadmap

- Add support for **multiple satellites** with TLE data.  
- Show **ground tracks** on Earth’s surface.  
- Add **pass predictions** for ground stations.  
- Expand **mission UI** with time controls and playback.  

---

## 🛠️ For Developers (Local Setup)

If you’d like to contribute or run locally:

```bash
git clone https://github.com/daks19/GeoSATsim.git
cd GeoSATsim
npm install
npm run dev
