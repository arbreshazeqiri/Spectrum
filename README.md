# Spectrum Sensor Data Dashboard for the Ground Control Crew

## Overview

The goal of this project is to build a web-based GUI to visualize sensor data from the launch vehicle "Spectrum." The project is divided into three assignments, each focusing on different aspects of the application.
### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/arbreshazeqiri/Spectrum.git
    ```

2. Navigate to the project directory:

    ```bash
    cd spectrum-dashboard
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the application:

    ```bash
    npm start
    ```

## Assignment A: SpectrumStatus GUI

### Project Structure

The project is built using React and TypeScript. It features a React-based web interface that visualizes important sensor data retrieved from the `SpectrumStatus` API endpoint. The GUI includes line graphs, a gauge chart, text boxes, and a video for real-time monitoring of velocity, altitude, temperature, and other vehicle stats. Users can trigger updates manually through a button click.


## Assignment B: SpectrumWS Live Data

### Live Data Integration

This assignment involves upgrading the communication protocol to web sockets (wss) using the `SpectrumWS` endpoint. The live data the server pushes continuously updates the user interface, providing real-time insights into Spectrum's sensor system. Users can get these live updates through another button click, which sets Live mode ON.
A critical status change modal appears when the launch vehicle requires crew action (`isActionRequired: true`). The modal includes a sound alert to ensure immediate attention.

## Assignment C: Potential Improvements
While the current API structure is functional, there are potential improvements identified:

1. **Security:** Implementing an authentication system would enhance the overall security, ensuring only authorized users access the API.
2. **Documentation:** Let's enhance the API documentation to provide more clarity for developers. Including information about the units of sensor data (altitude in feet or meters, temperature in Celsius or Fahrenheit) and defining the normal operating ranges for velocity and altitude would be immensely helpful.
3. **Error Handling**: Strengthen the error handling mechanism. For instance, enrich the error messages with a detailed message and a status type (warning, error, or success). Additionally, addressing the 405 error for the ActOnSpectrum POST request would be great.
4. **Consistency:** Maintain a consistent naming convention, whether it's Camel Case or Pascal Case, across both RESTful API responses and WebSocket responses.

## Contact Information

For further inquiries or discussions, please contact me at arbresha.zeqiri@student.uni-pr.edu.
