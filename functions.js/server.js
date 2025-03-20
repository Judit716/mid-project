const https = import("https");
let projects = null;

const dbUrl = "https://mid-project-judit-netlify>/public/db.json";


const readData = () => {
  return new Promise((resolve, reject) => {
    https
      .get(dbUrl, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject("Error al parsear los datos JSON");
          }
        });
      })
      .on("error", (err) => {
        reject("Error al obtener los datos de db.json: " + err.message);
      });
  });
};


const loadData = async () => {
  try {
    if (!projects) {
      const projectsOnJSON = await readData();
      if (projectsOnJSON) {
        saveData(projectsOnJSON);
        console.log("Datos cargados desde db.json");
        console.log(projectsOnJSON);
        return projectsOnJSON;
      }
    }

    return JSON.parse(projects);
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    return { projects: [] }; 
  }
};


const saveData = (data) => {
  projects = JSON.stringify(data);
};


module.exports.handler = async (event) => {
  const { path, httpMethod } = event;
  const [, , entity, id] = path.split("/"); 

  
  let data = await loadData();

  if (httpMethod === "GET") {
   
    if (entity === "projects") {
      if (id) {
        // Si se proporciona un id, devolver el proyecto específico
        const project = data.projects.find(
          (p) => parseInt(p.id) === parseInt(id)
        );
        if (project) {
          return {
            statusCode: 200,
            body: JSON.stringify(project),
          };
        }
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "Project not found" }),
        };
      } else {
        console.log("GET /projects");
        console.log(data);
        // Si no se proporciona un id, devolver todos los proyectos
        return {
          statusCode: 200,
          body: JSON.stringify(data.projects),
        };
      }
    }
  } else if (httpMethod === "POST" && entity === "projects") {
    // POST a "/projects" para agregar un nuevo proyecto
    const newProject = JSON.parse(event.body);
    newProject.id = data.projects.length + 1; // Generar un nuevo ID
    data.projects.push(newProject);
    saveData(data); // Guardar en localStorage

    return {
      statusCode: 201,
      body: JSON.stringify(newProject),
    };
  } else if (httpMethod === "PUT" && entity === "projects" && id) {
    // PUT a "/projects/{id}" para actualizar un proyecto existente
    const updatedProject = JSON.parse(event.body);
    const projectIndex = data.projects.findIndex(
      (p) => parseInt(p.id) === parseInt(id)
    );

    if (projectIndex !== -1) {
      data.projects[projectIndex] = {
        ...data.projects[projectIndex],
        ...updatedProject,
      };
      saveData(data); // Guardar en localStorage

      return {
        statusCode: 200,
        body: JSON.stringify(data.projects[projectIndex]),
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Project not found" }),
    };
  } else if (httpMethod === "DELETE" && entity === "projects" && id) {
    // DELETE a "/projects/{id}" para eliminar un proyecto
    const projectIndex = data.projects.findIndex(
      (p) => parseInt(p.id) === parseInt(id)
    );

    if (projectIndex !== -1) {
      const deletedProject = data.projects.splice(projectIndex, 1);
      saveData(data); // Guardar en localStorage

      return {
        statusCode: 200,
        body: JSON.stringify(deletedProject),
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Project not found" }),
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: "Not Found" }),
  };
};


