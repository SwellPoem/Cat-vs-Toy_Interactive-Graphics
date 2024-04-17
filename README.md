## Cat vs Toy - interactive 3D animated game

# Project overview
The project is a 3D representation of a room in which my pets are shown. 
The scene includes three animated animals:
- Luna: the cat that interacts with a mouse-controlled toy.
- Cannella: the mouse that moves randomly around the room.
- Adi: the fish that swims in a circular path within an aquarium.

Users can interact with the scene in multiple ways, including changing the view, zooming, rotating, and interacting with the cat through a toy controlled by the mouse.

# Features
- Hierarchical Models: Complex hierarchical models for each animal and decoration in the scene, implemented in JavaScript.
- Lighting and Textures: The scene includes HemisphereLight and SpotLights, with various textures applied to enhance realism.
- User Interaction: Interactive elements allowing users to manipulate the scene and the cat's actions.
- Animations: Smooth animations for animals and environmental elements using JavaScript and GSAP library.

# Libraries and Tools Used
- Three.js: Main library for creating and displaying animated 3D computer graphics in a web browser.
- OrbitControls.js: Enables camera control with the mouse.
- GSAP (GreenSock Animation Platform): Used for complex animations.
- GLTFLoader.js: For loading models in the glTF format, particularly used for the wheel and pet pillow.

# Project Structure
- index.html: Entry point of the application.
- js/: Contains JavaScript files for scene setup, animation logic, and user interactions.
- assets/: Includes images and models used in the scene.

# Interactions
- User's mouse Movement: Control toys to interact with Luna the cat.
- View Control: Click and drag to rotate the view, scroll to zoom in and out.
- Cat and Toy Control: Buttons available in the UI to change the cat's position and the selected toy.


# Setup and Usage
GitHub Pages: https://sapienzainteractivegraphicscourse.github.io/final-project-valentinapiccione/index.html
A simpler version without textures and glTF models can be found at this Codepen link: https://codepen.io/SwellPoem/pen/abqPVXQ

NOTE: Using GitHub Pages the first loading may take a few seconds. Using Safari or Mozilla might not work. Tested on Chrome 103. Performance on GitHub Pages may be noticeably worse rather than downloading and running the project on th local machine. 

# Acknowledgments
Shoutout to my pets, Luna, Cannella, and Adi, for inspiration.

