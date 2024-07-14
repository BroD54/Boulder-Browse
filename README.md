# Boulder Browse

This project is a visual course management tool built using React Flow. It allows users to build and visualize their CU Boulder class plan while connecting pre-requisites.

## Features

- **Interactive Course Nodes**:<br>  Visual representation of courses, displaying course codes, titles, and last semester.
- **Searchbar**:<br>  Search bar to add courses to the interactive grid.
- **Sidebar**:<br>  Sidebar opens on course node click to display more details about the course. Can add prerequisites directly from sidebar. 
- **Automatic Layout**:<br> Implemented tree layout to clearly visualize courses. Controls to automatically update layout as more courses and edges are added.
- **Draggable Attributes**:<br> Assign attributes like "Freshman Year", "Sophomore Year", "Transfer Credit", etc., to course nodes.
- **Dynamic Styling**:<br> Nodes change color based on assigned attributes.
- **Adjustable Controls**:<br> Various controls to change styling of the edges and direction of course handles
- **Responsive Design**:<br> Utilizes Tailwind CSS for styling and responsiveness.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/boulder-browse.git
    ```

2. Navigate to the project directory:

    ```sh
    cd boulder-browse
    ```

3. Install dependencies:

    ```sh
    npm install
    ```

4. Start the development server:

    ```sh
    npm start
    ```

## Usage

### Running the Project

1. Start the development server:

    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000` to see the application in action.
