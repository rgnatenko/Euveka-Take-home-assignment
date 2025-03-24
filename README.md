# Device Control

## Overview

The **Device Control** app allows users to control a device's color and shape parameters through an intuitive interface. Adjust the **Red**, **Green**, **Blue**, and **Shape** values, save configurations, and load them at any time. The app simulates sending parameters to the device and provides feedback on success or failure. It also allows for saving device configurations in local storage for easy access.

## Features

- **Adjust RGB values** to control the color of a shape.
- **Choose between multiple shapes**: none, triangle, and circle.
- **Save and load configurations** for future use.
- **Receive feedback** on parameter transmission success or failure.

## Technologies

- **React** (using React Hooks for state management)
- **Tailwind CSS** (for modern, responsive design)
- **React Toastify** (for displaying toast notifications)
- **Classnames** (for dynamically managing CSS class names)

## Setup and Run Instructions

To run this project locally, follow the instructions below:

### 1. Clone the repository

```bash
git clone https://github.com/rgnatenko/Euveka-Take-home-assignment.git
cd Euveka-Take-home-assignment
```

### 2. Install dependencies

Make sure Node.js is installed, then run the following command to install all dependencies:

```
npm install
```

### 3. Run the development server

To start the development server, use:

```
npm start
```

The app will be available at http://localhost:3000 in your browser.

## Improvements and Future Enhancements

If I had more time, I would improve the project in the following ways:

Integrate with an actual device API to send parameters to real devices.

- Add input validation for RGB and shape values to ensure they're within the correct range.
- Implement more complex shapes and interactive UI elements.
- Enhance accessibility with ARIA attributes and better keyboard navigation.
- Error handling improvements, such as retrying failed requests to the device.
- UI/UX improvements, including smoother animations and transitions.
