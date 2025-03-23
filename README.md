# Twitch Heart Widget

A dynamic heartbeat and ECG widget designed for real-time heart rate display and ECG visualization, with custom color and animation features for use in OBS.

## Description

This widget visualizes the heartbeat (BPM) with a heart animation and displays an ECG-like waveform in real-time. It includes dynamic color changes based on heart rate, and an ECG display that reflects the changes in BPM. The widget is customizable and can be embedded into OBS via a browser source.

## Features

- **Real-Time Heartbeat Animation**: A heart icon animates according to the current heart rate (BPM), increasing speed with higher BPM and changing color based on the rate.
- **ECG Display**: A real-time ECG waveform that visually represents heart activity. The ECG line shows peaks and valleys, simulating a real heart’s electrical impulses.
- **Customizable Appearance**: Customize the heart color, animation speed, and ECG appearance through configuration files.
- **Display Last 10 BPMs**: The ECG display stores all heartbeat values but only shows the last 10 on the ECG.

## Installation

### Prerequisites

Before starting, ensure you have the following:

- A Twitch account (if you want to integrate this with Twitch).
- OBS Studio installed on your machine.
- Basic knowledge of using OBS and browser sources.

### Setup

1. **Clone or Download the Project**:
   - Clone this repository or download the source files to your local machine.

2. **Configure `config.json`**:
   - Open the `config.json` file and set up the heartbeat parameters:
     - **`min`**: Set the minimum BPM.
     - **`max`**: Set the maximum BPM.
     - **`showECG`**: Set to `true` if you want the ECG to display.
     - Customize the appearance settings (e.g., heart color, animation duration, etc.).

3. **Add the Widget to OBS**:
   - Open OBS Studio.
   - Add a new **Browser Source** to your scene.
   - In the **URL** field, point it to the location of `index.html` or host it on a web server.
   - Adjust the size and position of the widget as needed.

## Customization

You can customize the heart animation and ECG visualization by modifying the following files:

- **`config.json`**: Configure core settings like the channel name, heartbeat ranges, animation speed, ECG options, and color preferences.
  
- **`style.css`**: Modify the CSS to adjust the visual design of the heart and ECG widget, including background colors, font sizes, etc.

- **`index.html`**: The HTML structure of the widget. You can modify the layout here if needed.

### Example `config.json`

```json
{
  "heartbeat": {
    "min": 60,
    "max": 180,
    "showECG": true
  },
}
```

## How It Works

- **Heartbeat Animation**: The heart animation is tied to the current heartbeat (BPM). The animation duration is dynamically adjusted based on the BPM value. Faster BPMs result in a faster animation cycle. The heart's color changes as well, ranging from a light red at low BPMs to a deep red at high BPMs.

- **ECG Display**: The ECG waveform is drawn on a canvas element. The waveform reflects changes in the BPM history. The widget will store all BPM values but only show the latest 10, ensuring the ECG display doesn't overwhelm the viewer.

- **Dynamic Update**: The BPM value can be dynamically updated or simulated using `setFakeHeartbeat`. The heart’s animation and the ECG waveform update in real-time based on the BPM changes.

## Development

To contribute to this project or extend the widget:

1. Clone the repository to your local machine.
2. Modify the source files as needed (`script.js`, `style.css`, `index.html`).
3. Test changes locally by opening the `index.html` file in a browser.
4. Push your changes and submit a pull request if you’d like to contribute back.
