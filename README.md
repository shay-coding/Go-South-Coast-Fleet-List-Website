# 🚌 Go South Coast Fleet List

This is a simple website made to display the full fleet list of Go South Coast buses in a clean, visual format — similar to a Wikipedia-style table but with modern dark styling, logos, and livery screenshots.

---

## 📌 Why I Made This

I'm a massive bus enthusiast and wanted:
- A public, easy-to-read list of Go South Coast vehicles
- A visual way to show operator logos and actual liveries
- To practise my web and GitHub skills
- A foundation for more advanced tools in the future

---

## ✅ Current Features

- Dark mode table layout
- Table includes:
  - Fleet Number
  - Reg Plate
  - Year
  - Model
  - Operator (with logo)
  - Livery (Bustimes-style screenshot)
  - Status
  - Notes
- Operator logos shown using images in the `/images` folder
- Livery screenshots shown from the `/liveries` folder
- Data is pulled from a simple `fleet.csv` file
- Fully mobile-friendly

---

## 🛠️ How to Make Your Own Version

Want to use this as a base for your own project or bus company? Here's how:

### 1. Download or Fork This Repository

- Clone it via GitHub Desktop or
- Click **Code → Download ZIP**

### 2. Edit `fleet.csv`

Make sure your CSV uses this format (8 columns):

Fleet No, Reg Plate, Year, Model, Operator, Livery, Status, Notes

- The **Operator** column should match a filename in `/images` (e.g. `bluestar.png`)
- The **Livery** column should match a filename in `/liveries` (e.g. `bluestarnew.png`)

### 3. Add Images

- Place operator logos in the `/images/` folder
- Place livery screenshots in the `/liveries/` folder
- Filenames must match what’s written in `fleet.csv`

### 4. Open or Host `index.html`

- Open `index.html` in your browser to preview locally
- Use **GitHub Pages** or **Neocities** to put it online

---

## 🌍 Live Demo

[https://gosouthcoastfleet.neocities.org](https://gosouthcoastfleet.neocities.org)
